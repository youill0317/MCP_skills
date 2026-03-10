---
name: Academic Writing
description: Write and revise academic papers in APA 7 style from outline to final manuscript, including language-adaptive drafting (default Korean, user-requested language override), author-date in-text citations, reference list normalization, and table/figure caption checks. Use when users ask to draft, restructure, edit, or APA-format empirical, literature review/meta-analysis, theoretical, methodological, qualitative, or mixed-methods papers.
category: task
---

# Mission

Produce complete, defensible APA 7 paper drafts with clear structure, traceable claims, and strict citation discipline.

## Category

`task`

## Use When

- The user wants to draft, revise, restructure, or APA-format an academic paper.
- The deliverable is a manuscript rather than a short report or slide deck.
- APA 7 structure, citation handling, and table/figure checks are required.

## Scope

1. Support end-to-end paper writing: framing, outlining, drafting, revision, and final APA checks.
2. Default prose language to Korean unless the user requests another language.
3. Keep in-text citations and references in APA 7 author-date style.
4. Apply strict evidence policy: mark unsupported external or prior-work claims as `[CITATION NEEDED]` and require traceability for primary study results.
5. Never invent sources, DOIs, page numbers, sample sizes, or numeric findings.

## Core Workflow

1. Capture assignment constraints: domain, audience, length, deadline, and required sections.
2. Confirm paper type and research question or thesis statement.
3. Select exactly one primary paper type and load the matching type guide.
4. If the request is hybrid, choose the dominant type and note secondary conventions explicitly.
5. Build a section-level outline aligned with APA 7 and the selected paper type.
6. Draft each section in the user-requested language; default to Korean if unspecified.
7. Attach in-text citations to every external factual, numerical, or prior-work claim, and validate primary study results through analysis traceability.
8. Normalize the reference list to APA 7 and ensure one-to-one mapping with in-text citations.
9. Validate table/figure numbering, titles, and notes.
10. Run the final quality gate and report remaining issues clearly.

## Output Standard

Always return:

1. Paper metadata block: working title, paper type, target audience, and language.
2. Structured manuscript draft with APA-style heading hierarchy.
3. In-text citations embedded in relevant sentences.
4. Reference list in APA 7 format.
5. Table/Figure caption block if tables or figures are present.
6. Compliance report: passed checks, failed checks, and actionable fixes.

Citation rules:

1. Do not leave external factual or prior-work claims uncited.
2. Insert `[CITATION NEEDED]` immediately after unsupported external or prior-work claims.
3. For primary study results, require analysis traceability rather than forced external citations.
4. Do not fabricate bibliographic metadata. If data is missing, mark `[MISSING METADATA: field]`.
5. If source quality is uncertain, flag `[VERIFY SOURCE]`.

## Integration

1. Work independently by default.
2. If `research-strategy` output is provided, preserve evidence mappings and confidence notes.
3. Use `search-mcp` only when provider/tool selection guidance is needed during evidence gathering.
4. If `report-writing` output is provided, re-structure it to APA format without introducing new facts.
5. Feed finished paper sections into `presentation-design` only after the manuscript structure is stable.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

Load common references first:

- `references/apa7-core-rules.md`
- `references/workflow-and-output-contract.md`
- `references/intext-citation-rules.md`
- `references/reference-list-rules.md`
- `references/tables-figures-caption-rules.md`
- `references/final-quality-gate.md`

Then load exactly one type-specific guide:

- `references/type-empirical.md`
- `references/type-literature-review-meta-analysis.md`
- `references/type-theoretical.md`
- `references/type-methodological.md`
- `references/type-qualitative.md`
- `references/type-mixed-methods.md`
