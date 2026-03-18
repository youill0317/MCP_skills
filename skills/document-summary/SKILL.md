---
name: document-summary
description: Produce memo-style key summaries from local documents and notes. Use only when the user explicitly asks for concise summaries, memo-style key summaries, quick key understanding, or key-point extraction that compresses the source for fast understanding. Do not use for Markdown restructuring, formatting cleanup, frontmatter normalization, or note reorganization. If the source is already Markdown and the user asks to "정리" it without explicit summary intent, prefer Markdown cleanup or structuring skills instead.
---

# Mission

Compress documents and notes into quickly digestible, memo-style key summaries.

## Use When

- The user wants a concise summary, memo-style key summary, quick key understanding, or key-point extraction.
- The source material is local documentation, notes, or loaded references.
- The deliverable should compress source content for fast understanding rather than become a formal report.

## Scope

1. Summarize loaded documents and notes without inventing facts.
2. Adjust depth to document length, complexity, and audience.
3. Preserve important terms, numbers, and uncertainties.
4. Support multilingual input while keeping critical source terms intact.
5. Switch to domain-specific summary formats when the document type requires a fixed summary structure.
6. Do not turn the output into a formal report, executive brief, or fixed-section report deliverable.

## Core Workflow

1. Read target documents or references.
2. Classify document type using these explicit categories: `academic paper`, `technical`, `business`, `policy/legal`, `education/learning`, `news/report`, `opinion/essay/column`, or generic fallback.
3. Apply the document-type priority in this order when multiple labels seem plausible:
   1. Academic paper: journal article, conference paper, working paper, thesis chapter, dissertation excerpt.
   2. Policy/legal: law, regulation, case summary, policy draft, administrative guidance.
   3. News/report: news article, breaking update, press-style report, incident coverage.
   4. Opinion/essay/column: editorial, opinion piece, essay, signed column.
   5. Technical: API docs, technical design, architecture note, engineering procedure.
   6. Business: business report, strategy memo, market analysis, operational review.
   7. Education/learning: lecture note, textbook excerpt, study guide, training material.
4. If the source matches a domain-specific category, load the corresponding reference and follow its fixed Korean output format.
5. Otherwise, use the generic summary path and identify the main claims, data points, and open questions.
6. Select summary depth based on user request or document length.
7. Apply a length-aware strategy: direct summary for short files, grouped synthesis for medium files, and section-by-section reduction for long files.
8. Produce a memo-style summary following the output structure below, unless a domain-specific reference overrides it.
9. Add unknowns and follow-up checks when data is incomplete.

## Output Standard

Generic fallback summaries must default to a memo-style structure:

1. **1-line takeaway**: the single most important conclusion.
2. **Key points**: bullet list of major claims or data.
3. **Open questions / unknowns**: gaps, ambiguities, or items needing verification.
4. **Optional summary paragraph**: add only when a short narrative bridge improves readability.

Depth rules:

- **Overview**: 1-line takeaway + 3-5 key points.
- **Standard**: default memo-style format above.
- **Detailed**: add section-by-section breakdown with source references.
- **Decision Memo**: add decision-focused action items without converting the output into a full report.

For `Detailed` and `Decision Memo` depths, add:

5. **Section breakdown**: per-section summaries with source references.
6. **Action items** (`Decision Memo` only): concrete next steps derived from the content.

Domain-specific override rules:

- When the source matches a domain-specific reference, the fixed Korean section headers in that reference replace the generic memo-style format.
- Keep the generic `Overview`, `Standard`, `Detailed`, and `Decision Memo` depth rules only for the fallback path or when a user explicitly requests hybrid detail.
- If metadata, dates, numbers, sample sizes, actors, or source details are missing in the document, state `check needed` rather than inferring them.

Domain-specific mappings:

- `academic paper` -> `references/academic-paper-summary.md`
- `technical` -> `references/technical-summary.md`
- `business` -> `references/business-summary.md`
- `policy/legal` -> `references/policy-legal-summary.md`
- `education/learning` -> `references/education-learning-summary.md`
- `news/report` -> `references/news-summary.md`
- `opinion/essay/column` -> `references/opinion-summary.md`

## Integration

1. Use after `document-qa` when question-specific evidence has already been collected.
2. Hand off memo-style summaries to `report-writing` when the next step is a structured report or executive brief.
3. Feed summaries into `presentation-design` when the next step is slide synthesis rather than report writing.
4. Preserve translation-sensitive terms and open questions for downstream skills.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/summary-style.md` when style or brevity needs tighter control.
- Load `references/summary-template.md` when the output should use the generic fallback structure.
- Load `references/extraction-rules.md` when deciding what counts as a key point is non-trivial.
- Load `references/academic-paper-summary.md` when the source is an academic paper and the output should follow the paper-summary format in Korean.
- Load `references/technical-summary.md` when the source is a technical document, API guide, or architecture/procedure note.
- Load `references/business-summary.md` when the source is a strategy memo, market review, or business performance document.
- Load `references/policy-legal-summary.md` when the source is a policy, regulation, law, case-related summary, or administrative guidance.
- Load `references/education-learning-summary.md` when the source is a lecture note, textbook excerpt, training material, or study guide.
- Load `references/news-summary.md` when the source is a factual news article or report-style coverage.
- Load `references/opinion-summary.md` when the source is an essay, editorial, signed column, or opinion-focused article.
