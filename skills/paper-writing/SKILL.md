---
name: paper-writing
description: Write and revise academic papers in APA 7 style from outline to final manuscript, including Korean main-text drafting, author-date in-text citations, reference list normalization, and table/figure caption checks. Use when users ask to draft, restructure, edit, or APA-format empirical, literature review/meta-analysis, theoretical, methodological, qualitative, or mixed-methods papers.
---

# Mission

Produce complete, defensible APA 7 paper drafts with clear structure, traceable claims, and strict citation discipline.

## Scope

1. Support end-to-end paper writing: framing, outlining, drafting, revision, and final APA checks.
2. Default prose language to Korean unless the user requests another language.
3. Keep in-text citations and references in APA 7 author-date style.
4. Apply strict evidence policy: mark unsupported factual claims as `[CITATION NEEDED]`.
5. Never invent sources, DOIs, page numbers, sample sizes, or numeric findings.

## Paper Type Selection

Select exactly one primary type and load the matching reference:

1. Empirical paper -> `references/type-empirical.md`
2. Literature review / meta-analysis -> `references/type-literature-review-meta-analysis.md`
3. Theoretical paper -> `references/type-theoretical.md`
4. Methodological paper -> `references/type-methodological.md`
5. Qualitative paper -> `references/type-qualitative.md`
6. Mixed-methods paper -> `references/type-mixed-methods.md`

If the user asks for a hybrid design, pick the dominant type and explicitly note where secondary conventions are applied.

## Core Workflow

1. Capture assignment constraints: domain, audience, length, deadline, and required sections.
2. Confirm paper type and research question or thesis statement.
3. Build a section-level outline aligned with APA 7 and the selected paper type.
4. Draft each section in Korean with precise claim boundaries.
5. Attach in-text citations to every factual, numerical, or prior-work claim.
6. Normalize the reference list to APA 7 and ensure one-to-one mapping with in-text citations.
7. Validate table/figure numbering, titles, and notes.
8. Run the final quality gate and report remaining issues clearly.

## Strict Citation Policy

1. Do not leave factual claims uncited.
2. Insert `[CITATION NEEDED]` immediately after unsupported claims.
3. Do not fabricate bibliographic metadata. If data is missing, mark `[MISSING METADATA: field]`.
4. If source quality is uncertain, flag `[VERIFY SOURCE]`.
5. Preserve user-provided source identifiers unless they violate APA 7 formatting.

## Output Standard

Always return:

1. Paper metadata block: working title, paper type, target audience, and language.
2. Structured manuscript draft with APA-style heading hierarchy.
3. In-text citations embedded in relevant sentences.
4. Reference list in APA 7 format.
5. Table/Figure caption block if tables or figures are present.
6. Compliance report: passed checks, failed checks, and actionable fixes.

## Integration

1. Work independently by default.
2. If `research-mode` output is provided, preserve evidence mappings and confidence notes.
3. If `report-writer` output is provided, re-structure to APA format without introducing new facts.

## Resource Loading

Load common references first:

- `references/apa7-core-rules.md`
- `references/workflow-and-output-contract.md`
- `references/intext-citation-rules.md`
- `references/reference-list-rules.md`
- `references/tables-figures-caption-rules.md`
- `references/final-quality-gate.md`

Then load exactly one type-specific reference from the Paper Type Selection list.
