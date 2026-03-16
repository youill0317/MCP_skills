Load this reference when deciding which source should control an audit judgment and when a web freshness pass is justified.

## Source Priority

Use this order unless the user explicitly asks for a different authority rule:

1. Original local source material
2. Local summaries, memos, or analyst notes derived from that source
3. Extracted slide text and presenter notes
4. Web sources

## Freshness Rules

- Run a freshness check for market sizes, policy status, regulation status, leadership names, product availability, pricing, deadlines, and any claim whose truth may have changed since the source document date.
- Do not run a web check for internal experiment results, study outputs, or other claims fully defined by the local source unless the task is explicitly about later revisions.
- When a source is time-sensitive, record the exact verification date in the inspection log.

## Inspection Log Rules

Every inspected material should record:

1. `checked_at`
2. `checked_material`
3. `material_type`
4. `check_scope`
5. `method`
6. `freshness_note`

## Web Verification Discipline

- Use the web to confirm current public facts, not to replace missing primary evidence for private analyses.
- If the web contradicts the local deck on a public fact, record the contradiction and cite the date gap explicitly.
- If the web cannot resolve the claim cleanly, leave the item open and mark it `[UNVERIFIED]`.
