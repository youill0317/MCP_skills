---
name: Report Writing
description: Write structured reports from existing research findings, evidence notes, and citation markers. Use when users ask to draft a research report, executive report, or formal write-up after investigation is done. Focus on writing and synthesis, not new research. Keep inline citation markers like [1][2] and do not include external URLs.
category: task
---

# Mission

Transform research outputs into clear, decision-ready reports.

## Category

`task`

## Use When

- The investigation is already done and the next step is a structured written report.
- The user needs a research report, executive brief, technical report, or comparison report.
- Existing evidence and citation markers must be preserved rather than replaced with new research.

## Scope

1. Perform report writing only.
2. Assume investigation was already completed (for example by `search-mcp` or `document-summary`).
3. If critical evidence is missing, do not invent facts. Record gaps and request follow-up research items.

## Core Workflow

1. Parse the provided research findings, claims, and citation markers.
2. Select the appropriate report type: Research Report, Executive Brief, Technical Report, or Comparison Report.
3. Select the audience-appropriate tone.
4. Group findings by topic and business relevance.
5. Draft a report using the selected type structure.
6. Keep each major claim tied to citation markers.
7. Add explicit limitations, unresolved conflicts, and next steps.

## Output Standard

1. Write in the user's language.
2. Keep citations as inline numeric markers like `[1][2]`.
3. Do not print external URLs.
4. Prefer concise, factual prose over persuasive language.
5. Highlight uncertainty explicitly when evidence is incomplete.
6. For `Research Report`, use this section order: `Executive Summary`, `Background and Scope`, `Methodology`, `Key Findings`, `Limitations and Risks`, `Conclusion and Next Steps`.

## Integration

1. Accept outputs from `search-mcp`, `document-summary`, or `document-qa` and preserve their citation markers.
2. Use confidence labels from upstream research outputs to calibrate language strength.
3. Carry forward unresolved contradictions into the report's limitations section.
4. Hand finished reports to `presentation-design` or `academic-writing` without adding new facts during handoff.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/research-report.md` when drafting the default six-section report.
- Load `references/report-types.md` when the report type needs a different structure.
- Load `references/tone-guide.md` when audience-specific tone calibration matters.
