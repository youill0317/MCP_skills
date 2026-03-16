# Question Types and Answer Modes

Use this reference when question classification will improve evidence selection or answer structure.

## Supported Question Types

1. `fact_lookup`: asks for a specific fact, value, date, or statement.
2. `definition`: asks what a term means within the loaded material.
3. `comparison`: asks how two items, sections, or versions differ.
4. `procedure`: asks what steps, rules, or process the documents specify.
5. `change_tracking`: asks what changed between versions, notes, or documents.
6. `conflict_resolution`: asks which source is correct when documents disagree.
7. `evidence_extraction`: asks for supporting passages rather than a synthesized conclusion.
8. `generic_qa`: default fallback for straightforward questions that do not need a specialized mode.
9. `mixed`: use when the question combines multiple modes and forcing a single label would reduce clarity.

## Evidence Expectations by Type

1. `fact_lookup`: prefer direct passages from the most authoritative source.
2. `definition`: prefer passages that explicitly define the term.
3. `comparison`: require parallel evidence from each side being compared.
4. `procedure`: prefer ordered instructions or normative statements.
5. `change_tracking`: require at least two temporally distinct sources when possible.
6. `conflict_resolution`: always surface both sides and explain source priority.
7. `evidence_extraction`: minimize synthesis and prioritize exact excerpts.
8. `generic_qa`: use the lightest path that can still return a grounded answer and evidence map.
9. `mixed`: combine only the minimum rules needed from the relevant modes.

## Answer Mode Rules

1. Lead with the shortest answer that the evidence can support.
2. For `comparison` and `change_tracking`, organize evidence by source or version.
3. For `conflict_resolution`, use `Low` confidence unless one source clearly dominates.
4. For `evidence_extraction`, the answer can be a short framing sentence followed by evidence bullets.
5. Default to `generic_qa` when the classification does not materially change retrieval or output quality.
