# Literature Search Playbook

Load this reference when the task is paper-centric and needs literature discovery, claim tracing, or citation-aware verification.

This playbook complements quick-search and deep-research modes by adding domain-specific steps for academic and technical sources.

## Trigger Conditions

Use this playbook when the user:

1. Asks for papers, studies, methods, benchmarks, or state-of-the-art comparisons.
2. Needs a claim traced to primary literature rather than secondary summaries.
3. Requests related work discovery from one or more seed papers.

## Execution Pattern

For each literature sub-question:

1. Start with topic discovery to collect a candidate set of papers.
2. Convert strong candidates to stable identifiers before expansion.
3. Expand from seed papers into citations, references, and recommendations.
4. Separate primary evidence papers from commentary, blog, or news coverage.
5. Track publication year and venue to prevent outdated or off-domain evidence from dominating.

## Mode Overlays

Apply this playbook after selecting the base mode:

- Quick mode: prioritize high-signal papers, limit expansion depth, and return a concise map of major findings and gaps.
- Deep mode: broaden coverage, perform citation-chain expansion, and run contradiction checks across competing studies.

## Quality Standards

- Prefer primary papers over tertiary summaries when evidence quality matters.
- Mark unresolved contradictions explicitly instead of averaging claims.
- Distinguish empirical findings, methodological claims, and speculative interpretation.
- Record confidence notes when evidence is sparse, old, or methodologically weak.
