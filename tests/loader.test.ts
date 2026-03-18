import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { listSkillManifests, loadSkill } from "../src/skills/loader.js";

const skillsRoot = path.resolve(process.cwd(), "skills");

test("loadSkill reads frontmatter and body", async () => {
  const skill = await loadSkill(skillsRoot, "document-qa");
  assert.equal(skill.id, "document-qa");
  assert.equal(skill.name, "document-qa");
  assert.ok(skill.description.includes("evidence mapping"));
  assert.ok(skill.body.includes("## Use When"));
  assert.ok(skill.body.includes("Add these sections only when applicable"));
  assert.ok(skill.references.includes("references/question-types-and-answer-modes.md"));
  assert.ok(skill.references.includes("references/source-hierarchy-and-authority.md"));
  assert.ok(skill.references.includes("references/conflict-and-negative-answer-policy.md"));
  assert.ok(skill.references.includes("references/structured-output-contract.md"));
  assert.ok(skill.references.includes("references/inference-boundaries.md"));
});

test("loadSkill reads report-writing metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "report-writing");
  assert.equal(skill.id, "report-writing");
  assert.equal(skill.name, "report-writing");
  assert.ok(skill.description.includes("structured report"));
  assert.ok(skill.description.includes("executive brief"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads academic-writing APA-only metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "academic-writing");
  assert.equal(skill.id, "academic-writing");
  assert.equal(skill.name, "academic-writing");
  assert.ok(skill.description.includes("APA 7 style"));
  assert.ok(skill.body.includes("## Core Workflow"));
  assert.ok(skill.body.includes("Determine task mode"));
  assert.ok(skill.references.includes("references/paper-types-and-required-elements.md"));
  assert.ok(skill.references.includes("references/title-page-abstract-keywords.md"));
  assert.ok(skill.references.includes("references/headings-paragraphs-and-layout.md"));
  assert.ok(skill.references.includes("references/quotations-footnotes-and-appendices.md"));
  assert.ok(skill.references.includes("references/submission-readiness-checklist.md"));
  assert.ok(skill.references.includes("references/input-sufficiency-and-gap-handling.md"));
  assert.ok(!skill.references.includes("references/type-empirical.md"));
  assert.ok(!skill.references.includes("references/type-literature-review-meta-analysis.md"));
  assert.ok(!skill.references.includes("references/type-theoretical.md"));
  assert.ok(!skill.references.includes("references/type-methodological.md"));
  assert.ok(!skill.references.includes("references/type-qualitative.md"));
  assert.ok(!skill.references.includes("references/type-mixed-methods.md"));
});

test("loadSkill reads document-summary memo-style boundary", async () => {
  const skill = await loadSkill(skillsRoot, "document-summary");
  assert.equal(skill.id, "document-summary");
  assert.equal(skill.name, "document-summary");
  assert.ok(skill.description.includes("memo-style"));
  assert.ok(skill.body.includes("Do not turn the output into a formal report"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads search-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "search-mcp");
  assert.equal(skill.id, "search-mcp");
  assert.equal(skill.name, "search-mcp");
  assert.ok(skill.description.includes("individual search MCP servers"));
  assert.ok(skill.body.includes("provider/tool selection"));
});

test("loadSkill reads markdown-structuring metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-structuring");
  assert.equal(skill.id, "markdown-structuring");
  assert.equal(skill.name, "markdown-structuring");
  assert.ok(skill.description.includes("new, well-structured Markdown document"));
  assert.ok(skill.description.includes("logical order"));
  assert.ok(skill.description.includes("standardized frontmatter schema"));
  assert.ok(skill.body.includes("## Core Workflow"));
});

test("loadSkill reads research-strategy metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "research-strategy");
  assert.equal(skill.id, "research-strategy");
  assert.equal(skill.name, "research-strategy");
  assert.ok(skill.description.includes("web research"));
  assert.ok(skill.body.includes("## Resource Loading"));
});

test("loadSkill reads obsidian-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "obsidian-mcp");
  assert.equal(skill.id, "obsidian-mcp");
  assert.equal(skill.name, "obsidian-mcp");
  assert.ok(skill.description.includes("`mcp_obsidian`"));
  assert.ok(skill.body.includes("## Core Workflow"));
});

test("loadSkill reads canva-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "canva-mcp");
  assert.equal(skill.id, "canva-mcp");
  assert.equal(skill.name, "canva-mcp");
  assert.ok(skill.description.includes("official Canva MCP connector"));
  assert.ok(skill.description.includes("web link plus a short local Markdown design report"));
  assert.ok(skill.body.includes("## Core Workflow"));
});

