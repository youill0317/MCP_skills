# Obsidian Linking Playbook

## 1) Minimal Note Types

Use a small set of note archetypes:

- **Concept note**: stable definition or mechanism.
- **Source note**: summary of an article, book, or meeting.
- **Project note**: active work context and decisions.
- **Hub/MOC note**: navigation map for a domain.

## 2) Link Placement Pattern

When updating any note, add links in three directions:

1. **Upward** -> broader hub/MOC.
2. **Lateral** -> peer concepts often co-used.
3. **Downward** -> concrete examples, sources, or tasks.

This creates navigable graph depth without needing global rewrites.

## 3) Backlink Reinforcement

For every meaningful new link `A -> B`, check whether one of these should also be added:

- `B` should mention `A` in "Related" or "Used in" section.
- a hub note should include both `A` and `B` under the same cluster.

Use reinforcement selectively; avoid noisy reciprocal links when the relation is weak.

## 4) Retrieval-Friendly Structure

Prefer this compact internal order:

1. One-line summary
2. Core points (3-7 bullets)
3. Evidence/examples
4. Related links
5. Open questions

This ordering helps narrow section reads and improves downstream LLM retrieval.

## 5) MOC (Map of Content) Maintenance Rule

Each active domain should have exactly one primary MOC note.

MOC sections:

- Core concepts
- Active projects
- Key sources
- Open threads

Whenever creating a new domain-relevant note, add it to one MOC section immediately.

## 6) Naming and Alias Rule

- Keep titles short and noun-focused for concept notes.
- Put alternate terms in aliases/tags.
- Avoid frequent renaming once links spread; prefer alias expansion.

## 7) Anti-Patterns

Avoid:

- giant diary-style notes with mixed unrelated topics,
- links without semantic intent,
- orphan notes with no inbound links,
- duplicated concept notes with slightly different names.
