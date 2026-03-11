# Link Scoring Rubric

Use this rubric to rank candidate notes for Obsidian connection proposals.

## Score Dimensions (0-2 each)

1. **Topic overlap**
   - 0: Mostly unrelated
   - 1: Partial overlap
   - 2: Strong overlap with target note's central topic

2. **Complement value**
   - 0: Duplicates what target already says
   - 1: Adds minor nuance
   - 2: Adds clear context/evidence/contrast

3. **Actionability**
   - 0: Unclear why user should connect it
   - 1: Useful but optional
   - 2: Helps navigation, decisions, or next steps

4. **Vault fit**
   - 0: Off-pattern naming/tags or stale context
   - 1: Acceptable fit
   - 2: Strongly aligned with existing vault structure/conventions

5. **Connection precision**
   - 0: Only broad note-level relation is known
   - 1: Section-level target is plausible
   - 2: Heading/block/embed-level target is clearly justified

6. **Policy adherence**
   - 0: Breaks vault connection/tag policy
   - 1: Partially aligned with policy
   - 2: Fully aligned with active vault policy

7. **Sequence continuity**
   - 0: No usable previous/next relation
   - 1: Partial sequence relation (only prev or next)
   - 2: Clear prev/next and hierarchical relation when applicable

## Ranking Guidance

- Default priority: total score descending.
- Tie-breakers:
  1. recency relevance (if user cares about current state),
  2. note specificity (prefer focused notes over generic hubs),
  3. sequence continuity (prefer candidates that preserve ordered track),
  4. backlink benefit (fills obvious graph gaps).

## Connection Type Selection

Choose the narrowest useful connection type:

1. `[[Note]]` for broad conceptual relation.
2. `[[Note#Heading]]` for section-specific context.
3. `[[Note#^block-id]]` for precise claim/quote reuse.
4. `![[Note]]` for inline reuse where visible embedding helps.
5. tags for cross-cutting themes or taxonomy alignment.

Always prefer the policy default form unless precision needs justify escalation.

## Hard Filters

Do not recommend a candidate when:

- The note existence/path is unverified.
- The relevance claim cannot be supported by inspected text.
- The candidate is only tangential and there are better alternatives.
