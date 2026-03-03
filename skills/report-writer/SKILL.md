---
name: report-writer
description: Write structured reports from existing research findings, evidence notes, and citation markers. Use when users ask to draft a research report, executive report, or formal write-up after investigation is done. Focus on writing and synthesis, not new research. Keep inline citation markers like [1][2] and do not include external URLs.
---

# Mission

Transform research outputs into clear, decision-ready reports.

## Scope

1. Perform report writing only.
2. Assume investigation was already completed (for example by `research-mode`).
3. If critical evidence is missing, do not invent facts. Record gaps and request follow-up research items.

## Integration with research-mode

When receiving input from `research-mode`:

1. Accept findings with existing citation markers and preserve them.
2. Use confidence labels from research output to calibrate language strength.
3. Carry forward any documented discrepancies into the Limitations section.
4. If research output flags unresolved contradictions, surface them explicitly.

## Report Type Selection

Select the appropriate type based on the user request:

- **Research Report**: full six-section structure for comprehensive investigation results. Default type.
- **Executive Brief**: 1-2 page decision-focused summary with recommendations. For leadership audiences.
- **Technical Report**: detailed findings with implementation specifics. For engineering audiences.
- **Comparison Report**: side-by-side analysis of options with evaluation criteria. For decision-making contexts.

## Core Workflow

1. Parse the provided research findings, claims, and citation markers.
2. Identify the appropriate report type.
3. Select the audience-appropriate tone.
4. Group findings by topic and business relevance.
5. Draft a report using the selected type structure.
6. Keep each major claim tied to citation markers.
7. Add explicit limitations, unresolved conflicts, and next steps.

## Output Rules

1. Write in the user's language.
2. Keep citations as inline numeric markers like `[1][2]`.
3. Do not print external URLs.
4. Prefer concise, factual prose over persuasive language.
5. Highlight uncertainty explicitly when evidence is incomplete.

## Section Standard (Research Report)

Always use this order for research reports:

1. Executive Summary
2. Background and Scope
3. Methodology
4. Key Findings
5. Limitations and Risks
6. Conclusion and Next Steps

## Resource Loading

- Load `references/research-report.md` for detailed section templates and formatting rules.
- Load `references/report-types.md` for type-specific structure guides.
- Load `references/tone-guide.md` for audience-appropriate writing style.
