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
  assert.equal(skill.name, "Document QA");
  assert.equal(skill.category, "task");
  assert.ok(skill.description.includes("Answer questions"));
  assert.ok(skill.body.includes("## Use When"));
});

test("loadSkill reads report-writing metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "report-writing");
  assert.equal(skill.id, "report-writing");
  assert.equal(skill.name, "Report Writing");
  assert.equal(skill.category, "task");
  assert.ok(skill.description.includes("structured reports"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("loadSkill reads planning metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "planning");
  assert.equal(skill.id, "planning");
  assert.equal(skill.name, "Planning");
  assert.equal(skill.category, "task");
  assert.ok(skill.description.includes("decision-complete execution plans"));
  assert.ok(skill.body.includes("## Core Workflow"));
});

test("loadSkill reads search-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "search-mcp");
  assert.equal(skill.id, "search-mcp");
  assert.equal(skill.name, "Search MCP");
  assert.equal(skill.category, "mcp");
  assert.ok(skill.description.includes("individual search MCP servers"));
  assert.ok(skill.body.includes("provider/tool selection"));
});

test("loadSkill reads research-strategy metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "research-strategy");
  assert.equal(skill.id, "research-strategy");
  assert.equal(skill.name, "Research Strategy");
  assert.equal(skill.category, "task");
  assert.ok(skill.description.includes("web research"));
  assert.ok(skill.body.includes("## Resource Loading"));
});

test("loadSkill reads obsidian-mcp metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "obsidian-mcp");
  assert.equal(skill.id, "obsidian-mcp");
  assert.equal(skill.name, "Obsidian MCP");
  assert.equal(skill.category, "mcp");
  assert.ok(skill.description.includes("`mcp_obsidian`"));
  assert.ok(skill.body.includes("## Category"));
});

test("loadSkill reads obsidian-note-linking metadata and body", async () => {
  const skill = await loadSkill(skillsRoot, "obsidian-note-linking");
  assert.equal(skill.id, "obsidian-note-linking");
  assert.equal(skill.name, "Obsidian Note Linking");
  assert.equal(skill.category, "task");
  assert.ok(skill.description.includes("numeric filename prefixes"));
  assert.ok(skill.body.includes("## Output Standard"));
});

test("listSkillManifests returns installed skills with categories", async () => {
  const manifests = await listSkillManifests(skillsRoot);
  const ids = manifests.map((item) => item.id);
  assert.ok(ids.includes("document-qa"));
  assert.ok(ids.includes("document-summary"));
  assert.ok(ids.includes("search-mcp"));
  assert.ok(ids.includes("research-strategy"));
  assert.ok(ids.includes("obsidian-mcp"));
  assert.ok(ids.includes("obsidian-note-linking"));
  assert.ok(ids.includes("report-writing"));
  assert.ok(ids.includes("planning"));
  assert.ok(ids.includes("academic-writing"));
  assert.ok(ids.includes("presentation-design"));
  assert.ok(ids.includes("problem-definition"));

  const search = manifests.find((item) => item.id === "search-mcp");
  assert.ok(search);
  assert.equal(search.category, "mcp");
  assert.ok(search.references.includes("references/brave.md"));
  assert.ok(search.references.includes("references/scholar.md"));
  assert.ok(!search.references.includes("references/quick-search-mode.md"));
  assert.ok(!search.references.includes("references/deep-research-mode.md"));

  const researchStrategy = manifests.find((item) => item.id === "research-strategy");
  assert.ok(researchStrategy);
  assert.equal(researchStrategy.category, "task");
  assert.ok(researchStrategy.references.includes("references/quick-search-mode.md"));
  assert.ok(researchStrategy.references.includes("references/deep-research-mode.md"));

  const obsidian = manifests.find((item) => item.id === "obsidian-mcp");
  assert.ok(obsidian);
  assert.equal(obsidian.category, "mcp");
  assert.ok(obsidian.references.includes("references/read-and-link-tools.md"));

  const reportWriting = manifests.find((item) => item.id === "report-writing");
  assert.ok(reportWriting);
  assert.equal(reportWriting.category, "task");
  assert.ok(reportWriting.references.includes("references/research-report.md"));

  const obsidianNoteLinking = manifests.find((item) => item.id === "obsidian-note-linking");
  assert.ok(obsidianNoteLinking);
  assert.equal(obsidianNoteLinking.category, "task");
  assert.ok(obsidianNoteLinking.references.includes("references/link-scoring-rubric.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/output-template.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/consistency-policy.md"));
  assert.ok(obsidianNoteLinking.references.includes("references/sequence-linking.md"));

  const planning = manifests.find((item) => item.id === "planning");
  assert.ok(planning);
  assert.equal(planning.category, "task");
  assert.ok(planning.references.includes("references/plan-template.md"));
  assert.ok(planning.references.includes("references/decision-rules.md"));
});

test("loadSkill rejects skills missing category", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "mcp-skills-loader-"));
  const tempSkillRoot = path.join(tempRoot, "missing-category");
  await mkdir(tempSkillRoot, { recursive: true });
  await writeFile(
    path.join(tempSkillRoot, "SKILL.md"),
    [
      "---",
      "name: Missing Category",
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
    () => loadSkill(tempRoot, "missing-category"),
    /frontmatter must include 'category'/
  );
});
