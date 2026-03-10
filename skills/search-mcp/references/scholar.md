# Semantic Scholar / Asta MCP

## Role

Use `Semantic Scholar/Asta MCP (mcp_scholar)` for paper and author workflows rather than general web search.

## When To Use

- Paper discovery by topic.
- Looking up a known paper or author.
- Expanding a paper into citations, references, or recommendations.
- Tracing an academic claim to paper metadata.

## Capability Selection

- Use paper search for ordinary topic discovery.
- Use match or details-style capabilities when you likely know the exact paper already.
- Use citation, reference, graph, and recommendation capabilities only after you have a stable seed paper.
- Use author capabilities for author-centered questions.

## Common Parameter Pattern

Expect the official server to expose some combination of:

- query text
- result limit and pagination
- paper identifier or author identifier
- year or publication-date filters
- venue or field-of-study filters
- citation-count thresholds

Whenever possible, convert from free text to a stable paper identifier before expanding into citations or recommendations.

## Output Expectations

- Search capabilities return paged paper or author lists.
- Detail capabilities return one record with structured metadata.
- Citation, reference, graph, and recommendation capabilities return seed-centered expansions.
