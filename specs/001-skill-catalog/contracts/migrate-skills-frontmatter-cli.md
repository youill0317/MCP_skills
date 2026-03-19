# Contract: `migrate:skills-frontmatter` CLI

## Package Script

```text
npm run migrate:skills-frontmatter
```

Package script definition:

```text
npm run build --silent && node dist/cli/migrate-skills-frontmatter.js
```

## Direct Runtime Command

```text
node dist/cli/migrate-skills-frontmatter.js [--check] [--skills-root <path>] [--help]
```

## Inputs

| Argument | Required | Meaning |
|----------|----------|---------|
| `--check` | No | Report pending legacy `category` removals without rewriting files. |
| `--skills-root <path>` | No | Override the default package-relative `skills` root. |
| `--help` or `-h` | No | Print usage and exit with code `0`. |

## Default Resolution

- When `--skills-root` is omitted, the command resolves the skills root from `import.meta.url` using the package root that contains `package.json`.

## Output Format

The command prints:

1. `Skills root: <absolute path>`
2. `Mode: check` or `Mode: apply`
3. `Summary: updated=<n> unchanged=<n> invalid=<n> missing=<n>`
4. One line per record in the form `- <skillId>: <status>` with `(<message>)` appended when present

## Exit Codes

| Exit code | Meaning |
|-----------|---------|
| `0` | Migration completed successfully with no blocking invalid files, and in check mode no pending updates remained. |
| `1` | Invalid files were found, argument parsing failed, or check mode found pending updates. |

## Check-Mode Semantics

- Files are not rewritten.
- Legacy `category` lines are still counted as `updated` in the summary because they would change in apply mode.
- If any `updated` records exist in check mode, the command writes `Legacy category frontmatter still exists. Run the migration without --check.` to standard error and exits with `1`.
