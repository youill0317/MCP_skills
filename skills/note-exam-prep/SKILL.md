---
name: note-exam-prep
description: Generate exam-prep practice sets from the current note/page or pasted note content. Use when the user wants objective multiple-choice and fill-in-the-blank questions that comprehensively cover all material in the current note, with each question followed by a collapsible answer-and-explanation block.
---

# Mission

Turn the full content of a note into a complete exam-prep practice set without skipping any meaningful material.

## Use When

- The user wants practice questions from the current note, current page, or pasted note content.
- The requested format is objective practice, especially multiple-choice and fill-in-the-blank.
- The user wants broad coverage of the note rather than a short quiz on only one section.
- Each question must include an immediately accessible answer and explanation in a collapsible block.

## Scope

1. Use only the provided note/page content.
2. Cover every meaningful section, concept, definition, comparison, sequence, example, formula, table, and code fragment that can reasonably be tested.
3. Generate only multiple-choice and fill-in-the-blank questions unless the user explicitly requests other formats.
4. Include any required supporting material such as options, excerpts, tables, formulas, or code snippets inside the question.
5. Keep the source language as the default output language while preserving important original terms.
6. Place the answer and explanation directly under each question in an Obsidian-style collapsible callout.

## Core Workflow

1. Identify the source note boundary: current page/current note or pasted content.
2. Split the note by heading and logical content blocks.
3. Build a coverage map of all testable items before writing questions.
4. Classify each item by testable shape: fact, term, relation, process, comparison, example, table, code, formula, or exception.
5. Choose multiple-choice or fill-in-the-blank based on which format tests the item most cleanly.
6. Write questions in source order so the set mirrors the note structure.
7. For multiple-choice questions, write plausible distractors grounded in nearby concepts instead of random wrong answers.
8. For fill-in-the-blank questions, blank the smallest meaningful unit that still tests recall.
9. Add a collapsible answer block immediately after every question using this pattern:

```markdown
> [!answer]- Answer and Explanation
> Answer: ...
> Explanation: ...
```

10. In each explanation, state why the answer is correct and what concept or distinction the learner should retain.
11. Run a final completeness pass to ensure every mapped source item appears in at least one question.

## Output Standard

Return a sectioned practice set with:

1. A short title naming the target note or page.
2. Section-grouped questions following the source heading order.
3. Per-question type labels localized to the note's main language, for example `Multiple Choice` and `Fill in the Blank`.
4. Immediate supporting materials inside the question body when needed.
5. A collapsible answer-and-explanation callout directly below each question.

Quality rules:

- Do not summarize instead of testing.
- Do not omit low-visibility details if they are explicitly present and testable.
- Do not invent facts, examples, or terminology beyond what the note supports.
- Avoid duplicate questions that test the same point in the same way.
- Keep wording precise enough that one answer is clearly best.
- If the note includes code, formulas, or structured data, include them when they are necessary for solving the question.

## Integration

1. Use with `obsidian-mcp` when the current note/page must be located or read first.
2. Use after `markdown-structuring` when scattered research notes must be reorganized before question generation.
3. Use after `markdown-format-normalization` when source-faithful Markdown needs light cleanup before question generation.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/coverage-and-allocation.md` when full-note coverage and question allocation need stricter control.
- Load `references/question-construction.md` when distractor quality or blank design matters.
- Load `references/output-contract.md` when the final structure or collapsible answer format must be enforced strictly.
- Load `references/quality-gate.md` before finalizing the practice set.
