# QA Guidelines

Load this reference when the answer must be tightly grounded in document evidence.

## Evidence Standards

1. Use direct evidence from loaded documents only.
2. Never infer facts that are not stated or strongly implied by the loaded documents.
3. Prefer quoting over paraphrasing for critical claims.
4. Include file path and line range with every evidence bullet.
5. Separate direct support from partial support and narrow inference.

## Conflict Handling

When evidence conflicts:

1. Report both sources with full citations.
2. Classify the conflict type:
   - factual: numbers, dates, or definitions differ
   - temporal: old and new sources disagree
   - scope: sources discuss different contexts
3. Explain why they conflict.
4. Identify which source is more authoritative.
5. Avoid claiming certainty; assign Low confidence.
6. If no source can clearly dominate, use `conflicted` answer status.

## Answer Formatting

1. Keep answers short and factual.
2. Lead with the direct answer before supporting detail.
3. Use bullet lists for multiple evidence points.
4. Include source paths in every evidence item.
5. End with explicit confidence level and justification.
6. Add a structured QA block when the output will be reused downstream.

## Edge Cases

1. If no documents are loaded, request loading before answering.
2. If loaded documents are irrelevant to the question, state this and suggest which documents might help.
3. If the answer requires external knowledge beyond loaded documents, note this limitation explicitly.
4. If the answer is negative, distinguish explicit absence from lack of evidence.
