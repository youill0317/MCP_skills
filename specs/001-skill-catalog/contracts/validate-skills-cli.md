# Contract: `validate:skills` CLI

## Package Script

```text
npm run validate:skills
```

Package script definition:

```text
npm run build --silent && node dist/cli/validate-skills.js
```

## Direct Runtime Command

```text
node dist/cli/validate-skills.js [--skills-root <path>] [--report text|json] [--help]
```

## Inputs

| Argument | Required | Meaning |
|----------|----------|---------|
| `--skills-root <path>` | No | Override the default package-relative `skills` root. |
| `--report <format>` | No | Output format: `text` or `json`. Defaults to `text`. |
| `--help` or `-h` | No | Print usage and exit with code `0`. |

## Default Resolution

- When `--skills-root` is omitted, the command resolves the skills root from `import.meta.url` using the package root that contains `package.json`.

## Output Format

In `text` mode the command prints:

1. `Skills root: <absolute path>`
2. `Summary: valid=<n> invalid=<n> missing=<n> errors=<n>`
3. One line per record in the form `- <skillId>: <status> errors=<n>` with `(<message>)` appended when present
4. One indented line per issue in the form `- <ruleId>: <message> (<path>:<line>:<column>)`

In `json` mode the command prints a JSON object with:

- `skillsRoot`
- `summary.records`
- `summary.valid`
- `summary.invalid`
- `summary.missing`
- `summary.errors`

## Exit Codes

| Exit code | Meaning |
|-----------|---------|
| `0` | No structural errors were found. |
| `1` | One or more structural errors were found, argument parsing failed, or another error occurred. |

## Error Conditions

- Unknown argument
- Missing value after `--skills-root`
- Invalid value after `--report`
- Filesystem errors while resolving or reading the skills root
