import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type {
  SkillValidationIssue,
  SkillValidationRecord,
  SkillValidationSummary,
  ValidationLocation
} from "../types.js";
import { normalizeToPosix, resolvePathWithinRoot, validateSkillId } from "../security/policy.js";
import { parseSimpleYamlFrontmatter, validateSkillFrontmatter } from "./loader.js";

const RESOURCE_PATH_PATTERN = /(?:(references|scripts|assets)\/[A-Za-z0-9._/-]+)/g;
const MARKDOWN_LINK_PATTERN = /\[[^\]]+]\(([^)]+)\)/g;

interface SkillSourceContext {
  skillRootPath: string;
  skillFilePath: string;
  lines: string[];
}

interface ResolvedReference {
  rawPath: string;
  normalizedPath: string;
  location: ValidationLocation;
}

function buildLocation(filePath: string, line: number, column: number): ValidationLocation {
  return {
    path: normalizeToPosix(filePath),
    line,
    column
  };
}

function createIssue(message: string, ruleId: string, location?: ValidationLocation): SkillValidationIssue {
  return {
    message,
    ruleId,
    location
  };
}

function formatLocation(location?: ValidationLocation): string {
  if (!location) {
    return "";
  }

  return ` (${location.path}:${location.line}:${location.column})`;
}

function dedupeIssues(issues: SkillValidationIssue[]): SkillValidationIssue[] {
  const seen = new Set<string>();
  const deduped: SkillValidationIssue[] = [];

  for (const issue of issues) {
    const key = [
      issue.ruleId,
      issue.message,
      issue.location?.path ?? "",
      issue.location?.line ?? "",
      issue.location?.column ?? ""
    ].join("|");
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(issue);
  }

  return deduped;
}

function extractResourceReferences(context: SkillSourceContext): ResolvedReference[] {
  const references: ResolvedReference[] = [];
  const seen = new Set<string>();

  context.lines.forEach((line, index) => {
    for (const match of line.matchAll(RESOURCE_PATH_PATTERN)) {
      const rawPath = match[0];
      const column = (match.index ?? 0) + 1;
      const key = `${rawPath}:${index + 1}:${column}`;
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      references.push({
        rawPath,
        normalizedPath: normalizeToPosix(rawPath),
        location: buildLocation(context.skillFilePath, index + 1, column)
      });
    }

    for (const match of line.matchAll(MARKDOWN_LINK_PATTERN)) {
      const rawTarget = match[1].trim();
      if (!rawTarget.startsWith("references/") && !rawTarget.startsWith("scripts/") && !rawTarget.startsWith("assets/")) {
        continue;
      }

      const column = line.indexOf(rawTarget) + 1;
      const key = `${rawTarget}:${index + 1}:${column}`;
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      references.push({
        rawPath: rawTarget,
        normalizedPath: normalizeToPosix(rawTarget),
        location: buildLocation(context.skillFilePath, index + 1, column)
      });
    }
  });

  return references;
}

async function validateReferencedResources(
  context: SkillSourceContext,
  issues: SkillValidationIssue[]
): Promise<void> {
  const references = extractResourceReferences(context);

  for (const reference of references) {
    try {
      const resolvedPath = resolvePathWithinRoot(context.skillRootPath, reference.normalizedPath);
      await readFile(resolvedPath, "utf8");
    } catch {
      issues.push(
        createIssue(
          `Referenced resource '${reference.rawPath}' does not exist or resolves outside the skill root.`,
          "missing-resource-reference",
          reference.location
        )
      );
    }
  }
}

function buildRecord(
  skillId: string,
  status: SkillValidationRecord["status"],
  skillFilePath: string,
  issues: SkillValidationIssue[]
): SkillValidationRecord {
  const dedupedIssues = dedupeIssues(issues);
  const headline = dedupedIssues[0];

  return {
    skillId,
    status,
    skillFilePath,
    issues: dedupedIssues,
    errors: dedupedIssues.length,
    message: headline ? `${headline.message}${formatLocation(headline.location)}` : undefined
  };
}

async function validateSkillDirectory(skillsRoot: string, skillId: string): Promise<SkillValidationRecord> {
  const skillRootPath = path.resolve(skillsRoot, skillId);
  const skillFilePath = path.resolve(skillRootPath, "SKILL.md");
  const issues: SkillValidationIssue[] = [];

  if (!validateSkillId(skillId)) {
    issues.push(
      createIssue(
        "Folder name must use lowercase letters, numbers, and hyphens only.",
        "invalid-folder-name",
        buildLocation(skillFilePath, 1, 1)
      )
    );
    return buildRecord(skillId, "invalid", skillFilePath, issues);
  }

  let raw: string;
  try {
    raw = await readFile(skillFilePath, "utf8");
  } catch (error) {
    const message = (error as NodeJS.ErrnoException).code === "ENOENT"
      ? "SKILL.md file is missing."
      : (error as Error).message;
    issues.push(createIssue(message, "missing-skill-file", buildLocation(skillFilePath, 1, 1)));
    return buildRecord(skillId, "missing", skillFilePath, issues);
  }

  try {
    const parsed = parseSimpleYamlFrontmatter(raw);
    validateSkillFrontmatter(parsed.frontmatter, skillId);

    await validateReferencedResources(
      {
        skillRootPath,
        skillFilePath,
        lines: raw.split(/\r?\n/)
      },
      issues
    );
  } catch (error) {
    issues.push(
      createIssue(
        (error as Error).message,
        "invalid-skill-manifest",
        buildLocation(skillFilePath, 1, 1)
      )
    );
  }

  return buildRecord(skillId, issues.length > 0 ? "invalid" : "valid", skillFilePath, issues);
}

export async function validateSkills(skillsRoot: string): Promise<SkillValidationSummary> {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const records: SkillValidationRecord[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    records.push(await validateSkillDirectory(skillsRoot, entry.name));
  }

  records.sort((left, right) => left.skillId.localeCompare(right.skillId));

  return {
    records,
    valid: records.filter((record) => record.status === "valid").length,
    invalid: records.filter((record) => record.status === "invalid").length,
    missing: records.filter((record) => record.status === "missing").length,
    errors: records.reduce((sum, record) => sum + record.errors, 0)
  };
}
