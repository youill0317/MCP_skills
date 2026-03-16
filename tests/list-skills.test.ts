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
  assert.ok(ids.includes("design-brief"));
  assert.ok(ids.includes("search-mcp"));
  assert.ok(ids.includes("research-strategy"));
  assert.ok(ids.includes("obsidian-mcp"));
  assert.ok(ids.includes("canva-mcp"));
  assert.ok(ids.includes("report-writing"));
  assert.ok(ids.includes("academic-writing"));
  assert.ok(ids.includes("markdown-structuring"));
  assert.ok(ids.includes("markdown-format-normalization"));
  assert.ok(ids.includes("note-exam-prep"));

  const designBrief = result.skills.find((item) => item.id === "design-brief");
  assert.ok(designBrief);
  assert.equal(designBrief.name, "design-brief");
  assert.ok((designBrief.description ?? "").includes("poster"));
  assert.ok((designBrief.description ?? "").includes("flyer"));
  assert.ok((designBrief.description ?? "").includes("brief"));
  assert.ok((designBrief.references ?? []).includes("references/asset-types.md"));
  assert.ok((designBrief.references ?? []).includes("references/copy-hierarchy.md"));
  assert.ok((designBrief.references ?? []).includes("references/layout-patterns.md"));
  assert.ok((designBrief.references ?? []).includes("references/quality-gate.md"));

  for (const skill of result.skills) {
    assert.ok(!("category" in skill));
    assert.ok(Array.isArray(skill.references));
    for (const referencePath of skill.references) {
      assert.equal(typeof referencePath, "string");
      assert.ok(referencePath.startsWith("references/"));
    }
  }

  const search = result.skills.find((item) => item.id === "search-mcp");
  assert.ok(search);
  assert.equal(search.name, "search-mcp");
  assert.ok((search.references ?? []).includes("references/brave.md"));
  assert.ok((search.references ?? []).includes("references/scholar.md"));
  assert.ok(!(search.references ?? []).includes("references/quick-search-mode.md"));
  assert.ok(!(search.references ?? []).includes("references/deep-research-mode.md"));

  const markdownStructuring = result.skills.find((item) => item.id === "markdown-structuring");
  assert.ok(markdownStructuring);
  assert.equal(markdownStructuring.name, "markdown-structuring");
  assert.ok((markdownStructuring.references ?? []).includes("references/cleaning-and-repair.md"));
  assert.ok((markdownStructuring.references ?? []).includes("references/frontmatter-and-tags.md"));
  assert.ok((markdownStructuring.references ?? []).includes("references/markdown-output-contract.md"));

  const researchStrategy = result.skills.find((item) => item.id === "research-strategy");
  assert.ok(researchStrategy);
  assert.equal(researchStrategy.name, "research-strategy");
  assert.ok((researchStrategy.references ?? []).includes("references/quick-search-mode.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/deep-research-mode.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/literature-search-playbook.md"));
  assert.ok((researchStrategy.references ?? []).includes("references/news-search-playbook.md"));

  const obsidian = result.skills.find((item) => item.id === "obsidian-mcp");
  assert.ok(obsidian);
  assert.equal(obsidian.name, "obsidian-mcp");
  assert.ok((obsidian.references ?? []).includes("references/discovery-and-navigation.md"));
  assert.ok((obsidian.references ?? []).includes("references/resources-and-config.md"));

  const canva = result.skills.find((item) => item.id === "canva-mcp");
  assert.ok(canva);
  assert.equal(canva.name, "canva-mcp");
  assert.ok((canva.description ?? "").includes("retrieve a Canva deck package"));
  assert.ok((canva.references ?? []).includes("references/tool-families.md"));
  assert.ok((canva.references ?? []).includes("references/generation-and-assets.md"));
  assert.ok((canva.references ?? []).includes("references/access-export-and-ops.md"));
  assert.ok((canva.references ?? []).includes("references/delivery-and-reporting.md"));

  const presentationDesign = result.skills.find((item) => item.id === "presentation-design");
  assert.ok(presentationDesign);
  assert.equal(presentationDesign.name, "presentation-design");
  assert.ok((presentationDesign.description ?? "").includes("Canva presentation fact checking"));
  assert.ok((presentationDesign.description ?? "").includes("slide audit"));
  assert.ok((presentationDesign.references ?? []).includes("references/audit-workflow.md"));
  assert.ok((presentationDesign.references ?? []).includes("references/issue-taxonomy.md"));
  assert.ok((presentationDesign.references ?? []).includes("references/audit-report-contract.md"));
  assert.ok((presentationDesign.references ?? []).includes("references/source-priority-and-freshness.md"));

  const reportWriting = result.skills.find((item) => item.id === "report-writing");
  assert.ok(reportWriting);
  assert.equal(reportWriting.name, "report-writing");
  assert.ok((reportWriting.description ?? "").includes("structured report"));
  assert.ok((reportWriting.description ?? "").includes("executive brief"));
  assert.ok((reportWriting.references ?? []).includes("references/research-report.md"));

  const documentSummary = result.skills.find((item) => item.id === "document-summary");
  assert.ok(documentSummary);
  assert.equal(documentSummary.name, "document-summary");
  assert.ok((documentSummary.description ?? "").includes("memo-style"));
  assert.ok((documentSummary.description ?? "").includes("not on writing formal reports or executive briefs"));

  const markdownNormalization = result.skills.find((item) => item.id === "markdown-format-normalization");
  assert.ok(markdownNormalization);
  assert.equal(markdownNormalization.name, "markdown-format-normalization");
  assert.ok((markdownNormalization.references ?? []).includes("references/normalization-rules.md"));
  assert.ok((markdownNormalization.references ?? []).includes("references/frontmatter-and-tags.md"));

  const noteExamPrep = result.skills.find((item) => item.id === "note-exam-prep");
  assert.ok(noteExamPrep);
  assert.equal(noteExamPrep.name, "note-exam-prep");
  assert.ok((noteExamPrep.references ?? []).includes("references/coverage-and-allocation.md"));
  assert.ok((noteExamPrep.references ?? []).includes("references/question-construction.md"));
  assert.ok((noteExamPrep.references ?? []).includes("references/output-contract.md"));
  assert.ok((noteExamPrep.references ?? []).includes("references/quality-gate.md"));
});
