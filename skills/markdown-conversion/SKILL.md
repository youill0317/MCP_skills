---
name: markdown-conversion
description: Convert non-Markdown originals such as PDF, DOCX, PPTX, HTML, and web pages into first-pass Markdown. Use when the main job is generating an initial Markdown draft from an accessible source, with MarkItDown MCP as the primary conversion mechanism.
---

# Mission

Create an initial Markdown version from an accessible non-Markdown source without pretending the result is already normalized or source-verified.

## Use When

- The source is not already Markdown.
- The original file, URL, or other source handle is accessible.
- The task is to produce a first-pass Markdown conversion rather than cleanup or reconstruction.
- MarkItDown MCP is the primary conversion path and the work is not blocked on MCP setup questions alone.

## Scope

1. Convert reachable source material into initial Markdown.
2. Prefer the original source over pasted extracted text whenever possible.
3. Treat conversion output as provisional and reviewable, not final truth.
4. Route readable-but-messy Markdown to `markdown-format-normalization`.
5. Route source mismatch, omissions, OCR damage, and structural collapse to `pdf-markdown-remediation`.
6. Do not perform deep source-aligned reconstruction or formatting-only cleanup inside this skill.

## Core Workflow

1. Confirm that the source is accessible as a file path, URI, or URL supported by the connected MarkItDown MCP release.
2. Prefer the original source over any pasted extraction because the initial conversion should start from the highest-fidelity available input.
3. Run a single-source conversion pass to produce first-pass Markdown.
4. Review the converted output for truncation, flattened structure, missing sections, broken tables, and unsupported elements.
5. Stop at initial conversion when the output is structurally usable.
6. Hand off to `markdown-format-normalization` when the Markdown is complete enough but visually inconsistent.
7. Hand off to `pdf-markdown-remediation` when the Markdown must be reconciled against the source or repaired for omissions and extraction damage.

## Output Standard

Every output must:

1. Be valid Markdown or a faithful best-effort Markdown representation from the source.
2. Preserve source ordering as far as the converter allows.
3. Avoid invented repairs, summaries, or normalization-only rewrites.
4. Make the trust boundary visible: this is first-pass conversion output, not verified reconstruction.

## Integration

1. Use `markitdown-mcp` when the blocker is tool choice, transport, setup, or parameter discovery rather than the conversion task itself.
2. Use this skill when the conversion task itself should be performed.
3. Use `markdown-format-normalization` after this skill when the Markdown is readable but inconsistently formatted.
4. Use `pdf-markdown-remediation` after this skill when the Markdown disagrees with the source or shows extraction loss.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/conversion-boundaries.md` when deciding whether to stop at conversion or hand off to normalization or repair.
- Load `references/markitdown-workflow.md` when the task needs MarkItDown execution shape, source preference, or input handling rules.
- Load `references/post-conversion-review.md` when reviewing the converted Markdown for next-step routing.
