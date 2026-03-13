# MCP Skills Bridge

MCP server that provides two tools:
- `list_skills`
- `run_skill`

It loads `SKILL.md`-based workflows from `./skills` (configurable in `config/mcp-skills.config.json`).
Reference files are loaded only when the caller passes `reference_paths` to `run_skill`.
Each skill uses generic `SKILL.md` frontmatter centered on `name` and `description`.
The skill folder id, frontmatter `name`, and exposed API `name` should be the same hyphen-case value.

## Install and Build

```bash
npm install
npm run build
```

## Run

```bash
npm start
```

## Frontmatter Migration

Legacy skills that still declare `category` in `SKILL.md` frontmatter must be migrated before starting the server.
The loader now treats that field as invalid and will skip those skills from `list_skills` and reject direct `run_skill` calls.

```bash
npm run migrate:skills-frontmatter
```

Check mode reports pending migrations without editing files:

```bash
npm run migrate:skills-frontmatter -- --check
```

You can also point the migration at a different root instead of the configured `skillsRoot`:

```bash
npm run migrate:skills-frontmatter -- --skills-root ./path/to/skills
```

## Client Configuration (Claude Code)

Add this server entry to Claude Code client JSON (`mcpServers`):

```json
{
  "mcpServers": {
    "mcp_skills": {
      "command": "node",
      "args": [
        "C:/path/to/MCP/MCP_skills/dist/server.js"
      ]
    }
  }
}
```

Notes:
- This server does not require API keys by default.
- Runtime behavior is controlled by `config/mcp-skills.config.json`.

## Reusing Skills Across Clients

The shared core of each skill lives under `skills/<skill-id>/SKILL.md`.
Optional supporting files can live beside it in `references/`, `scripts/`, or `assets/`.
This MCP server is an adapter layer that reads that core and exposes it through `list_skills` and `run_skill`.

| Client | What to Add | Notes |
| --- | --- | --- |
| Claude Code | Keep the core skill and place it in a Claude-supported skill location such as `.claude/skills` when needed. Add Claude-specific registration or memory files separately. | Keep `CLAUDE.md` and other Claude-specific guidance outside the shared skill body. |
| GitHub Copilot | Keep the core skill and place it in `.github/skills` or another supported skill location. Add Copilot-specific instruction files only as needed. | Extra instruction layers may include `.github/copilot-instructions.md`, `.github/instructions/**/*.instructions.md`, `AGENTS.md`, or `.github/agents/*.agent.md`. VS Code, CLI, and coding-agent setups can share the same skill core while using different registration layers. |
| Codex / OpenAI | Keep the core skill and add client-specific metadata alongside it if the target environment expects extra files. An `agents/openai.yaml`-style file can be treated as an adapter example, not as a guaranteed universal requirement. | This repository's MCP server can also expose the same skill core to environments that do not natively load skills. |

Rule of thumb:
- Write the shared skill content first.
- Add client metadata second.
- Do not rewrite the skill body per client unless a client-specific constraint truly requires it.