test("loadSkill reads obsidian-note-linking metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "obsidian-note-linking");
  assert.equal(skill.id, "obsidian-note-linking");
  assert.equal(skill.name, "obsidian-note-linking");
  assert.ok(skill.description.includes("numeric filename prefixes"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads markdown-structuring restructuring boundary", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-structuring");
  assert.equal(skill.id, "markdown-structuring");
  assert.equal(skill.name, "markdown-structuring");
  assert.ok(skill.description.includes("instead of preserving the original layout"));
  assert.ok(skill.body.includes("Treat `---` page boundaries as analysis hints only"));
  assert.ok(skill.body.includes("Use `>` only for direct quotations"));
  assert.ok(skill.body.includes("tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`"));
  assert.ok(skill.body.includes("## Resource Loading"));
});

test("loadSkill reads markdown-format-normalization metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-format-normalization");
  assert.equal(skill.id, "markdown-format-normalization");
  assert.equal(skill.name, "markdown-format-normalization");
  assert.ok(skill.description.includes("original Markdown content"));
  assert.ok(skill.description.includes("page boundaries"));
  assert.ok(skill.description.includes("standardized frontmatter schema"));
  assert.ok(skill.body.includes("Treat every `---` separator as a page boundary"));
  assert.ok(skill.body.includes("Use `>` only for direct quotations"));
  assert.ok(skill.body.includes("tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`"));
  assert.ok(skill.body.includes("## Integration"));
});

