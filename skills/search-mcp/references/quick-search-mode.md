# Quick Search Mode

This reference defines the preferred approach for simple or high-level external queries. It prioritizes speed, breadth, and synthesis over exhaustive depth.

## Trigger Conditions

Use Quick Search Mode when the user:

1. Asks a general knowledge or definition question without demanding exhaustive research.
2. Explicitly asks for a "quick search," "overview," or "simple search."
3. Wants a fast comparison across multiple providers.

## Execution Strategy

1. Parallel execution is the default. Do not run independent provider lookups sequentially.
2. Combine 2 or 3 distinct provider types for cross-checking.
   - Example mix: `mcp_tavily` for broad web search, `mcp_exa` for semantic retrieval, and `mcp_scholar` when the topic is academic.
3. Reuse the same core query across providers unless a provider needs a more specific variant.
4. Keep depth low.
   - Use small result limits.
   - Avoid extraction and crawl tools unless the initial snippets are insufficient.
5. Synthesize provider results into one answer instead of dumping raw outputs.

## Example Pattern

1. Search the same question in `mcp_tavily` and `mcp_exa`.
2. Add `mcp_scholar` only if the topic benefits from paper coverage.
3. Summarize the overlap, differences, and confidence level.

## Anti-Patterns

- Running one provider, waiting, then deciding whether to query the next without a real dependency.
- Extracting full page text for simple definition or overview questions.
- Relying on a single provider when the task explicitly benefits from comparison.
