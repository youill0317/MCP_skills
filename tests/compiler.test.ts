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
});
