---
name: Research Strategy
description: Plan and run external research workflows using quick-search and deep-research strategies. Use when users ask for web research, claim verification, source comparison, evidence gathering, or a choice between fast coverage and exhaustive investigation.
category: task
---

# Mission

Run external research workflows that balance speed, coverage, and verification across built-in web search and external tools without confusing strategy with provider-specific tool guidance.

## Category

`task`

## Use When

- The user asks for web research, evidence gathering, claim verification, or source comparison.
- The main problem is how to conduct the research, not which MCP parameter belongs to which provider.
- The task needs a choice between quick coverage and deeper, verification-heavy investigation.

## Scope

1. Define the research mode, query decomposition, verification depth, and synthesis discipline for external research tasks.
2. Support fast overview work and exhaustive multi-pass research.
3. Keep provider-specific MCP parameter details out of this skill; defer those to `search-mcp` while still deciding when built-in web search vs MCP vs hybrid should be used.
4. Produce research findings or a research execution guide, not polished final deliverables.

## Core Workflow

1. Classify the request as quick research, deep research, or a bounded custom variant.
2. Identify whether the domain playbook should be literature search, news search, or general web.
3. Break the task into the smallest set of answerable sub-questions.
4. Decide what needs breadth, what needs verification, and what needs freshness checks.
5. Choose retrieval stack by phase: built-in only, MCP only, or hybrid (fallback to MCP only when built-in search is unavailable).
6. Use `search-mcp` whenever provider choice, tool family, or provider-specific parameterization is unclear.
7. Run retrieval in passes: discovery, focused verification, and contradiction handling as needed.
8. Separate confirmed findings, open questions, and unresolved conflicts.
9. Return research output that downstream task skills can consume without re-running the same search logic.

## Output Standard

Return one of the following, depending on the request:

1. A research execution guide: mode, sub-questions, evidence plan, and verification steps.
2. A findings packet: key findings, source overlap, contradictions, and confidence notes.
3. A handoff bundle for downstream skills with citation markers, open questions, and unresolved risks.

Research rules:

- Prefer quick search for overview, simple comparisons, and low-stakes scans.
- Prefer deep research when accuracy, disagreement handling, or coverage matters.
- Use built-in web search for rapid discovery and broad triangulation.
- Use MCP tools when you need provider-specific capabilities (semantic relatedness, extraction/crawl, paper graphs, or vertical search).
- Use hybrid retrieval when fast discovery and robust verification are both required and built-in search is available.
- Keep factual findings separate from interpretation.
- Re-run focused searches when contradictions or freshness risks remain.

## Integration

1. Use `search-mcp` when provider/tool choice is the blocker, especially in hybrid plans.
2. Feed completed findings into `report-writing`, `planning`, `presentation-design`, or `academic-writing`.
3. Use with `problem-definition` when validation questions require external evidence.

## Resource Loading

- Load `references/quick-search-mode.md` when the task needs a fast, synthesis-first research pass.
- Load `references/deep-research-mode.md` when the task needs exhaustive, verification-heavy investigation.
- Load `references/literature-search-playbook.md` when the user needs paper-centric or citation-aware literature research.
- Load `references/news-search-playbook.md` when the user needs recency-sensitive news tracking or claim verification.
