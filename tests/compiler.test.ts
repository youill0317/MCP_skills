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

test("compileInstructions works for pdf-markdown-remediation with references", async () => {
  const skill = await loadSkill(skillsRoot, "pdf-markdown-remediation");
  const compiled = compileInstructions({
    skill,
    task: "Convert extracted PDF text into complete Markdown.",
    inputs: { preserve_language: true, require_frontmatter: true },
    references: [
      {
        path: "references/verification-checklist.md",
        content: "verification content",
        bytes: 20
      }
    ]
  });

  assert.ok(compiled.includes("Convert extracted PDF text into complete Markdown."));
  assert.ok(compiled.includes("\"preserve_language\": true"));
  assert.ok(compiled.includes("references/verification-checklist.md"));
  assert.ok(!compiled.includes("Category:"));
});

test("compileInstructions works for markdown-conversion with references", async () => {
  const skill = await loadSkill(skillsRoot, "markdown-conversion");
  const compiled = compileInstructions({
    skill,
    task: "Convert the provided DOCX file into first-pass Markdown.",
    inputs: { source_kind: "docx", use_markitdown_mcp: true },
    references: [
      {
        path: "references/post-conversion-review.md",
        content: "review content",
        bytes: 14
      }
    ]
  });

  assert.ok(compiled.includes("Convert the provided DOCX file into first-pass Markdown."));
  assert.ok(compiled.includes("\"use_markitdown_mcp\": true"));
  assert.ok(compiled.includes("references/post-conversion-review.md"));
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
