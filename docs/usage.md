# Usage

## When it runs

- **Automatically** right before the agent says a UI / component / styling task
  is done or "looks good" — any closing claim about a page it touched.
- **On demand** via `/frontfrisk`.

## What it looks at

The **changed markup and styles** — the JSX/HTML/CSS you just wrote, not the whole
app. It reasons about the rendered result the agent can't see.

## The output

```
frontfrisk — 4 issues in the UI you couldn't see
  ✗ contrast  Button.tsx:14  #8A8A8A on #FFFFFF = 2.9:1 (needs 4.5:1) → darken to #595959  [fixed]
  ✗ a11y      Icon.tsx:7     icon-only <button>, no label → added aria-label="Close"  [fixed]
  ✗ keyboard  Card.tsx:22    <div onClick> not focusable → changed to <button>  [fixed]
  ⚠ drift     Hero.tsx:30    hardcoded #3b82f6 → use var(--primary)  [fixed]
  ✓ rest clean (alt text, labels, ARIA)
4 issues it couldn't see, now fixed.
```

- `✗ blocker` — failing contrast, a missing label, a keyboard-unreachable control,
  broken ARIA. These hold "done".
- `⚠ warn` — token/spacing drift, a responsive footgun, a decorative SVG that
  isn't hidden.

## The rule

The agent won't say the UI is done or "looks good" while a **blocker** is
unaddressed (unfixed and unaccepted). If the diff is clean, it says so and moves on.
