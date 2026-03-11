# Consistency Policy

Use one policy across all notes in a vault unless the user explicitly changes it.

## Default Vault Policy

1. **Primary link form**: `[[Note]]`
2. **Section link form**: `[[Note#Heading]]` when only one section is relevant.
3. **Block link form**: `[[Note#^block-id]]` only for precise quote/claim reuse.
4. **Embed form**: `![[Note]]` only when inline rendering is needed.
5. **Tag style**: lowercase kebab-case (example: `#project-alpha`).
6. **Navigation block**: keep a fixed footer section (`## Navigation`) for previous/next/related links.

## Application Rules

- Keep one primary form dominant in recommendations (`[[Note]]` by default).
- Escalate to heading/block/embed only when precision benefit is clear.
- Use the same tag normalization strategy in every note (same casing and separators).
- Keep sequence navigation labels consistent (`이전`, `다음`, `상위`, `관련`).
- If legacy styles exist, propose gradual normalization without breaking current workflows.

## Override Rules

- If the user specifies a different policy, follow user policy for that vault.
- If the vault already has a strong existing convention, align to that convention and state it explicitly.
