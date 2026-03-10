# Exa MCP

## Role

Use `Exa MCP (mcp_exa)` for semantic discovery, related-page finding, known-URL content retrieval, and people or entity discovery.

## When To Use

- Queries where exact keywords are weak or coverage is noisy.
- Finding pages similar to a seed URL.
- Pulling content from known URLs after discovery.
- Searching for people or organization profiles.

## Capability Selection

- Choose the main semantic search capability for broad discovery.
- Choose content or retrieval capabilities when you already know the target URLs.
- Choose similar-page capabilities when you have one strong seed page.
- Choose advanced search capabilities when domain, date, or crawl controls matter.
- Choose people or entity capabilities for profile-oriented questions.

## Common Parameter Pattern

Expect the official server to expose some combination of:

- query text
- result count or limit
- semantic mode or search type
- include or exclude domains
- published or crawled date filters
- text length controls
- live crawl behavior

Use small text limits by default and increase them only when the initial summaries are insufficient.

## Output Expectations

- Search-style capabilities return ranked result sets.
- Content-style capabilities return fetched text or structured page content.
- People search returns profile-like records rather than general web pages.