test("loadSkill reads note-exam-prep metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "note-exam-prep");
  assert.equal(skill.id, "note-exam-prep");
  assert.equal(skill.name, "note-exam-prep");
  assert.ok(skill.description.includes("multiple-choice"));
  assert.ok(skill.description.includes("collapsible answer-and-explanation block"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("listSkillManifests returns installed skills", async () => {
  const manifests = await listSkillManifests(skillsRoot);
  const ids = manifests.map((item) => item.id);
  assert.ok(ids.includes("document-qa"));
  assert.ok(ids.includes("document-summary"));
  assert.ok(ids.includes("search-mcp"));
  assert.ok(ids.includes("research-strategy"));
  assert.ok(ids.includes("obsidian-mcp"));
  assert.ok(ids.includes("canva-mcp"));
  assert.ok(ids.includes("obsidian-note-linking"));
  assert.ok(ids.includes("report-writing"));
  assert.ok(ids.includes("academic-writing"));
  assert.ok(ids.includes("presentation-design"));
  assert.ok(ids.includes("problem-definition"));
  assert.ok(ids.includes("markdown-structuring"));
  assert.ok(ids.includes("markdown-format-normalization"));
  assert.ok(ids.includes("note-exam-prep"));

  const search = manifests.find((item) => item.id === "search-mcp");
  assert.ok(search);
  assert.equal(search.name, "search-mcp");
  assert.ok(search.references.includes("references/brave.md"));
  assert.ok(search.references.includes("references/scholar.md"));
  assert.ok(!search.references.includes("references/quick-search-mode.md"));
  assert.ok(!search.references.includes("references/deep-research-mode.md"));

  const markdownStructuring = manifests.find((item) => item.id === "markdown-structuring");
  assert.ok(markdownStructuring);
  assert.equal(markdownStructuring.name, "markdown-structuring");
  assert.ok(markdownStructuring.references.includes("references/cleaning-and-repair.md"));
  assert.ok(markdownStructuring.references.includes("references/markdown-output-contract.md"));
  assert.ok(markdownStructuring.references.includes("references/frontmatter-and-tags.md"));

  const researchStrategy = manifests.find((item) => item.id === "research-strategy");
  assert.ok(researchStrategy);
  assert.equal(researchStrategy.name, "research-strategy");
  assert.ok(researchStrategy.references.includes("references/quick-search-mode.md"));
  assert.ok(researchStrategy.references.includes("references/deep-research-mode.md"));

  const obsidian = manifests.find((item) => item.id === "obsidian-mcp");
  assert.ok(obsidian);
  assert.equal(obsidian.name, "obsidian-mcp");
  assert.ok(obsidian.references.includes("references/read-and-link-tools.md"));
  assert.ok(obsidian.references.includes("references/resources-and-config.md"));

  const canva = manifests.find((item) => item.id === "canva-mcp");
  assert.ok(canva);
  assert.equal(canva.name, "canva-mcp");
  assert.ok(canva.references.includes("references/tool-families.md"));
  assert.ok(canva.references.includes("references/generation-and-assets.md"));
  assert.ok(canva.references.includes("references/access-export-and-ops.md"));
  assert.ok(canva.references.includes("references/delivery-and-reporting.md"));

  const reportWriting = manifests.find((item) => item.id === "report-writing");
  assert.ok(reportWriting);
  assert.equal(reportWriting.name, "report-writing");
  assert.ok(reportWriting.references.includes("references/research-report.md"));

  const academicWriting = manifests.find((item) => item.id === "academic-writing");
  assert.ok(academicWriting);
  assert.equal(academicWriting.name, "academic-writing");
  assert.ok(academicWriting.references.includes("references/paper-types-and-required-elements.md"));
  assert.ok(academicWriting.references.includes("references/title-page-abstract-keywords.md"));
  assert.ok(academicWriting.references.includes("references/headings-paragraphs-and-layout.md"));
  assert.ok(academicWriting.references.includes("references/quotations-footnotes-and-appendices.md"));
  assert.ok(academicWriting.references.includes("references/submission-readiness-checklist.md"));
  assert.ok(academicWriting.references.includes("references/input-sufficiency-and-gap-handling.md"));
  assert.ok(!academicWriting.references.includes("references/type-empirical.md"));
  assert.ok(!academicWriting.references.includes("references/type-literature-review-meta-analysis.md"));
  assert.ok(!academicWriting.references.includes("references/type-theoretical.md"));
  assert.ok(!academicWriting.references.includes("references/type-methodological.md"));
  assert.ok(!academicWriting.references.includes("references/type-qualitative.md"));
  assert.ok(!academicWriting.references.includes("references/type-mixed-methods.md"));

  const documentQa = manifests.find((item) => item.id === "document-qa");
  assert.ok(documentQa);
  assert.equal(documentQa.name, "document-qa");
  assert.ok(documentQa.references.includes("references/question-types-and-answer-modes.md"));
  assert.ok(documentQa.references.includes("references/source-hierarchy-and-authority.md"));
  assert.ok(documentQa.references.includes("references/conflict-and-negative-answer-policy.md"));
  assert.ok(documentQa.references.includes("references/structured-output-contract.md"));
  assert.ok(documentQa.references.includes("references/inference-boundaries.md"));

  const obsidianNoteLinking = manifests.find((item) => item.id === "obsidian-note-linking");
  assert.ok(obsidianNoteLinking);
  assert.equal(obsidianNoteLinking.name, "obsidian-note-linking");
  assert.ok(obsidianNoteLinking.references.includes("references/link-scoring-rubric.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/output-template.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/consistency-policy.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/sequence-linking.md"));

  const markdownNormalization = manifests.find((item) => item.id === "markdown-format-normalization");
  assert.ok(markdownNormalization);
  assert.equal(markdownNormalization.name, "markdown-format-normalization");
  assert.ok(markdownNormalization.references.includes("references/normalization-rules.md"));
  assert.ok(markdownNormalization.references.includes("references/heading-list-table-rules.md"));
  assert.ok(markdownNormalization.references.includes("references/output-examples.md"));
  assert.ok(markdownNormalization.references.includes("references/frontmatter-and-tags.md"));

  const noteExamPrep = manifests.find((item) => item.id === "note-exam-prep");
  assert.ok(noteExamPrep);
  assert.equal(noteExamPrep.name, "note-exam-prep");
  assert.ok(noteExamPrep.references.includes("references/coverage-and-allocation.md"));
  assert.ok(noteExamPrep.references.includes("references/question-construction.md"));
  assert.ok(noteExamPrep.references.includes("references/output-contract.md"));
  assert.ok(noteExamPrep.references.includes("references/quality-gate.md"));
});

test("loadSkill rejects skills with legacy category frontmatter", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-loader-"));
  const tempSkillRoot = path.join(tempRoot, "legacy-category");
  await mkdir(tempSkillRoot, { recursive: true });
  await writeFile(
    path.join(tempSkillRoot, "SKILL.md"),
    [
      "---",
      "name: legacy-category",
      "description: Used to verify frontmatter validation.",
      "category: task",
      "---",
      "",
      "# Mission",
      "",
      "Body"
    ].join("\n"),
    "utf8"
  );

  await assert.rejects(
    () => loadSkill(tempRoot, "legacy-category"),
    /frontmatter must not include 'category'/
  );
});

test("loadSkill rejects skills whose frontmatter name is not hyphen-case", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-loader-"));
  const tempSkillRoot = path.join(tempRoot, "bad-name");
  await mkdir(tempSkillRoot, { recursive: true });
  await writeFile(
    path.join(tempSkillRoot, "SKILL.md"),
    [
      "---",
      "name: Bad Name",
      "description: Used to verify frontmatter validation.",
      "---",
      "",
      "# Mission",
      "",
      "Body"
    ].join("\n"),
    "utf8"
  );

  await assert.rejects(
    () => loadSkill(tempRoot, "bad-name"),
    /frontmatter 'name' must use lowercase letters, numbers, and hyphens only/
  );
});

test("loadSkill rejects skills whose frontmatter name does not match folder id", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-loader-"));
  const tempSkillRoot = path.join(tempRoot, "folder-id");
  await mkdir(tempSkillRoot, { recursive: true });
  await writeFile(
    path.join(tempSkillRoot, "SKILL.md"),
    [
      "---",
      "name: another-id",
      "description: Used to verify frontmatter validation.",
      "---",
      "",
      "# Mission",
      "",
      "Body"
    ].join("\n"),
    "utf8"
  );

  await assert.rejects(
    () => loadSkill(tempRoot, "folder-id"),
    /frontmatter 'name' must match folder id 'folder-id'/
  );
});
