---
name: academic-writing
description: Draft, revise, and APA-review academic papers in APA 7 style using user-provided materials, including title page, abstract, keywords, heading hierarchy, citations, references, quotations, tables/figures, appendices, and final compliance checks.
---

# Mission

Produce APA 7-compliant manuscript drafts and review outputs with clear structure, traceable claims, and strict citation discipline.

## Use When

- The user wants to draft, revise, or APA-check an academic paper.
- The deliverable is a manuscript rather than a short report or slide deck.
- The paper should follow APA 7 structure, citation handling, and formatting conventions.

## Scope

1. Support APA-focused manuscript writing: intake, outlining, drafting, revision, and final APA checks.
2. Default prose language to Korean unless the user requests another language.
3. Handle APA title page, abstract, keywords, heading hierarchy, paragraph layout, quotations, footnotes, appendices, and tables/figures when relevant.
4. Keep in-text citations and references in APA 7 author-date style.
5. Apply strict evidence policy: mark unsupported external or prior-work claims as `[CITATION NEEDED]` and require traceability for user-provided data or analysis outputs.
6. Never invent sources, DOIs, page numbers, author notes, institutional metadata, or numeric findings.

## Core Workflow

1. Capture assignment constraints: topic, audience, length, deadline, required elements, and available materials.
2. Determine task mode: `draft`, `revise`, or `apa-review`.
3. Determine APA paper profile: `student-paper`, `professional-manuscript`, or generic APA 7 when unclear.
4. Check whether the provided materials are sufficient for drafting or review, and list missing items explicitly.
5. Build an APA-compliant manuscript structure with the required front matter and heading hierarchy.
6. Draft or revise each section in the user-requested language; default to Korean if unspecified.
7. Attach in-text citations to every external factual, numerical, or prior-work claim while drafting, and validate user-provided results through analysis traceability.
8. Normalize the reference list to APA 7 and ensure one-to-one mapping with in-text citations.
9. Validate title page, abstract, keywords, paragraph layout, quotations, footnotes, appendices, and table/figure formatting when present.
10. Run the final APA quality gate and report remaining issues clearly.

## Output Standard

Always return:

1. `Metadata`: working title, task mode, APA paper profile, target audience, language, and assumptions.
2. `Input Sufficiency Check`: usable materials, missing materials, and drafting/review limits.
3. `APA Manuscript Structure`: heading tree and required front matter.
4. `Manuscript Draft or Revised Sections`: APA-style prose with in-text citations embedded in relevant sentences.
5. `References (APA 7)`: normalized reference list with explicit missing metadata markers if needed.
6. `Tables/Figures/Appendices`: caption, numbering, notes, and cross-reference block when relevant.
7. `APA Compliance Report`: passed checks, failed checks, and actionable fixes.
8. `Missing Materials or Fix Requests`: exact items required to complete unresolved APA or evidence gaps.

Citation rules:

1. Do not leave external factual or prior-work claims uncited.
2. Insert `[CITATION NEEDED]` immediately after unsupported external or prior-work claims.
3. For user-provided results, require analysis traceability rather than forced external citations.
4. Do not fabricate bibliographic metadata. If data is missing, mark `[MISSING METADATA: field]`.
5. If source quality is uncertain, flag `[VERIFY SOURCE]`.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

Load common references first:

- `references/apa7-core-rules.md`
- `references/workflow-and-output-contract.md`
- `references/intext-citation-rules.md`
- `references/reference-list-rules.md`
- `references/tables-figures-caption-rules.md`
- `references/final-quality-gate.md`
- `references/paper-types-and-required-elements.md`
- `references/title-page-abstract-keywords.md`
- `references/headings-paragraphs-and-layout.md`
- `references/quotations-footnotes-and-appendices.md`
- `references/submission-readiness-checklist.md`
- `references/input-sufficiency-and-gap-handling.md`

Load only the component references needed for the current request, but preserve the output contract and final quality gate in every run.
