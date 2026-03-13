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
  assert.ok(skill.description.includes("Answer questions"));
  assert.ok(skill.body.includes("## Use When"));
});

test("loadSkill reads report-writing metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "report-writing");
  assert.equal(skill.id, "report-writing");
  assert.equal(skill.name, "report-writing");
  assert.ok(skill.description.includes("structured report"));
  assert.ok(skill.description.includes("executive brief"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads design-brief metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "design-brief");
  assert.equal(skill.id, "design-brief");
  assert.equal(skill.name, "design-brief");
  assert.ok(skill.description.includes("poster"));
  assert.ok(skill.description.includes("flyer"));
  assert.ok(skill.description.includes("brief"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads document-summary memo-style boundary", async () => {
  const skill = await loadSkill(skillsRoot, "document-summary");
  assert.equal(skill.id, "document-summary");
  assert.equal(skill.name, "document-summary");
  assert.ok(skill.description.includes("memo-style"));
  assert.ok(skill.description.includes("not on writing formal reports or executive briefs"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads search-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "search-mcp");
  assert.equal(skill.id, "search-mcp");
  assert.equal(skill.name, "search-mcp");
  assert.ok(skill.description.includes("individual search MCP servers"));
  assert.ok(skill.body.includes("provider/tool selection"));
});

test("loadSkill reads markitdown-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "markitdown-mcp");
  assert.equal(skill.id, "markitdown-mcp");
  assert.equal(skill.name, "markitdown-mcp");
  assert.ok(skill.description.includes("MCP-side document or URL to Markdown conversion setup"));
  assert.ok(skill.body.includes("## Core Workflow"));
});

test("loadSkill reads markdown-conversion metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-conversion");
  assert.equal(skill.id, "markdown-conversion");
  assert.equal(skill.name, "markdown-conversion");
  assert.ok(skill.description.includes("first-pass Markdown"));
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

test("loadSkill reads pdf-markdown-remediation metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "pdf-markdown-remediation");
  assert.equal(skill.id, "pdf-markdown-remediation");
  assert.equal(skill.name, "pdf-markdown-remediation");
  assert.ok(skill.description.includes("misaligned with its source"));
  assert.ok(skill.body.includes("## Resource Loading"));
});

test("loadSkill reads markdown-format-normalization metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-format-normalization");
  assert.equal(skill.id, "markdown-format-normalization");
  assert.equal(skill.name, "markdown-format-normalization");
  assert.ok(skill.description.includes("existing Markdown"));
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
  assert.ok(ids.includes("design-brief"));
  assert.ok(ids.includes("search-mcp"));
  assert.ok(ids.includes("research-strategy"));
  assert.ok(ids.includes("obsidian-mcp"));
  assert.ok(ids.includes("canva-mcp"));
  assert.ok(ids.includes("obsidian-note-linking"));
  assert.ok(ids.includes("report-writing"));
  assert.ok(ids.includes("academic-writing"));
  assert.ok(ids.includes("presentation-design"));
  assert.ok(ids.includes("problem-definition"));
  assert.ok(ids.includes("markdown-conversion"));
  assert.ok(ids.includes("pdf-markdown-remediation"));
  assert.ok(ids.includes("markdown-format-normalization"));
  assert.ok(ids.includes("note-exam-prep"));
  assert.ok(ids.includes("markitdown-mcp"));

  const designBrief = manifests.find((item) => item.id === "design-brief");
  assert.ok(designBrief);
  assert.equal(designBrief.name, "design-brief");
  assert.ok(designBrief.references.includes("references/asset-types.md"));
  assert.ok(designBrief.references.includes("references/copy-hierarchy.md"));
  assert.ok(designBrief.references.includes("references/layout-patterns.md"));
  assert.ok(designBrief.references.includes("references/quality-gate.md"));

  const search = manifests.find((item) => item.id === "search-mcp");
  assert.ok(search);
  assert.equal(search.name, "search-mcp");
  assert.ok(search.references.includes("references/brave.md"));
  assert.ok(search.references.includes("references/scholar.md"));
  assert.ok(!search.references.includes("references/quick-search-mode.md"));
  assert.ok(!search.references.includes("references/deep-research-mode.md"));

  const markitdown = manifests.find((item) => item.id === "markitdown-mcp");
  assert.ok(markitdown);
  assert.equal(markitdown.name, "markitdown-mcp");
  assert.ok(markitdown.references.includes("references/tool-selection.md"));
  assert.ok(markitdown.references.includes("references/setup-and-examples.md"));

  const markdownConversion = manifests.find((item) => item.id === "markdown-conversion");
  assert.ok(markdownConversion);
  assert.equal(markdownConversion.name, "markdown-conversion");
  assert.ok(markdownConversion.references.includes("references/conversion-boundaries.md"));
  assert.ok(markdownConversion.references.includes("references/markitdown-workflow.md"));
  assert.ok(markdownConversion.references.includes("references/post-conversion-review.md"));

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

  const obsidianNoteLinking = manifests.find((item) => item.id === "obsidian-note-linking");
  assert.ok(obsidianNoteLinking);
  assert.equal(obsidianNoteLinking.name, "obsidian-note-linking");
  assert.ok(obsidianNoteLinking.references.includes("references/link-scoring-rubric.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/output-template.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/consistency-policy.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/sequence-linking.md"));

  const pdfRemediation = manifests.find((item) => item.id === "pdf-markdown-remediation");
  assert.ok(pdfRemediation);
  assert.equal(pdfRemediation.name, "pdf-markdown-remediation");
  assert.ok(pdfRemediation.references.includes("references/cleaning-and-repair.md"));
  assert.ok(pdfRemediation.references.includes("references/markdown-output-contract.md"));
  assert.ok(pdfRemediation.references.includes("references/frontmatter-and-tags.md"));
  assert.ok(pdfRemediation.references.includes("references/source-comparison-and-fallbacks.md"));

  const markdownNormalization = manifests.find((item) => item.id === "markdown-format-normalization");
  assert.ok(markdownNormalization);
  assert.equal(markdownNormalization.name, "markdown-format-normalization");
  assert.ok(markdownNormalization.references.includes("references/normalization-rules.md"));
  assert.ok(markdownNormalization.references.includes("references/heading-list-table-rules.md"));
  assert.ok(markdownNormalization.references.includes("references/output-examples.md"));

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
