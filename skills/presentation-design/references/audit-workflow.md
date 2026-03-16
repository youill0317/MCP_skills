Load this reference when the task is to audit an existing presentation, especially a Canva deck that must be checked against original source materials.

## Audit Sequence

1. Collect the deck artifact first.
   - Prefer Canva URL or `design_id` when the deck lives in Canva.
   - Accept an extracted slide package only when Canva access is already resolved elsewhere.
2. Extract the inspectable surface.
   - Slide text
   - Page order and titles
   - Presenter notes when available
3. Build a claim inventory per slide.
   - Numeric results
   - Findings or outcomes
   - Interpretive statements
   - Comparisons or rankings
   - Implications or recommendations that depend on evidence
4. Map each claim to evidence candidates.
5. Verify with local materials before any web lookup.
6. Use web checks only when:
   - the claim depends on current public facts
   - the local material is incomplete for freshness-sensitive facts
   - the slide cites or implies an external benchmark that is not included locally
7. Record conflicts, gaps, and unresolved items explicitly.
8. Produce a single report with deck-level checklist, slide findings, inspection log, open risks, and revision priorities.

## Local-First Rule

- Source order is fixed: original source material > local memo or summary > slide text or speaker notes > web source.
- Do not let a web source override a primary local source for the same reported result unless the task is specifically about a newer revision of the source.
- When local and web evidence disagree, classify the conflict instead of silently reconciling it.

## Claim Handling Rules

- Split compound claims into separate checkable units.
- Keep descriptive findings separate from interpretive conclusions.
- Treat chart titles, axis labels, legends, footnotes, and callout text as separate evidence-bearing elements when they affect meaning.
- If a slide conclusion is stronger than the cited evidence, classify it as an interpretation issue even if the underlying numbers are correct.

## Escalation Rules

- Mark `[INPUT NEEDED: source_materials]` when no primary source exists for a material claim.
- Mark `[UNVERIFIED]` when the claim cannot be confirmed after reasonable local and web checks.
- Prefer a narrower, evidence-backed rewrite over a broad corrective rewrite when confidence is partial.
