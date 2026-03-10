# Tavily MCP

## Role

Use `Tavily MCP (mcp_tavily)` for general web search, targeted extraction, site crawling, site mapping, and image search.

## When To Use

- Broad web discovery with domain or recency controls.
- Pulling readable content from a known URL list.
- Crawling a site when one page is not enough.
- Mapping a site's structure before deciding what to extract.
- Image search with the same provider.

## Capability Selection

- Choose search for discovery.
- Choose extract when you already know the URLs worth reading.
- Choose map before crawl when site structure is unclear.
- Choose crawl only when you need multi-page extraction.
- Choose image search when the request is image-oriented.

## Common Parameter Pattern

Expect the official server to expose some combination of:

- query text
- result count or limit
- search depth
- include or exclude domains
- topic or news mode
- time range or day window
- crawl depth or breadth
- path allowlists

Keep crawl limits narrow to avoid oversized outputs.

## Output Expectations

- Search returns ranked results and may optionally include raw content.
- Extract returns readable text for known URLs.
- Crawl returns discovered pages plus extracted content.
- Map returns discovered URLs without full extraction.
