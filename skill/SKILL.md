---
name: frontfrisk
description: >-
  Frisk your frontend before you ship it. Triggers right before you'd say a UI
  task is done (or on /frontfrisk). A coding agent writes UI blind — it can't see
  the rendered page — so it ships the bugs you only catch by looking: failing
  contrast, missing alt/labels, controls you can't reach by keyboard, and color
  or spacing that drifted off the design tokens. frontfrisk checks the changed
  markup/styles for exactly those, and won't call the UI done while a blocker is
  open.
---

# frontfrisk — frisk your frontend before you ship it

You just wrote or changed some UI. Here's the problem: you can't see it. There's
no rendered page, no screen reader, no Tab key in your hands — so the failures
that only show up *visually* sail straight through. "Looks good" is a thing an
agent says about a page it never looked at. frontfrisk checks the things you
can't see before that claim leaves the building.

## When to run

- **Automatically**, right before you report a UI / component / styling task as
  done — any "looks good / done / shipped" moment that touched markup or styles.
- **On demand** when the user types `/frontfrisk`.

Audit the **changed markup/styles only** (the diff or the files you just edited),
not the whole app.

## The frisk

1. **Contrast (compute it).** For every text-on-background pair you set, compute
   the WCAG contrast ratio from the actual colors (resolve hex / rgb / the design
   token's value; relative-luminance formula). Flag **< 4.5:1** for normal text
   and **< 3:1** for large text (≥ 24px, or ≥ 18.66px bold) and for UI borders /
   icons. This is the #1 thing the agent skips because it can't see it — most
   sites fail it.
2. **Names & labels.** `<img>` without `alt`; an icon-only `<button>`/`<a>` with
   no text and no `aria-label`; an `<input>` with no associated `<label>` (or
   `aria-label`); an SVG that conveys meaning with no `title`/`aria-label`, or
   decorative SVG missing `aria-hidden`.
3. **Keyboard & focus.** A clickable `<div>`/`<span>` (an `onClick` with no
   `role` + `tabIndex` + key handler) — use a real `<button>`/`<a>`; `outline:
   none` with no replacement focus style; positive `tabindex`; a focus trap.
4. **Token / consistency drift.** A hardcoded color or spacing value where a
   design token exists (`#3b82f6` instead of `var(--primary)`); a magic px value
   off the spacing scale; two near-identical colors that should be one token.
5. **ARIA misuse.** An invalid or redundant `role`; `aria-*` on the wrong element;
   an `aria-label` on something non-interactive.
6. **Responsive footguns.** A fixed `px` width on a container that should be
   fluid; a flex/grid child missing `min-width: 0` so its text can't shrink and
   overflows; text set to never wrap.

Severity: **✗ blocker** — fails contrast, missing label, keyboard-unreachable
control, broken ARIA. **⚠ warn** — token drift, responsive footgun, decorative
SVG not hidden.

## What to do with findings

- **Fix the mechanical ones yourself** — add the `alt`/`aria-label`, swap the
  `<div onClick>` for a `<button>`, replace the hardcoded color with the token,
  add the focus style. State each fix.
- **Escalate a design call** — if meeting contrast means changing the brand color
  or the layout, show the failing ratio and 1–2 concrete options, ask the user.
- **Don't invent issues.** A genuinely decorative image with `alt=""` is correct;
  a `<div>` with no handler is fine. Only flag real problems.

## The hard rule

Do **not** say the UI is done / looks good while a **blocker** is unaddressed
(unfixed and unaccepted). If it's clean, say so in one line and finish.

## Output format

```
frontfrisk — N issue(s) in the UI you couldn't see
  ✗ contrast  Button.tsx:14  #8A8A8A on #FFFFFF = 2.9:1  (needs 4.5:1) → darken to #595959  [fixed]
  ✗ a11y      Icon.tsx:7     icon-only <button>, no label → added aria-label="Close"  [fixed]
  ✗ keyboard  Card.tsx:22    <div onClick> not focusable → changed to <button>  [fixed]
  ⚠ drift     Hero.tsx:30    hardcoded #3b82f6 → use var(--primary)  [fixed]
  ✓ rest clean (alt text, labels, ARIA)
4 issues it couldn't see, now fixed.
```

Be terse. Real issues only. You can't see the page — so check what the eyes would
have caught before you say it looks good.
