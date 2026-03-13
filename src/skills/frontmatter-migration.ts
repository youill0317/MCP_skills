import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface SkillMigrationRecord {
  skillId: string;
  status: "updated" | "unchanged" | "invalid" | "missing";
  skillFilePath: string;
  message?: string;
}

export interface SkillMigrationSummary {
  records: SkillMigrationRecord[];
  updated: number;
  unchanged: number;
  invalid: number;
  missing: number;
}

export interface MigrateSkillsFrontmatterOptions {
  skillsRoot: string;
  check?: boolean;
}

export interface FrontmatterMigrationResult {
  changed: boolean;
  content: string;
}

export function removeLegacyCategoryFromSkillContent(raw: string): FrontmatterMigrationResult {
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = raw.split(/\r?\n/);

  if (!raw.startsWith("---")) {
    throw new Error("SKILL.md must start with YAML frontmatter.");
  }

  if (lines[0].trim() !== "---") {
    throw new Error("SKILL.md frontmatter opening must be '---'.");
  }

  const closingOffset = lines.slice(1).findIndex((line) => line.trim() === "---");
  if (closingOffset === -1) {
    throw new Error("SKILL.md frontmatter closing '---' not found.");
  }

  const closingIndex = closingOffset + 1;
  const frontmatterLines = lines.slice(1, closingIndex);
  const filteredFrontmatterLines = frontmatterLines.filter((line) => !/^\s*category\s*:\s*.+\s*$/.test(line));

  if (filteredFrontmatterLines.length === frontmatterLines.length) {
    return {
      changed: false,
      content: raw
    };
  }

  const nextContent = ["---", ...filteredFrontmatterLines, "---", ...lines.slice(closingIndex + 1)].join(eol);
  return {
    changed: true,
    content: nextContent
  };
}

export async function migrateSkillsFrontmatter(
  options: MigrateSkillsFrontmatterOptions
): Promise<SkillMigrationSummary> {
  const { skillsRoot, check = false } = options;
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const records: SkillMigrationRecord[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const skillId = entry.name;
    const skillFilePath = path.resolve(skillsRoot, skillId, "SKILL.md");

    let raw: string;
    try {
      raw = await readFile(skillFilePath, "utf8");
    } catch (error) {
      const message = (error as Error).message;
      const missing = (error as NodeJS.ErrnoException).code === "ENOENT";
      records.push({
        skillId,
        status: missing ? "missing" : "invalid",
        skillFilePath,
        message
      });
      continue;
    }

    try {
      const result = removeLegacyCategoryFromSkillContent(raw);
      if (result.changed && !check) {
        await writeFile(skillFilePath, result.content, "utf8");
      }

      records.push({
        skillId,
        status: result.changed ? "updated" : "unchanged",
        skillFilePath
      });
    } catch (error) {
      records.push({
        skillId,
        status: "invalid",
        skillFilePath,
        message: (error as Error).message
      });
    }
  }

  records.sort((a, b) => a.skillId.localeCompare(b.skillId));

  return {
    records,
    updated: records.filter((record) => record.status === "updated").length,
    unchanged: records.filter((record) => record.status === "unchanged").length,
    invalid: records.filter((record) => record.status === "invalid").length,
    missing: records.filter((record) => record.status === "missing").length
  };
}
