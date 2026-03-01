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

## Core Workflow

1. Parse the provided research findings, claims, and citation markers.
2. Group findings by topic and business relevance.
3. Draft a report using the standard six-section structure.
4. Keep each major claim tied to citation markers.
5. Add explicit limitations, unresolved conflicts, and next steps.

## Output Rules

1. Write in the user's language.
2. Keep citations as inline numeric markers like `[1][2]`.
3. Do not print external URLs.
4. Prefer concise, factual prose over persuasive language.
5. Highlight uncertainty explicitly when evidence is incomplete.

## Section Standard

Always use this order:

1. Executive Summary
2. Background and Scope
3. Methodology
4. Key Findings
5. Limitations and Risks
6. Conclusion and Next Steps

## Resource Loading

- Load `references/research-report.md` for detailed section templates and formatting rules.
