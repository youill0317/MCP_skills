# Quick Search Mode

Load this reference when the task needs a fast, synthesis-first external research pass.

This reference defines the preferred approach for simple or high-level external queries. It prioritizes speed, breadth, and synthesis over exhaustive depth.

## Trigger Conditions

Use Quick Search Mode when the user:

1. Asks a general knowledge or definition question without demanding exhaustive research.
2. Explicitly asks for a "quick search," "overview," or "simple search."
3. Wants a fast comparison across multiple providers.

## Execution Strategy

1. Parallel execution is the default. Do not run independent provider lookups sequentially.
2. Prefer a hybrid stack for cross-checking when built-in web search is available: built-in web search + 1 or 2 MCP providers.
   - Example mix: built-in web search for fast coverage, `mcp_tavily` or `mcp_exa` for a second retrieval lens, and `mcp_scholar` when the topic is academic.
3. Reuse the same core query across tools unless a provider needs a more specific variant.
4. Keep depth low.
   - Use small result limits.
   - Avoid extraction and crawl tools unless the initial snippets are insufficient.
5. If built-in search is unavailable, run MCP-only cross-checking with at least two retrieval lenses.
6. Synthesize tool results into one answer instead of dumping raw outputs.

## Example Pattern

1. Run built-in web search for first-pass coverage.
2. Cross-check with `mcp_tavily` or `mcp_exa` using the same core query.
3. Add `mcp_scholar` only if the topic benefits from paper coverage.
4. Summarize overlap, differences, and confidence level.

## Anti-Patterns

- Running one tool at a time without a real dependency, especially when quick cross-checking is expected.
- Extracting full page text for simple definition or overview questions.
- Relying on a single provider when the task explicitly benefits from comparison.
