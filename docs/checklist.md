# Reference

What frontfrisk checks in the UI you couldn't see. Mirrors `skill/SKILL.md`.

## 1. Contrast (computed)

For each text-on-background pair, it resolves the actual colors (hex / rgb / the
token's value) and computes the WCAG contrast ratio.

```jsx
<span style={{ color: "#8A8A8A" }}>Subtotal</span>   // on #FFF = 2.9:1  ✗ (needs 4.5:1)
```
- normal text: needs **4.5:1**
- large text (≥ 24px, or ≥ 18.66px bold) and UI borders/icons: needs **3:1**

This is the one the agent skips most, because it can't see it — and the one 84% of
sites fail.

## 2. Names & labels

```jsx
<img src="hero.png" />                 // ✗ no alt
<button><XIcon /></button>             // ✗ icon-only, no aria-label
<input type="email" />                 // ✗ no associated <label>
```

## 3. Keyboard & focus

```jsx
<div onClick={open}>Menu</div>         // ✗ not focusable / no key handler → <button>
button:focus { outline: none }         // ✗ removed focus with no replacement
tabindex="3"                            // ✗ positive tabindex reorders focus
```

## 4. Token / consistency drift

```css
color: #3b82f6;                         // ⚠ hardcoded; use var(--primary)
padding: 13px;                          // ⚠ off the spacing scale (4/8/12/16…)
```

## 5. ARIA misuse

Invalid or redundant `role`, `aria-*` on the wrong element, `aria-label` on a
non-interactive element.

## 6. Responsive footguns

```css
.container { width: 960px }             // ⚠ fixed width, should be fluid
.flex-child { /* missing */ min-width: 0 }  // ⚠ text overflows instead of shrinking
```

---

Severity: **✗ blocker** holds "done"; **⚠ warn** is worth fixing. frontfrisk
fixes the mechanical ones and never invents issues — a truly decorative image with
`alt=""` is correct, not a finding.
