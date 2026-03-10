import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildListSkillsResult } from "../src/skills/list-skills.js";

const skillsRoot = path.resolve(process.cwd(), "skills");

test("buildListSkillsResult returns sorted skills with count", async () => {
  const result = await buildListSkillsResult(skillsRoot);

  assert.equal(result.count, result.skills.length);
  assert.ok(result.skills.length >= 5);
  assert.equal(result.warnings.length, 0);

  const ids = result.skills.map((item) => item.id);
  const sorted = [...ids].sort((a, b) => a.localeCompare(b));
  assert.deepEqual(ids, sorted);
  assert.ok(ids.includes("document-qa"));
  assert.ok(ids.includes("document-summary"));
  assert.ok(ids.includes("search-mcp"));
  assert.ok(ids.includes("research-strategy"));
  assert.ok(ids.includes("obsidian-mcp"));
  assert.ok(ids.includes("report-writing"));
  assert.ok(ids.includes("planning"));
  assert.ok(ids.includes("academic-writing"));

  for (const skill of result.skills) {
    assert.ok(skill.category === "task" || skill.category === "mcp");
    assert.ok(Array.isArray(skill.references));
    for (const referencePath of skill.references) {
      assert.equal(typeof referencePath, "string");
      assert.ok(referencePath.startsWith("references/"));
    }
  }

  const categories = new Set(result.skills.map((item) => item.category));
  assert.deepEqual(categories, new Set(["task", "mcp"]));

  const search = result.skills.find((item) => item.id === "search-mcp");
  assert.ok(search);
  assert.equal(search.category, "mcp");
  assert.ok((search.references ?? []).includes("references/brave.md"));
  assert.ok((search.references ?? []).includes("references/scholar.md"));
  assert.ok(!(search.references ?? []).includes("references/quick-search-mode.md"));
  assert.ok(!(search.references ?? []).includes("references/deep-research-mode.md"));

  const researchStrategy = result.skills.find((item) => item.id === "research-strategy");
  assert.ok(researchStrategy);
  assert.equal(researchStrategy.category, "task");
  assert.ok((researchStrategy.references ?? []).includes("references/quick-search-mode.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/deep-research-mode.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/literature-search-playbook.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/news-search-playbook.md"));

  const obsidian = result.skills.find((item) => item.id === "obsidian-mcp");
  assert.ok(obsidian);
  assert.equal(obsidian.category, "mcp");
  assert.ok((obsidian.references ?? []).includes("references/discovery-and-navigation.md"));

  const reportWriting = result.skills.find((item) => item.id === "report-writing");
  assert.ok(reportWriting);
  assert.equal(reportWriting.category, "task");
  assert.ok((reportWriting.references ?? []).includes("references/research-report.md"));

  const planning = result.skills.find((item) => item.id === "planning");
  assert.ok(planning);
  assert.equal(planning.category, "task");
  assert.ok((planning.references ?? []).includes("references/plan-template.md"));
  assert.ok((planning.references ?? []).includes("references/decision-rules.md"));
});
