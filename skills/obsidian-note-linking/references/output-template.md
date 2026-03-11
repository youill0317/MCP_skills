# Output Template

Use this structure when returning recommendations.

## 0) Vault Connection Policy

- Primary form: `[[Note]]`
- Escalation forms: `[[Note#Heading]]`, `[[Note#^block-id]]`, `![[Note]]`
- Tag style: lowercase kebab-case
- Navigation footer labels: `이전`, `다음`, `상위`, `관련`
- Note: apply the same policy to all notes unless user requested a change.

## 1) Sequence Navigation Links

- 이전: `[[Prev Note]]`
- 다음: `[[Next Note]]`
- 상위: `[[Parent Note]]` (if applicable)
- 관련: `[[Sibling A]] · [[Sibling B]]`

## 2) Top Connection Candidates

- `[[Note A]]` — why this note matters to the current note.
- `[[Note B#Key Heading]]` — why this section-level connection is better than whole-note link.

## 3) Suggested Placement

- Body intro/context: `[[Note A]]`
- Body evidence/background: `[[Note B#Key Heading]]`
- Footer navigation: previous/next/related links block
- Optional embed area: `![[Note C]]`

## 4) Tag Suggestions

- Keep: `#tag1`, `#tag2`
- Add: `#tag3`, `#tag4`
- Normalize: `#old-tag -> #new-tag`

## 5) Paste-ready Footer Snippet

```markdown
---
## Navigation
- 이전: [[Prev Note]]
- 다음: [[Next Note]]
- 상위: [[Parent Note]]
- 관련: [[Sibling A]] · [[Sibling B]]

## Tags
#tag1 #tag2 #tag3
```
