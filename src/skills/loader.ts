import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { LoadedSkill, SkillFrontmatter, SkillManifest } from "../types.js";
import { normalizeToPosix, resolvePathWithinRoot, validateSkillId } from "../security/policy.js";

interface FrontmatterParseResult {
  frontmatter: SkillFrontmatter;
  body: string;
}

function parseSimpleYamlFrontmatter(raw: string): FrontmatterParseResult {
  if (!raw.startsWith("---")) {
    throw new Error("SKILL.md must start with YAML frontmatter.");
  }

  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== "---") {
    throw new Error("SKILL.md frontmatter opening must be '---'.");
  }

  const endIndex = lines.slice(1).findIndex((line) => line.trim() === "---");
  if (endIndex === -1) {
    throw new Error("SKILL.md frontmatter closing '---' not found.");
  }

  const frontmatterLines = lines.slice(1, endIndex + 1);
  const body = lines.slice(endIndex + 2).join("\n").trim();

  const values = new Map<string, string>();
  for (const line of frontmatterLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = /^([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/.exec(trimmed);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    values.set(key, value);
  }

  const name = values.get("name");
  const description = values.get("description");

  if (!name) {
    throw new Error("SKILL.md frontmatter must include 'name'.");
  }

  if (!description) {
    throw new Error("SKILL.md frontmatter must include 'description'.");
  }

  if (values.has("category")) {
    throw new Error("SKILL.md frontmatter must not include 'category'.");
  }

  return {
    frontmatter: {
      name,
      description
    },
    body
  };
}

function validateSkillFrontmatter(frontmatter: SkillFrontmatter, skillId: string): void {
  if (!validateSkillId(frontmatter.name)) {
    throw new Error("SKILL.md frontmatter 'name' must use lowercase letters, numbers, and hyphens only.");
  }

  if (frontmatter.name !== skillId) {
    throw new Error(`SKILL.md frontmatter 'name' must match folder id '${skillId}'.`);
  }
}

async function listFilesRecursivelyIfExists(rootPath: string, subFolder: string): Promise<string[]> {
  const targetPath = path.resolve(rootPath, subFolder);
  try {
    const folderStat = await stat(targetPath);
    if (!folderStat.isDirectory()) {
      return [];
    }
  } catch {
    return [];
  }

  const out: string[] = [];
  async function walk(currentPath: string): Promise<void> {
    const entries = await readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.resolve(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walk(absolute);
      } else if (entry.isFile()) {
        const relative = path.relative(rootPath, absolute);
        out.push(normalizeToPosix(relative));
      }
    }
  }

  await walk(targetPath);
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

export async function loadSkillManifest(skillsRoot: string, skillId: string): Promise<SkillManifest> {
  if (!validateSkillId(skillId)) {
    throw new Error(`Invalid skill_id '${skillId}'. Use lowercase letters, numbers, and hyphens only.`);
  }

  const skillRootPath = resolvePathWithinRoot(skillsRoot, skillId);
  const skillFilePath = path.resolve(skillRootPath, "SKILL.md");
  const rawSkillFile = await readFile(skillFilePath, "utf8");
  const parsed = parseSimpleYamlFrontmatter(rawSkillFile);
  validateSkillFrontmatter(parsed.frontmatter, skillId);

  return {
    id: skillId,
    rootPath: skillRootPath,
    skillFilePath,
    name: parsed.frontmatter.name,
    description: parsed.frontmatter.description,
    references: await listFilesRecursivelyIfExists(skillRootPath, "references"),
    scripts: await listFilesRecursivelyIfExists(skillRootPath, "scripts"),
    assets: await listFilesRecursivelyIfExists(skillRootPath, "assets")
  };
}

export async function loadSkill(skillsRoot: string, skillId: string): Promise<LoadedSkill> {
  const manifest = await loadSkillManifest(skillsRoot, skillId);
  const rawSkillFile = await readFile(manifest.skillFilePath, "utf8");
  const parsed = parseSimpleYamlFrontmatter(rawSkillFile);

  return {
    ...manifest,
    body: parsed.body
  };
}

export async function listSkillIds(skillsRoot: string): Promise<string[]> {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const skillIds = entries
    .filter((entry) => entry.isDirectory() && validateSkillId(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return skillIds;
}

export async function listSkillManifests(skillsRoot: string): Promise<SkillManifest[]> {
  const skillIds = await listSkillIds(skillsRoot);
  const manifests: SkillManifest[] = [];
  for (const skillId of skillIds) {
    try {
      const manifest = await loadSkillManifest(skillsRoot, skillId);
      manifests.push(manifest);
    } catch {
      // Skip invalid skill folders so one broken skill does not break the whole index.
    }
  }

  return manifests;
}
