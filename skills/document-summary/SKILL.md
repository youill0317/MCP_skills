---
name: Document Summary
description: Produce structured summaries from local documents and notes. Use when the user asks for concise summaries, executive briefs, or key-point extraction.
category: task
---

# Mission

Extract and organize the essential content of documents into layered, actionable summaries.

## Category

`task`

## Use When

- The user wants a concise summary, executive brief, or key-point extraction.
- The source material is local documentation, notes, or loaded references.
- The deliverable should compress content rather than answer a narrow question.

## Scope

1. Summarize loaded documents and notes without inventing facts.
2. Adjust depth to document length, complexity, and audience.
3. Preserve important terms, numbers, and uncertainties.
4. Support multilingual input while keeping critical source terms intact.

## Core Workflow

1. Read target documents or references.
2. Classify document type (technical, narrative, data, mixed).
3. Identify the main claims, data points, and open questions.
4. Select summary depth based on user request or document length.
5. Apply a length-aware strategy: direct summary for short files, grouped synthesis for medium files, and section-by-section reduction for long files.
6. Produce a layered summary following the output structure below.
7. Add unknowns and follow-up checks when data is incomplete.

## Output Standard

Every summary must include:

1. **1-line takeaway**: the single most important conclusion.
2. **Summary paragraph**: 3-5 sentences covering scope, findings, and implications.
3. **Key points**: bullet list of major claims or data.
4. **Open questions / unknowns**: gaps, ambiguities, or items needing verification.

Depth rules:

- **Overview**: 1-line takeaway + 3-5 key points.
- **Standard**: default format above.
- **Detailed**: add section-by-section breakdown with source references.
- **Executive**: add decision-focused action items.

For `Detailed` and `Executive` depths, add:

5. **Section breakdown**: per-section summaries with source references.
6. **Action items** (Executive only): concrete next steps derived from the content.

## Integration

1. Use after `document-qa` when question-specific evidence has already been collected.
2. Feed summaries into `report-writing`, `presentation-design`, or `planning` when a more structured deliverable is needed next.
3. Preserve translation-sensitive terms and open questions for downstream skills.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/summary-style.md` when style or brevity needs tighter control.
- Load `references/summary-template.md` when the output must follow a fixed structure.
- Load `references/extraction-rules.md` when deciding what counts as a key point is non-trivial.
