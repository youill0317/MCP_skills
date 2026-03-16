# Conflict and Negative Answer Policy

Use this reference when the answer is disputed, absent, or unconfirmed.

## Conflict Types

1. `factual`: numbers, dates, names, or definitions differ.
2. `temporal`: older and newer sources disagree.
3. `scope`: sources discuss different contexts or boundaries.

## Conflict Handling

1. Show both positions with citations.
2. Explain the conflict type.
3. State which source is more authoritative and why.
4. If the conflict prevents a single answer, use `conflicted` status.

## Negative Answer Rules

1. Use `explicitly_absent` only when the documents directly indicate the thing is absent or not supported.
2. Use `not_found_in_loaded_docs` when the documents do not contain enough evidence to confirm or deny the thing.
3. Do not turn silence into proof of absence.

## Gap Reporting

1. When evidence is missing, name the exact missing document, version, or section if possible.
2. Include a `next_load_targets` list in the structured block only when further loading would materially improve the answer.
