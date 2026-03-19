import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { resolveSkillsRootFromModule } from "../src/project-paths.js";
import { normalizeToPosix, resolvePathWithinRoot, validateSkillId } from "../src/security/policy.js";

test("validateSkillId enforces kebab-style ids", () => {
  assert.equal(validateSkillId("document-qa"), true);
  assert.equal(validateSkillId("DocumentQA"), false);
  assert.equal(validateSkillId("../evil"), false);
});

test("resolvePathWithinRoot blocks traversal", () => {
  const root = resolveSkillsRootFromModule(import.meta.url);
  const safe = resolvePathWithinRoot(root, "document-qa/SKILL.md");
  assert.ok(safe.startsWith(root));

  assert.throws(() => resolvePathWithinRoot(root, "../outside.txt"));
});

test("normalizeToPosix normalizes Windows-style separators", () => {
  assert.equal(normalizeToPosix(path.join("skills", "document-qa", "SKILL.md")), "skills/document-qa/SKILL.md");
});
