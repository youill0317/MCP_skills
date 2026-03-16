import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { loadSkill } from "../src/skills/loader.js";
import { compileInstructions } from "../src/skills/compiler.js";

const skillsRoot = path.resolve(process.cwd(), "skills");

test("compileInstructions includes task, inputs, and references", async () => {
  const skill = await loadSkill(skillsRoot, "document-summary");
  const compiled = compileInstructions({
    skill,
    task: "Summarize the attached policy document.",
    inputs: { audience: "exec" },
    references: [
      {
        path: "references/summary-style.md",
        content: "summary style content",
        bytes: 21
      }
    ]
  });

  assert.ok(compiled.includes("Summarize the attached policy document."));
  assert.ok(compiled.includes("\"audience\": \"exec\""));
  assert.ok(compiled.includes("references/summary-style.md"));
  assert.ok(!compiled.includes("Category:"));
});

test("compileInstructions works for markdown-structuring with references", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-structuring");
  const compiled = compileInstructions({
    skill,
    task: "Restructure the pasted research notes into the canonical Markdown note format.",
    inputs: { add_related_notes: true, require_frontmatter: true },
    references: [
      {
        path: "references/structure-analysis.md",
        content: "Group related material together even when the source scattered it across pages or sections.\nUse `>` only for direct quotations, external-source excerpts, or clearly quoted source material.",
        bytes: 187
      },
      {
        path: "references/frontmatter-and-tags.md",
        content: "tags: []\nprevious_lecture: \"\"\nnext_lecture: \"\"\nrelated_notes: []\nupdated: \"YYYY-MM-DD\"\nDo not create a separate body section for related notes; keep this information in frontmatter.",
        bytes: 190
      },
      {
        path: "references/markdown-output-contract.md",
        content: "Produce a complete new Markdown file from beginning to end.\nDo not preserve `---` page boundaries unless they still serve the new structure.",
        bytes: 137
      },
      {
        path: "references/verification-checklist.md",
        content: "verification content",
        bytes: 20
      }
    ]
  });

  assert.ok(compiled.includes("Restructure the pasted research notes into the canonical Markdown note format."));
  assert.ok(compiled.includes("\"add_related_notes\": true"));
  assert.ok(compiled.includes("references/verification-checklist.md"));
  assert.ok(compiled.includes("Create a new Markdown file that preserves the source content while reorganizing it into a clearer logical structure."));
  assert.ok(compiled.includes("Group related material together even when the source scattered it across pages or sections."));
  assert.ok(compiled.includes("Produce a complete new Markdown file from beginning to end."));
  assert.ok(compiled.includes("Do not preserve `---` page boundaries unless they still serve the new structure."));
  assert.ok(compiled.includes("Use `>` only for direct quotations"));
  assert.ok(compiled.includes("previous_lecture"));
  assert.ok(compiled.includes("next_lecture"));
  assert.ok(compiled.includes("related_notes"));
  assert.ok(compiled.includes("updated: \"YYYY-MM-DD\""));
  assert.ok(compiled.includes("Do not create a separate body section for related notes"));
  assert.ok(!compiled.includes("Category:"));
});

test("compileInstructions works for markdown-format-normalization with references", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-format-normalization");
  const compiled = compileInstructions({
    skill,
    task: "Preserve the lecture note structure and only normalize the Markdown formatting.",
    inputs: { preserve_original_structure: true, normalize_existing_frontmatter: true },
    references: [
      {
        path: "references/normalization-rules.md",
        content: "Preserve content first, adjust Markdown structure second.\nTreat every `---` separator as a page boundary.",
        bytes: 107
      },
      {
        path: "references/frontmatter-and-tags.md",
        content: "tags: []\nprevious_lecture: \"\"\nnext_lecture: \"\"\nrelated_notes: []\nupdated: \"YYYY-MM-DD\"\nIf frontmatter is missing, create it with the standard keys.",
        bytes: 161
      },
      {
        path: "references/heading-list-table-rules.md",
        content: "Use `>` only for direct quotations, external-source excerpts, or clearly quoted source material.",
        bytes: 95
      },
      {
        path: "references/verification-checklist.md",
        content: "review content",
        bytes: 14
      }
    ]
  });

  assert.ok(compiled.includes("Preserve the lecture note structure and only normalize the Markdown formatting."));
  assert.ok(compiled.includes("\"preserve_original_structure\": true"));
  assert.ok(compiled.includes("references/verification-checklist.md"));
  assert.ok(compiled.includes("Preserve content first, adjust Markdown structure second."));
  assert.ok(compiled.includes("Treat every `---` separator as a page boundary"));
  assert.ok(compiled.includes("never merge, continue, or reorganize content across page boundaries"));
  assert.ok(compiled.includes("Use `>` only for direct quotations"));
  assert.ok(compiled.includes("broken table, Mermaid block, code fence, or obvious typo"));
  assert.ok(compiled.includes("previous_lecture"));
  assert.ok(compiled.includes("next_lecture"));
  assert.ok(compiled.includes("related_notes"));
  assert.ok(compiled.includes("updated: \"YYYY-MM-DD\""));
  assert.ok(compiled.includes("If frontmatter is missing, create it with the standard keys."));
  assert.ok(!compiled.includes("Category:"));
});

test("compileInstructions works for note-exam-prep with references", async () => {
  const skill = await loadSkill(skillsRoot, "note-exam-prep");
  const compiled = compileInstructions({
    skill,
    task: "Create a complete exam-prep set from the current note.",
    inputs: { source: "current-note", require_collapsible_answers: true },
    references: [
      {
        path: "references/output-contract.md",
        content: "output contract content",
        bytes: 23
      }
    ]
  });

  assert.ok(compiled.includes("Create a complete exam-prep set from the current note."));
  assert.ok(compiled.includes("\"require_collapsible_answers\": true"));
  assert.ok(compiled.includes("references/output-contract.md"));
  assert.ok(!compiled.includes("Category:"));
});
