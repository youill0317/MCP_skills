# Workflow and Output Contract

Follow this execution contract for consistent outputs.

## Inputs to Collect

1. Topic, thesis, or research question.
2. Task mode: `draft`, `revise`, or `apa-review`.
3. APA paper profile: `student-paper`, `professional-manuscript`, or generic APA 7.
4. Required length, deadline, and mandatory elements.
5. Available source list, data, analysis outputs, and traceability artifacts.
6. Existing manuscript text, tables, figures, appendices, or notes when relevant.

If any required input is missing, continue with explicit assumptions and list them at the top.

## Workflow

1. Classify the request as drafting, revising, or APA review.
2. Check input sufficiency and identify missing materials before drafting or reviewing.
3. Generate an APA-compliant manuscript structure with the needed front matter.
4. Draft or revise section by section.
5. Attach in-text citations while drafting for external or prior-work claims, not after.
6. Compile and normalize the reference list.
7. Review title page, abstract, keywords, headings, layout, quotations, tables/figures, footnotes, and appendices as needed.
8. Run the final quality gate and produce an issue log with concrete fix requests.

## Output Contract

Return output in this order:

1. `Metadata`: title, task mode, APA paper profile, language, and assumptions.
2. `Input Sufficiency Check`: usable materials, missing materials, and drafting/review limits.
3. `APA Manuscript Structure`: heading tree and required front matter.
4. `Manuscript Draft or Revised Sections`: full text by section when drafting or revising, or targeted revision output when reviewing.
5. `References (APA 7)`.
6. `Tables/Figures/Appendices` (if any).
7. `APA Compliance Report`: pass/fail checks and fix tasks.
8. `Missing Materials or Fix Requests`.

## Issue Reporting

Use explicit tags:

- `[CITATION NEEDED]` for unsupported external or prior-work claims.
- `[MISSING METADATA: field]` for incomplete references.
- `[VERIFY SOURCE]` for questionable source reliability.
