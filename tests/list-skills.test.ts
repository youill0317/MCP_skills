import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildListSkillsResult } from "../src/skills/list-skills.js";

const skillsRoot = path.resolve(process.cwd(), "skills");

test("buildListSkillsResult returns sorted skills with count", async () => {
  const result = await buildListSkillsResult(skillsRoot);

  assert.equal(result.count, result.skills.length);
  assert.ok(result.skills.length >= 4);
  assert.equal(result.warnings.length, 0);

  const ids = result.skills.map((item) => item.id);
  const sorted = [...ids].sort((a, b) => a.localeCompare(b));
  assert.deepEqual(ids, sorted);
  assert.ok(ids.includes("document-qa"));
  assert.ok(ids.includes("document-summary"));
  assert.ok(ids.includes("research-mode"));
  assert.ok(ids.includes("report-writer"));

  for (const skill of result.skills) {
    assert.ok(Array.isArray(skill.references));
    for (const referencePath of skill.references) {
      assert.equal(typeof referencePath, "string");
      assert.ok(referencePath.startsWith("references/"));
    }
  }

  const researchMode = result.skills.find((item) => item.id === "research-mode");
  assert.ok(researchMode);
  assert.ok((researchMode.references ?? []).includes("references/search-playbook.md"));

  const reportWriter = result.skills.find((item) => item.id === "report-writer");
  assert.ok(reportWriter);
  assert.ok((reportWriter.references ?? []).includes("references/research-report.md"));
});
