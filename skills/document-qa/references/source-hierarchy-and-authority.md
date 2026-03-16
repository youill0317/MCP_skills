# Source Hierarchy and Authority

Use this reference when multiple loaded documents address the same question and source priority is not already clear from repo context.

## Default Authority Order

Treat this order as a default heuristic, not a hard rule. If the user, repo, or document set establishes a stronger local priority rule, follow that instead.

1. Canonical specifications or formal policy documents
2. Official product or project documentation
3. Release notes or changelogs
4. Approved internal design or decision records
5. Team notes or meeting notes
6. Personal notes, scratch files, or informal commentary

## Override Guidance

1. Prefer repo-specific source conventions over this default order when they are explicit.
2. A newer ADR, decision log, or release note may outrank an older canonical-looking source when the question is about the current state.
3. If two sources disagree and neither clearly dominates, surface both rather than forcing a winner.

## Recency Rules

1. If two sources have similar authority, prefer the newer source.
2. If a newer lower-authority source conflicts with an older higher-authority source, explain the mismatch instead of silently overriding.
3. Treat temporal disagreements as `temporal` conflicts, not as simple errors.

## Tie-Break Rules

1. Prefer the source that is more explicit about the exact question.
2. Prefer the source with narrower scope match to the question context.
3. If neither source clearly dominates, keep both and lower confidence.
