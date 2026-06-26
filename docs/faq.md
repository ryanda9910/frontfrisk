# FAQ

### What is this, exactly?

A skill (plain instructions) your coding agent follows. It adds no network calls,
no telemetry, no account — your code goes wherever your agent already sends it and
nowhere new.

### How is it different from eslint-jsx-a11y / axe / Lighthouse?

Use those too. `eslint-plugin-jsx-a11y` is great but it's static and can't compute
contrast (it doesn't know your runtime colors), and axe/Lighthouse need a rendered
page in a browser — which is exactly what the agent doesn't have mid-task.
frontfrisk runs inside the agent that *just wrote the markup*, resolves the colors
and tokens from the code, computes the contrast there, and fixes in place before
the work is even called done. It's the pre-render pass that closes the gap until
your CI axe run catches the rest.

### Will it slow me down?

It runs once, at the "done" moment, over the markup/styles you just changed. The
cost is a quick check; the alternative is shipping a contrast fail to 84% odds.

### Does it nag?

No. It checks the changed UI only and never invents issues — a decorative image
with `alt=""` is correct, and a `<div>` with no handler is fine.

### What languages / stacks?

The classes (contrast, labels, keyboard, ARIA, token drift) are framework-agnostic.
Examples are React/JSX + CSS; the same ideas map to Vue, Svelte, Angular, plain
HTML, Tailwind, CSS-in-JS. Point it at your token names in `skill/SKILL.md`.

### Which agents?

Claude Code (native), plus Codex, Cursor, Gemini CLI, opencode, Aider, Copilot CLI.

### It missed / mis-flagged something.

Open an issue with the example and the output — the checklist is a living file.
