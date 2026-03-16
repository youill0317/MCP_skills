# Output Examples

Load this reference when the target Markdown shape needs a concrete page-preserving example.

## Example: Page-Preserving Heading Depth

```markdown
# Research Methods

## Sampling

Paragraph text.

### Inclusion Criteria

- Adults
- First-time participants
```

## Example: Same Topic Across Two Pages Without Merging

```markdown
# Results

## Group A

- Accuracy improved
- Response time decreased

---

## Group A

Continuation paragraph for the same topic on the next page.

- Error rate stayed low
```

## Example: Quote vs. General Note

```markdown
## Prior Work

> "This framework improved retention by 12%."

General note about how the study was summarized in class.
```

## Example: Recoverable Table Repair

```markdown
| Item | Detail |
| --- | --- |
| A | Description |
| B | More detail |
```

## Example: Recoverable Mermaid Repair

````markdown
```mermaid
flowchart TD
    A[Input] --> B[Process]
    B --> C[Output]
```
````

## Example: Basic Frontmatter

```yaml
---
tags: [notes, cleaned]
previous_lecture: ""
next_lecture: ""
related_notes: []
updated: "YYYY-MM-DD"
---
```
