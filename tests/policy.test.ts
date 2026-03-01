import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { isScriptAllowed, resolvePathWithinRoot, validateSkillId } from "../src/security/policy.js";
import type { AppConfig } from "../src/types.js";

const mockConfig: AppConfig = {
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

test("validateSkillId enforces kebab-style ids", () => {
  assert.equal(validateSkillId("document-qa"), true);
  assert.equal(validateSkillId("DocumentQA"), false);
  assert.equal(validateSkillId("../evil"), false);
});

test("resolvePathWithinRoot blocks traversal", () => {
  const root = path.resolve(process.cwd(), "skills");
  const safe = resolvePathWithinRoot(root, "document-qa/SKILL.md");
  assert.ok(safe.startsWith(root));

  assert.throws(() => resolvePathWithinRoot(root, "../outside.txt"));
});

test("isScriptAllowed checks allow list by skill", () => {
  assert.equal(isScriptAllowed(mockConfig, "document-qa", "scripts/echo-task.js"), true);
  assert.equal(isScriptAllowed(mockConfig, "document-qa", "scripts/nope.js"), false);
  assert.equal(isScriptAllowed(mockConfig, "document-summary", "scripts/echo-task.js"), false);
});
