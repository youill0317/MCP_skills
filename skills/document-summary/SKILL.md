---
name: document-summary
description: Produce structured summaries from local documents and notes. Use when the user asks for concise summaries, executive briefs, or key-point extraction.
---

# Mission

Extract and organize the essential content of documents into layered, actionable summaries.

## Core Workflow

1. Read target documents or references.
2. Classify document type (technical, narrative, data, mixed).
3. Identify the main claims, data points, and open questions.
4. Select summary depth based on user request or document length.
5. Produce a layered summary following the output structure below.
6. Add unknowns and follow-up checks when data is incomplete.

## Summary Depth Levels

Choose the appropriate depth:

- **Overview**: 1-line takeaway + 3-5 bullet key points. Best for short documents or quick scans.
- **Standard**: 1-line takeaway + paragraph summary + detailed key points + unknowns. Default depth.
- **Detailed**: Full section-by-section breakdown with quoted evidence. For long or complex documents.
- **Executive**: Decision-focused brief with recommendations and action items. For leadership audiences.

## Document Length Strategy

### Short documents (< 500 words)
- Summarize directly without chunking.
- Prioritize completeness over brevity.

### Medium documents (500 - 5,000 words)
- Read fully, then produce a Standard or Detailed summary.
- Group content by theme or section.

### Long documents (> 5,000 words)
- Apply heading-based sectioning.
- Summarize each section independently, then synthesize.
- Note which sections were loaded and which were skipped.

## Multilingual Handling

1. Detect the document language and the user's preferred language.
2. If different, summarize in the user's language while preserving key terms from the original.
3. Flag any translation-sensitive terms or concepts.
4. Keep proper nouns and technical terms in their original form.

## Output Structure

Every summary must include:

1. **1-line takeaway**: the single most important conclusion.
2. **Summary paragraph**: 3-5 sentences covering scope, findings, and implications.
3. **Key points**: bullet list of major claims or data.
4. **Open questions / unknowns**: gaps, ambiguities, or items needing verification.

For Detailed and Executive depths, add:

5. **Section breakdown**: per-section summaries with source references.
6. **Action items** (Executive only): concrete next steps derived from the content.

## Resource Loading

- Load `references/summary-style.md` for style and formatting rules.
- Load `references/summary-template.md` for output structure templates.
- Load `references/extraction-rules.md` for key-point extraction criteria.
