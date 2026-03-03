# Chunk Strategy

Apply these rules when documents exceed context window limits.

## When to Chunk

1. Single document exceeds 50% of available context budget.
2. Total loaded references exceed the `maxTotalBytes` config limit.
3. Question targets a specific section and full loading is wasteful.

## Chunking Methods

### Heading-Based Splitting

1. Split at Markdown headings (`#`, `##`, `###`).
2. Keep each section as an atomic chunk.
3. Preserve heading hierarchy for context.

### Sliding Window

1. Use overlapping windows (20% overlap) for unstructured text.
2. Keep sentence boundaries intact.
3. Track window start/end positions for citation accuracy.

### Question-Guided Selection

1. Extract key terms and entities from the user question.
2. Score chunks by term overlap and heading relevance.
3. Load highest-scoring chunks first within budget.
4. If top chunks are insufficient, expand to adjacent chunks.

## Budget Management

1. Reserve 30% of context for the answer and reasoning.
2. Distribute remaining 70% across evidence chunks.
3. Prioritize chunks containing direct evidence over background.
4. Log which chunks were loaded and which were skipped.

## Citation Accuracy

1. Always map excerpts back to original line numbers.
2. When citing from a chunk, include the original document position.
3. Never cite a chunk boundary as if it were the full passage.
