import type { LoadedSkill } from "../types.js";

function stringifyInputs(inputs: Record<string, unknown> | undefined): string {
  if (!inputs || Object.keys(inputs).length === 0) {
    return "{}";
  }

  try {
    return JSON.stringify(inputs, null, 2);
  } catch {
    return "{\"_error\":\"Failed to serialize inputs.\"}";
  }
}

export interface ReferenceLoad {
  path: string;
  content: string;
  bytes: number;
}

export interface CompileOptions {
  skill: LoadedSkill;
  task: string;
  inputs?: Record<string, unknown>;
  references: ReferenceLoad[];
}

export function compileInstructions(options: CompileOptions): string {
  const { skill, task, inputs, references } = options;
  const sections: string[] = [];

  sections.push(`# Skill: ${skill.name}`);
  sections.push("");
  sections.push(`Skill ID: ${skill.id}`);
  sections.push(`Category: ${skill.category}`);
  sections.push(`Description: ${skill.description}`);
  sections.push("");
  sections.push("## Task");
  sections.push(task);
  sections.push("");
  sections.push("## Inputs (JSON)");
  sections.push("```json");
  sections.push(stringifyInputs(inputs));
  sections.push("```");
  sections.push("");
  sections.push("## SKILL.md Instructions");
  sections.push(skill.body || "(No body instructions found.)");
  sections.push("");

  if (references.length > 0) {
    sections.push("## Loaded References");
    sections.push("");
    for (const reference of references) {
      sections.push(`### ${reference.path} (${reference.bytes} bytes)`);
      sections.push(reference.content.trim());
      sections.push("");
    }
  } else {
    sections.push("## Loaded References");
    sections.push("(None)");
    sections.push("");
  }

  return sections.join("\n").trim();
}
