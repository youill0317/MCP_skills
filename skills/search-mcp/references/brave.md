# Brave MCP

## Role

Use `Brave MCP (mcp_brave)` for broad keyword search across the public web, plus news, image, and video discovery.

## When To Use

- Broad web discovery where exact keywords work well.
- Current events or announcement tracking.
- Image or video lookup.
- Cases where you want a second non-semantic web view alongside Exa or Tavily.

## Capability Selection

- Choose the web-search tool for general web discovery.
- Choose the news-search tool when recency and publisher coverage matter.
- Choose the image-search tool for image lookup.
- Choose the video-search tool for video lookup.

## Common Parameter Pattern

Expect the official server to expose some combination of:

- query text
- result count or limit
- region or country
- freshness or date filter

Keep counts small by default and tighten recency filters when the task is time-sensitive.

## Output Expectations

- Ranked search results with titles, URLs, and summary text.
- News, image, and video tools may return media-specific fields.
- Treat summaries as leads; verify key claims before relying on them.

## Selection Notes

- Prefer the news capability over general web search for current events.
- Prefer Brave when semantic retrieval is unnecessary and keyword coverage is the main need.
