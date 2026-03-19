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

test("validateSkills succeeds for the current repository skills root", async () => {
  const skillsRoot = resolveSkillsRootFromModule(import.meta.url);
  const summary = await validateSkills(skillsRoot);

  assert.ok(summary.valid > 0);
  assert.equal(summary.invalid, 0);
  assert.equal(summary.missing, 0);
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
  const invalidSkillRoot = path.join(tempRoot, "Bad Skill");
  await mkdir(invalidSkillRoot, { recursive: true });
  await writeFile(
    path.join(invalidSkillRoot, "SKILL.md"),
    ["---", "name: bad-skill", "description: Invalid folder name.", "---", "", "# Mission"].join("\n"),
    "utf8"
  );

  const capture = createIoCapture();
  const exitCode = await runValidateSkillsCli(["--skills-root", tempRoot], capture.io);

  assert.equal(exitCode, 1);
  assert.ok(capture.stdout.some((line) => line.includes("invalid=1")));
  assert.ok(capture.stdout.some((line) => line.includes("Bad Skill: invalid")));
  assert.ok(capture.stderr.some((line) => line.includes("Skill validation failed")));
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
