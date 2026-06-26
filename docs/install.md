# Install

## One line

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/ryanda9910/frontfrisk/main/install.sh | bash
# Windows (PowerShell)
irm https://raw.githubusercontent.com/ryanda9910/frontfrisk/main/install.ps1 | iex
```

Idempotent — re-run to update. Needs `curl` or `wget` (macOS/Linux); no other deps.

## Where it installs

| Agent | Location |
|---|---|
| **Claude Code** (native skill) | `~/.claude/skills/frontfrisk/SKILL.md` |
| Codex | `~/.codex/frontfrisk/frontfrisk.md` |
| Cursor | `~/.cursor/frontfrisk/frontfrisk.md` |
| Gemini CLI | `~/.gemini/frontfrisk/frontfrisk.md` |
| opencode / Aider / Copilot CLI | manual (paste into the rules file) |

## Global vs project

- **Global** (default) — home agent dirs; applies to every repo.
- **Project** — add `-- --project` (sh) / `-project` (ps1) to also install into
  `./.claude/skills/frontfrisk/SKILL.md` so the skill travels with the repo.

## Manual

```bash
mkdir -p ~/.claude/skills/frontfrisk
cp skill/SKILL.md ~/.claude/skills/frontfrisk/SKILL.md
```

## Uninstall

```bash
rm -rf ~/.claude/skills/frontfrisk ~/.codex/frontfrisk ~/.cursor/frontfrisk ~/.gemini/frontfrisk
```
