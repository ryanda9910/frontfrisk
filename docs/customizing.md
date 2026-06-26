# Customizing

frontfrisk is one file of instructions: `skill/SKILL.md` (installed at
`~/.claude/skills/frontfrisk/SKILL.md`). Edit it to change behavior — no build, no code.

## Point it at your design tokens

The highest-value tune: name your tokens in "Token / consistency drift" in
`SKILL.md` — e.g. "colors must come from `--color-*`, spacing from the 4px scale,
radius from `--radius-*`". The more it knows your system, the more useful the
drift findings (and the fewer false ones).

## Target WCAG AA vs AAA

Default thresholds are AA (4.5:1 / 3:1). For AAA, change them to 7:1 / 4.5:1 in
the "Contrast" step.

## Stack mapping

Swap the React/JSX idioms for Vue (`@click` on non-interactive, `v-html`),
Svelte, Angular, or plain HTML. The checks are the same; only the syntax differs.

## Project-specific rules

Use `--project` install to commit a tuned `./.claude/skills/frontfrisk/SKILL.md` so
your team shares the same behavior.
