# News Search Playbook

Load this reference when the task is news-centric and depends on recency, event timelines, or competing reports.

This playbook complements quick-search and deep-research modes by adding domain-specific steps for fast-changing public information.

## Trigger Conditions

Use this playbook when the user:

1. Asks for recent developments, announcements, or incident updates.
2. Needs timeline reconstruction across multiple outlets.
3. Requests validation of potentially conflicting or breaking claims.

## Execution Pattern

For each news sub-question:

1. Run recency-first discovery and collect reports from multiple outlet types.
2. Build a timestamped event timeline before synthesizing conclusions.
3. Distinguish direct reporting, official statements, and commentary.
4. Re-query for updates when the latest report window is narrow or conflict-heavy.
5. Track what is confirmed, disputed, and still unverified.

## Mode Overlays

Apply this playbook after selecting the base mode:

- Quick mode: capture the latest consensus snapshot with key caveats and freshness notes.
- Deep mode: verify chronology, reconcile source conflicts, and perform targeted follow-up retrieval for disputed points.

## Quality Standards

- Prefer traceable reporting over reposted summaries.
- Flag uncertainty when claims rely on a single outlet or anonymous sourcing.
- Keep timestamps and time-zone context explicit for sequence-sensitive claims.
- Separate confirmed facts from early or speculative narratives.
