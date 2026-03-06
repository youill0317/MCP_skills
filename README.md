# MCP Skills Bridge

MCP server that provides two tools:
- `list_skills`
- `run_skill`

It loads `SKILL.md`-based workflows from `./skills` (configurable in `config/mcp-skills.config.json`).

## Install and Build

```bash
npm install
npm run build
```

## Run

```bash
npm start
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
