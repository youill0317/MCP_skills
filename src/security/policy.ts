import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { constants } from "node:fs";
import type { AppConfig } from "../types.js";

const SKILL_ID_PATTERN = /^[a-z0-9-]{1,64}$/;

const DEFAULT_CONFIG: AppConfig = {
  skillsRoot: "./skills",
  scriptExecution: {
    enabledByDefault: false,
    timeoutMs: 30_000,
    maxOutputBytes: 65_536,
    allowedScripts: {}
  },
  references: {
    maxTotalBytes: 262_144
  },
  logging: {
    debug: false
  }
};

function deepMerge(base: AppConfig, override: Partial<AppConfig>): AppConfig {
  return {
    skillsRoot: override.skillsRoot ?? base.skillsRoot,
    scriptExecution: {
      ...base.scriptExecution,
      ...override.scriptExecution,
      allowedScripts: override.scriptExecution?.allowedScripts ?? base.scriptExecution.allowedScripts
    },
    references: {
      ...base.references,
      ...override.references
    },
    logging: {
      ...base.logging,
      ...override.logging
    }
  };
}

export function validateSkillId(skillId: string): boolean {
  return SKILL_ID_PATTERN.test(skillId);
}

export async function loadConfig(configPath: string): Promise<AppConfig> {
  const absolute = path.resolve(configPath);

  await access(absolute, constants.R_OK);
  const raw = await readFile(absolute, "utf8");
  const parsed = JSON.parse(raw) as Partial<AppConfig>;

  return deepMerge(DEFAULT_CONFIG, parsed);
}

export function resolveSkillsRoot(cwd: string, skillsRoot: string): string {
  return path.resolve(cwd, skillsRoot);
}

export function assertRelativeSubpath(relativePath: string): void {
  if (!relativePath || relativePath.trim() === "") {
    throw new Error("Path must not be empty.");
  }

  if (path.isAbsolute(relativePath)) {
    throw new Error("Absolute paths are not allowed.");
  }

  const normalized = path.normalize(relativePath);
  const startsWithParent = normalized.startsWith("..") || normalized.startsWith(`..${path.sep}`);
  if (startsWithParent) {
    throw new Error("Path traversal is not allowed.");
  }
}

export function resolvePathWithinRoot(rootPath: string, relativePath: string): string {
  assertRelativeSubpath(relativePath);

  const resolved = path.resolve(rootPath, relativePath);
  const relativeToRoot = path.relative(rootPath, resolved);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    throw new Error("Resolved path escaped the allowed root.");
  }

  return resolved;
}

export function isScriptAllowed(config: AppConfig, skillId: string, relativeScriptPath: string): boolean {
  const allowedForSkill = config.scriptExecution.allowedScripts[skillId] ?? [];
  return allowedForSkill.includes(normalizeToPosix(relativeScriptPath));
}

export function normalizeToPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}
