# Frontmatter and Tags

Load this reference when creating or preserving YAML frontmatter for repaired documents.

## Frontmatter Requirement

Every output should start with YAML frontmatter.

If no safe metadata is available, emit an empty frontmatter block rather than inventing fields.

## Frontmatter Shape

Use the smallest valid shape that fits the source and destination.

Minimal form:

```yaml
---
---
```

If tags are explicitly requested or clearly expected by project convention, use:

```yaml
---
tags: [pdf/converted, topic-tag-1, topic-tag-2]
---
```

## Tag Rules

1. Tags are optional metadata, not a mandatory frontmatter field.
2. Include `pdf/converted` only when tags are being added and the source-aligned repair still benefits from conversion provenance.
3. Add a small number of topic tags grounded in the source text only when the task or convention expects tags.
4. Prefer concise lowercase tags.
5. Use content-derived nouns or short noun phrases, not opinions or summaries.
6. Do not invent highly specific tags unsupported by the document.

## Tag Selection Priority

Choose tags from:

1. document subject
2. named domain or project
3. recurring technical topic
4. document form if strongly signaled, such as `policy`, `manual`, or `lecture-notes`
