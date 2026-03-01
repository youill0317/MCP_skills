import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { loadSkill } from "../src/skills/loader.js";
import { runSkillScript } from "../src/skills/executor.js";
import type { AppConfig } from "../src/types.js";

const skillsRoot = path.resolve(process.cwd(), "skills");

const config: AppConfig = {
  skillsRoot: "./skills",
  scriptExecution: {
    enabledByDefault: false,
    timeoutMs: 30000,
    maxOutputBytes: 65536,
    allowedScripts: {
      "document-qa": ["scripts/echo-task.js"]
    }
  },
  references: {
    maxTotalBytes: 262144
  },
  logging: {
    debug: false
  }
};

test("runSkillScript blocks non-allowlisted scripts", async () => {
  const skill = await loadSkill(skillsRoot, "document-qa");
  const result = await runSkillScript({
    config,
    skill,
    relativeScriptPath: "scripts/not-allowed.js",
    args: []
  });

  assert.equal(result.allowed, false);
  assert.equal(result.exit_code, -1);
});

test("runSkillScript executes allowlisted script", async () => {
  const skill = await loadSkill(skillsRoot, "document-qa");
  const result = await runSkillScript({
    config,
    skill,
    relativeScriptPath: "scripts/echo-task.js",
    args: ["hello", "world"]
  });

  assert.equal(result.allowed, true);
  assert.equal(result.exit_code, 0);
  assert.ok(result.stdout.includes("hello"));
});
