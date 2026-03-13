---
name: report-writing
description: Write structured reports from existing research findings, evidence notes, and citation markers. Use when users ask for a structured report, executive brief, report-format write-up, or formal write-up after investigation is done. Focus on turning already-organized evidence into a report with recognizable sections and report-style prose, not on producing a memo-style summary or doing new research. Keep inline citation markers like [1][2] and do not include external URLs.
---

# Mission

Transform organized evidence into clear, decision-ready reports with recognizable structure.

## Use When

- The investigation is already done and the next step is a structured written report.
- The user needs a research report, executive brief, technical report, comparison report, or other format-defined report deliverable.
- The output should read like a report with named sections and report-style prose rather than a quick memo.
- Existing evidence and citation markers must be preserved rather than replaced with new research.

## Scope

1. Perform report writing only.
2. Assume investigation was already completed (for example by `research-strategy` or `document-summary`).
3. If critical evidence is missing, do not invent facts. Record gaps and request follow-up research items.
4. Reconstruct provided evidence into a report; do not stop at memo-style compression or bullet-only summary.

## Core Workflow

1. Parse the provided research findings, claims, and citation markers.
2. Select the appropriate report type: Research Report, Executive Brief, Technical Report, or Comparison Report.
3. Select the audience-appropriate tone.
4. Start from the default report structure, then adjust sections only when the material or audience requires it.
5. Group findings by topic and business relevance.
6. Draft a report using the selected type structure and report-style paragraph flow.
7. Keep each major claim tied to citation markers.
8. Add explicit limitations, unresolved conflicts, and next steps.

## Output Standard

1. Write in the user's language.
2. Keep citations as inline numeric markers like `[1][2]`.
3. Do not print external URLs.
4. Prefer concise, factual prose over persuasive language.
5. Highlight uncertainty explicitly when evidence is incomplete.
6. Default to named report sections and report-style paragraphs rather than memo bullets.
7. For `Research Report`, use this section order: `Executive Summary`, `Background and Scope`, `Methodology`, `Key Findings`, `Limitations and Risks`, `Conclusion and Next Steps`.
8. For other report types, keep a recognizable sectioned structure even when sections are adapted to fit the material.

## Integration

1. Accept outputs from `research-strategy`, `document-summary`, or `document-qa` and preserve their citation markers.
2. Use `search-mcp` only when extra provider/tool guidance is needed before more research.
3. Use confidence labels from upstream research outputs to calibrate language strength.
4. Carry forward unresolved contradictions into the report's limitations section.
5. Treat `document-summary` output as source material to be expanded and reorganized into a report, not as the final deliverable.
6. Hand finished reports to `presentation-design` or `academic-writing` without adding new facts during handoff.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/research-report.md` when drafting the default six-section report.
- Load `references/report-types.md` when the report type needs a different structure.
- Load `references/tone-guide.md` when audience-specific tone calibration matters.
