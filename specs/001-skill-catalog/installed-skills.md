# Installed Skills Inventory

This inventory captures the currently installed skill set under `skills/` as observed on 2026-03-19.

## Summary

- Installed skills: 14
- Total files under `skills/`: 99
- Total reference files: 81
- Total skill scripts: 0
- Total skill assets: 0

## Skill Table

| Skill ID | Reference Files | Scripts | Assets | Description |
|----------|-----------------|---------|--------|-------------|
| `academic-writing` | 12 | 0 | 0 | Draft, revise, and APA-review academic papers in APA 7 style using user-provided materials, including title page, abstract, keywords, heading hierarchy, citations, references, quotations, tables/figures, appendices, and final compliance checks. |
| `canva-mcp` | 4 | 0 | 0 | Guide for the official Canva MCP connector and its tools. Use when users ask how to search Canva designs or folders, resolve Canva links, generate or import designs, choose brand kits or assets, export content, manage comments, perform page-level Canva operations, retrieve a Canva deck package for downstream verification, or hand off finished Canva work as a web link plus a short local Markdown design report, especially when the main blocker is tool selection or parameterization rather than writing the content itself. |
| `document-qa` | 8 | 0 | 0 | Answer questions from local documents and references with evidence mapping, conflict-aware reasoning, citation-friendly excerpts, and optional structured QA blocks when needed. |
| `document-summary` | 10 | 0 | 0 | Produce memo-style key summaries from local documents and notes. Use only when the user explicitly asks for concise summaries, memo-style key summaries, quick key understanding, or key-point extraction that compresses the source for fast understanding. Do not use for Markdown restructuring, formatting cleanup, frontmatter normalization, or note reorganization. |
| `markdown-format-normalization` | 5 | 0 | 0 | Preserve the original Markdown wording, tone, sentence order, and page boundaries while aggressively expressing the existing structure with headings, lists, indentation, tables, code fences, Mermaid blocks, limited blockquotes, and a standardized frontmatter schema. |
| `markdown-structuring` | 5 | 0 | 0 | Restructure Markdown into a new, well-structured Markdown document when the original content should be reorganized into a more logical order instead of preserving the original layout. |
| `note-exam-prep` | 4 | 0 | 0 | Generate exam-prep practice sets from the current note/page or pasted note content. |
| `obsidian-mcp` | 4 | 0 | 0 | Guide for the `mcp_obsidian` server and its tools. Use when users ask how to search markdown notes, read files or sections, inspect links, navigate directories, or choose parameters and examples for Obsidian markdown tools. |
| `obsidian-note-linking` | 4 | 0 | 0 | Suggest related Obsidian note connections for the currently open note by exploring vault structure, searching relevant notes, and proposing consistent connection patterns with concise rationale. |
| `presentation-design` | 11 | 0 | 0 | Design visual presentation decks and audit existing presentation content in a tool-neutral way. |
| `problem-definition` | 7 | 0 | 0 | Define and stress-test problems before solution planning. Use when users ask to clarify a problem statement, separate symptoms from root causes, test assumptions, detect blind spots, or verify whether a project, product, or research problem is framed correctly. |
| `report-writing` | 3 | 0 | 0 | Write structured reports from existing research findings, evidence notes, and citation markers. |
| `research-strategy` | 4 | 0 | 0 | Plan and run external research workflows using quick-search and deep-research strategies. |
| `search-mcp` | 4 | 0 | 0 | Guide for choosing and using individual search MCP servers while coordinating them with built-in web search. |

## Notes

- Every installed skill folder currently contains `SKILL.md`.
- Optional support content is currently limited to `references/`; no installed skill currently has `scripts/` or `assets/`.
- Current validation also confirms that any body references to `references/...`, `scripts/...`, or `assets/...` resolve inside each skill root.
- Representative reference-file expectations are asserted in [loader.test.ts](C:\Users\user\Documents\Projects_src\workspace\skill-registry\tests\loader.test.ts).
