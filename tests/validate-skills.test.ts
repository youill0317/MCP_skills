import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { findPackageRootFromModule, resolveSkillsRootFromModule } from "../src/project-paths.js";
import { runValidateSkillsCli } from "../src/cli/validate-skills.js";
import { validateSkills } from "../src/skills/validate.js";

function createIoCapture(): {
  stdout: string[];
  stderr: string[];
  io: { stdout(message: string): void; stderr(message: string): void };
} {
  const stdout: string[] = [];
  const stderr: string[] = [];
  return {
    stdout,
    stderr,
    io: {
      stdout(message: string) {
        stdout.push(message);
      },
      stderr(message: string) {
        stderr.push(message);
      }
    }
  };
}

async function writeSkill(
  root: string,
  skillId: string,
  description: string,
  body = "# Mission\n\nUse references/example.md"
): Promise<void> {
  const skillRoot = path.join(root, skillId);
  await mkdir(skillRoot, { recursive: true });
  await writeFile(
    path.join(skillRoot, "SKILL.md"),
    ["---", `name: ${skillId}`, `description: ${description}`, "---", "", body].join("\n"),
    "utf8"
  );
}

test("validateSkills succeeds for the current repository skills root without structural errors", async () => {
  const skillsRoot = resolveSkillsRootFromModule(import.meta.url);
  const summary = await validateSkills(skillsRoot);

  assert.ok(summary.valid > 0);
  assert.equal(summary.invalid, 0);
  assert.equal(summary.missing, 0);
  assert.equal(summary.errors, 0);
});

test("runValidateSkillsCli resolves the default skills root independently of cwd", async () => {
  const packageRoot = findPackageRootFromModule(import.meta.url);
  const workspaceRoot = path.dirname(packageRoot);
  const originalCwd = process.cwd();

  process.chdir(workspaceRoot);
  try {
    const capture = createIoCapture();
    const exitCode = await runValidateSkillsCli([], capture.io);

    assert.equal(exitCode, 0);
    assert.ok(capture.stdout.some((line) => line.includes(path.join("skill-registry", "skills"))));
  } finally {
    process.chdir(originalCwd);
  }
});

test("runValidateSkillsCli fails when a skill folder name is invalid", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "skill-registry-validate-"));
  await writeSkill(
    tempRoot,
    "good-skill",
    "Guide for validating a sample skill."
  );
  await mkdir(path.join(tempRoot, "Bad Skill"), { recursive: true });

  const capture = createIoCapture();
  const exitCode = await runValidateSkillsCli(["--skills-root", tempRoot], capture.io);

  assert.equal(exitCode, 1);
  assert.ok(capture.stdout.some((line) => line.includes("errors=1")));
  assert.ok(capture.stdout.some((line) => line.includes("Bad Skill: invalid")));
});

test("runValidateSkillsCli fails when SKILL.md is missing", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "skill-registry-validate-"));
  await mkdir(path.join(tempRoot, "missing-skill"), { recursive: true });

  const capture = createIoCapture();
  const exitCode = await runValidateSkillsCli(["--skills-root", tempRoot], capture.io);

  assert.equal(exitCode, 1);
  assert.ok(capture.stdout.some((line) => line.includes("missing=1")));
  assert.ok(capture.stdout.some((line) => line.includes("missing-skill: missing")));
});

test("validateSkills fails when SKILL.md frontmatter is malformed", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "skill-registry-validate-"));
  const skillRoot = path.join(tempRoot, "broken-frontmatter");
  await mkdir(skillRoot, { recursive: true });
  await writeFile(
    path.join(skillRoot, "SKILL.md"),
    ["---", "name: broken-frontmatter", "description: Missing frontmatter closing fence.", "", "# Mission"].join("\n"),
    "utf8"
  );

  const summary = await validateSkills(tempRoot);

  assert.equal(summary.errors, 1);
  assert.equal(summary.records[0]?.status, "invalid");
  assert.ok(summary.records[0]?.issues.some((issue) => issue.ruleId === "invalid-skill-manifest"));
});

test("validateSkills fails when frontmatter name does not match the folder id", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "skill-registry-validate-"));
  const skillRoot = path.join(tempRoot, "folder-mismatch");
  await mkdir(skillRoot, { recursive: true });
  await writeFile(
    path.join(skillRoot, "SKILL.md"),
    ["---", "name: another-skill", "description: Folder mismatch example.", "---", "", "# Mission"].join("\n"),
    "utf8"
  );

  const summary = await validateSkills(tempRoot);

  assert.equal(summary.errors, 1);
  assert.equal(summary.records[0]?.status, "invalid");
  assert.ok(summary.records[0]?.issues.some((issue) => issue.ruleId === "invalid-skill-manifest"));
});

test("validateSkills fails when a referenced resource does not exist", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "skill-registry-validate-"));
  await writeSkill(
    tempRoot,
    "broken-reference",
    "Guide for a broken reference example.",
    "# Mission\n\nLoad references/missing.md before continuing."
  );

  const summary = await validateSkills(tempRoot);

  assert.equal(summary.errors, 1);
  assert.equal(summary.records[0]?.status, "invalid");
  assert.ok(summary.records[0]?.issues.some((issue) => issue.ruleId === "missing-resource-reference"));
});

test("runValidateSkillsCli supports JSON reports", async () => {
  const capture = createIoCapture();
  const exitCode = await runValidateSkillsCli(["--report", "json"], capture.io);

  assert.equal(exitCode, 0);
  const parsed = JSON.parse(capture.stdout.join("\n")) as {
    skillsRoot: string;
    summary: { errors: number };
  };
  assert.ok(parsed.skillsRoot.endsWith(path.join("skill-registry", "skills")));
  assert.equal(typeof parsed.summary.errors, "number");
});
