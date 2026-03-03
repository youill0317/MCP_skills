# Citation Format

Standards for citing evidence from loaded documents.

## Basic Format

Every evidence citation must include:

1. **File path**: relative path from the skill or project root.
2. **Line range**: start and end line numbers.
3. **Excerpt**: the relevant quoted text.

Example:

```
- **[docs/api-spec.md:L42-L48]**: "The endpoint returns a 404 when the resource is not found."
```

## Multiple Citations

1. Number citations sequentially within each answer.
2. Group citations by source file when multiple excerpts come from the same document.
3. Use inline markers `[1]`, `[2]` in the answer text, then list full citations below.

## Combined Evidence

When synthesizing from multiple sources:

```
Answer text supported by [1] and further confirmed by [2].

**Evidence:**
[1] docs/api-spec.md:L42-L48 — "..."
[2] docs/changelog.md:L15-L17 — "..."
```

## Partial Evidence

When a passage partially supports the answer:

1. Quote the relevant portion only.
2. Note what the passage supports and what remains unconfirmed.
3. Use `(partial)` marker after the citation.

## Prohibitions

1. Do not fabricate line numbers or file paths.
2. Do not merge separate passages into a single citation.
3. Do not omit contradictory evidence from citations.
