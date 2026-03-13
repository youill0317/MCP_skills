import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  migrateSkillsFrontmatter,
  removeLegacyCategoryFromSkillContent
} from "../src/skills/frontmatter-migration.js";
import { runFrontmatterMigrationCli } from "../src/cli/migrate-skills-frontmatter.js";

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

test("removeLegacyCategoryFromSkillContent removes only the legacy category line", () => {
  const raw = [
    "---",
    "name: sample-skill",
    "description: Example description.",
    "category: task",
    "tags: docs",
    "---",
    "",
    "# Mission",
    "",
    "Body"
  ].join("\n");

  const result = removeLegacyCategoryFromSkillContent(raw);

  assert.equal(result.changed, true);
  assert.ok(!result.content.includes("category: task"));
  assert.ok(result.content.includes("name: sample-skill"));
  assert.ok(result.content.includes("tags: docs"));
  assert.ok(result.content.includes("# Mission"));
});

test("migrateSkillsFrontmatter updates legacy skills and leaves current skills untouched", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-migrate-"));
  const legacySkillRoot = path.join(tempRoot, "legacy-skill");
  const currentSkillRoot = path.join(tempRoot, "current-skill");
  await mkdir(legacySkillRoot, { recursive: true });
  await mkdir(currentSkillRoot, { recursive: true });

  await writeFile(
    path.join(legacySkillRoot, "SKILL.md"),
    [
      "---",
      "name: legacy-skill",
      "description: Legacy skill.",
      "category: task",
      "---",
      "",
      "# Mission",
      "",
      "Legacy body"
    ].join("\n"),
    "utf8"
  );

  const currentRaw = [
    "---",
    "name: current-skill",
    "description: Current skill.",
    "---",
    "",
    "# Mission",
    "",
    "Current body"
  ].join("\n");

  await writeFile(path.join(currentSkillRoot, "SKILL.md"), currentRaw, "utf8");

  const summary = await migrateSkillsFrontmatter({ skillsRoot: tempRoot });

  assert.equal(summary.updated, 1);
  assert.equal(summary.unchanged, 1);
  assert.equal(summary.invalid, 0);
  assert.equal(summary.missing, 0);

  const migratedLegacy = await readFile(path.join(legacySkillRoot, "SKILL.md"), "utf8");
  const currentAfter = await readFile(path.join(currentSkillRoot, "SKILL.md"), "utf8");
  assert.ok(!migratedLegacy.includes("category: task"));
  assert.equal(currentAfter, currentRaw);
});

test("migrateSkillsFrontmatter check mode reports pending updates without writing files", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-migrate-"));
  const legacySkillRoot = path.join(tempRoot, "legacy-skill");
  await mkdir(legacySkillRoot, { recursive: true });

  const legacyRaw = [
    "---",
    "name: legacy-skill",
    "description: Legacy skill.",
    "category: task",
    "---",
    "",
    "# Mission",
    "",
    "Legacy body"
  ].join("\n");

  await writeFile(path.join(legacySkillRoot, "SKILL.md"), legacyRaw, "utf8");

  const summary = await migrateSkillsFrontmatter({ skillsRoot: tempRoot, check: true });
  const fileAfter = await readFile(path.join(legacySkillRoot, "SKILL.md"), "utf8");

  assert.equal(summary.updated, 1);
  assert.equal(fileAfter, legacyRaw);
});

test("runFrontmatterMigrationCli returns non-zero in check mode when legacy category remains", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-migrate-"));
  const legacySkillRoot = path.join(tempRoot, "legacy-skill");
  await mkdir(legacySkillRoot, { recursive: true });
  await writeFile(
    path.join(legacySkillRoot, "SKILL.md"),
    [
      "---",
      "name: legacy-skill",
      "description: Legacy skill.",
      "category: task",
      "---",
      "",
      "# Mission",
      "",
      "Legacy body"
    ].join("\n"),
    "utf8"
  );

  const capture = createIoCapture();
  const exitCode = await runFrontmatterMigrationCli(["--check", "--skills-root", tempRoot], capture.io);

  assert.equal(exitCode, 1);
  assert.ok(capture.stdout.some((line) => line.includes("updated=1")));
  assert.ok(capture.stderr.some((line) => line.includes("Legacy category frontmatter still exists")));
});

test("runFrontmatterMigrationCli applies the migration and succeeds", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-migrate-"));
  const legacySkillRoot = path.join(tempRoot, "legacy-skill");
  await mkdir(legacySkillRoot, { recursive: true });
  await writeFile(
    path.join(legacySkillRoot, "SKILL.md"),
    [
      "---",
      "name: legacy-skill",
      "description: Legacy skill.",
      "category: task",
      "---",
      "",
      "# Mission",
      "",
      "Legacy body"
    ].join("\n"),
    "utf8"
  );

  const capture = createIoCapture();
  const exitCode = await runFrontmatterMigrationCli(["--skills-root", tempRoot], capture.io);
  const migrated = await readFile(path.join(legacySkillRoot, "SKILL.md"), "utf8");

  assert.equal(exitCode, 0);
  assert.ok(!migrated.includes("category: task"));
  assert.ok(capture.stdout.some((line) => line.includes("updated=1")));
});
