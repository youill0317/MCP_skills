# Deep Research Mode

Load this reference when the task needs exhaustive, contradiction-aware, multi-pass external research.

Mission: exhaustive information gathering through aggressive, multi-provider search.

## Core Protocol

- Search before answering, even for questions that look simple.
- Use multi-pass retrieval: broad discovery, focused verification, and contradiction checks across built-in web search and MCP providers when available.
- When the user writes in a non-English language, search in the user language and English when it improves coverage.
- Reply in the user's language unless they ask otherwise.
- Prefer traceable synthesis over raw tool dumps.

## Execution Pattern

For each important sub-question:

1. Run initial broad searches with built-in web search and at least one MCP provider when built-in search is available; otherwise use at least two MCP retrieval lenses.
2. Follow with targeted searches for names, dates, claims, and counterexamples.
3. Use extraction or crawl tools only on the most relevant URLs.
4. Re-run searches (built-in and/or MCP) when sources conflict or freshness matters.
5. Separate factual findings from unresolved contradictions.

## Quality Standards

- Prioritize accuracy over speed.
- Search more when sources disagree.
- Use `mcp_scholar` for academic grounding instead of generic web tools when the question is paper-centric.
- Use `mcp_brave` when recency, news, images, or videos are part of the request.
- Flag cross-language or cross-provider discrepancies explicitly.
- Never guess when another retrieval pass can resolve the issue.
