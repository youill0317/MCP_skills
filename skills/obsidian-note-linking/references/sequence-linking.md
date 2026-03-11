# Sequence Linking

Use this guide when note filenames include numeric order prefixes.

## Recognized Patterns

- `0.Title`, `1.Title`, `2.Title`
- zero-padded variants like `01.Title`, `02.Title`
- hierarchical variants like `1.1Title`, `1.2Title`, `2.1Title`
- mixed examples such as `0.OT`, `01.팀플`, `1.1주차자료`

## Parsing Rule

1. Extract leading numeric token before the first non-numeric/non-dot character.
2. Split token by dots into ordered levels.
   - `01` -> `[1]`
   - `1.1` -> `[1, 1]`
   - `0` -> `[0]`
3. Compare levels numerically, not lexicographically.

## Link Construction

For current note, recommend:

1. **Previous**: nearest lower note in same depth/track.
2. **Next**: nearest higher note in same depth/track.
3. **Parent**: immediate upper level note when depth > 1 (for `1.1`, parent candidate is `1.*`).
4. **Siblings**: notes sharing same parent prefix (for `1.1`, siblings are `1.2`, `1.3`, ...).
5. **Children**: optional when current is a parent index (`1` -> `1.1`, `1.2`).

## Placement Convention

Place sequence links at the bottom of each note in a dedicated block:

```markdown
---
## Navigation
- 이전: [[Prev Note]]
- 다음: [[Next Note]]
- 상위: [[Parent Note]]
- 관련: [[Sibling A]] · [[Sibling B]]
```

Only include entries that can be verified from existing note names.

## Conflict Rules

- If both `1.Title` and `01.Title` exist, treat them as same numeric rank and prefer vault-dominant naming style.
- If ordering is ambiguous, return candidates with a short ambiguity note instead of guessing.
