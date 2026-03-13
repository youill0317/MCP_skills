---
name: document-qa
description: Answer questions from local documents and references with citation-friendly excerpts. Use when the user asks for document Q&A, evidence extraction, or source-grounded answers.
---

# Mission

Produce accurate, evidence-based answers grounded in loaded documents.

## Use When

- The user asks a question about local files, notes, or loaded references.
- The answer must be grounded in quoted evidence rather than general knowledge.
- Evidence extraction, contradiction handling, or citation-friendly excerpts are required.

## Scope

1. Answer from loaded documents and references only.
2. Preserve file-path and line-level evidence whenever available.
3. Support multi-document comparison and contradiction handling.
4. Return explicit confidence and gap notes instead of overclaiming.

## Core Workflow

1. Parse the user question and identify the exact evidence needed.
2. Load only the references required for the question.
3. For long documents, apply chunking to stay within context limits.
4. Rank sources by authority and recency when multiple documents cover the same topic.
5. Identify exact supporting passages and separate direct support from inference.
6. If sources conflict, report both positions and explain the conflict type.
7. Produce a concise answer with evidence bullets and a confidence note.
8. If evidence is missing, state what is missing and what to load next.

## Output Standard

Every response must include:

1. **Answer section**: concise answer in 1-3 sentences.
2. **Evidence bullets**: each with file path, line range, and quoted excerpt.
3. **Confidence note**: `High`, `Medium`, `Low`, or `Insufficient` with brief justification.
4. **Gaps section** (when applicable): missing documents or evidence areas.

Confidence rules:

- **High**: directly supported by multiple consistent passages.
- **Medium**: supported by a single passage or a narrow inference.
- **Low**: partial or conflicting support.
- **Insufficient**: cannot answer from the loaded material.

## Integration

1. Use after `obsidian-mcp` when note discovery or narrow file reads are needed first.
2. Feed outputs into `document-summary` or `report-writing` when the next step is synthesis.
3. Preserve exact excerpts and confidence notes when downstream skills reuse the answer.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/qa-guidelines.md` when evidence handling or conflict resolution needs stricter rules.
- Load `references/chunk-strategy.md` when documents are long enough to require sectioning.
- Load `references/citation-format.md` when the output must follow a strict evidence citation format.
