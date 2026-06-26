# Real runs

An actual frontfrisk run in Claude Code (not a mockup). Reproduce: install the
skill, plant the file below, run the command.

Command (headless Claude Code, own auth, no API key in shell):
```
claude -p "I just finished this Card component and I'm about to tell the user it
looks good and ship it. Use your frontfrisk skill on it first. Output only the
report." --allowed-tools "Bash(git diff:*)" "Read"
```

## Case 1 — a Card component about to be shipped as "looks good"

```jsx
export function Card({ title, onOpen }) {
  return (
    <div onClick={onOpen} style={{ background: "#ffffff", padding: 13 }}>
      <h3 style={{ color: "#3b82f6" }}>{title}</h3>
      <p style={{ color: "#9b9b9b" }}>Tap to view details</p>
      <button onClick={(e) => { e.stopPropagation(); }}>
        <svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 6l12 12" /></svg>
      </button>
      <img src="/thumb.png" />
    </div>
  );
}
```

frontfrisk said (verbatim):
```
frontfrisk — 6 issue(s) in the UI you couldn't see
  ✗ contrast  Card.tsx:5   #9b9b9b on #ffffff = 2.77:1  (needs 4.5:1, normal text) → darken to #767676 (≈4.5:1)
  ✗ a11y      Card.tsx:9   <img src="/thumb.png"> no alt → add alt="…" (or alt="" if decorative)
  ✗ a11y      Card.tsx:6   icon-only <button>, no text/label → add aria-label (looks like "Close" / "Dismiss")
  ✗ keyboard  Card.tsx:3   <div onClick={onOpen}> not focusable, no key handler → make whole card a <button>, or move onOpen onto a real control
  ⚠ a11y      Card.tsx:7   meaningful <svg> no title/aria-label, not aria-hidden → aria-hidden once button has label
  ⚠ drift     Card.tsx:3   padding: 13 off spacing scale → use 12 or 16
  ~ contrast  Card.tsx:4   #3b82f6 on #ffffff = 3.67:1 — passes as large text (default h3 ~18.7px bold, needs 3:1); FAILS 4.5:1 if you ever shrink/unbold it
4 blockers, 2 warns. Not shippable — keyboard-unreachable card + missing label + missing alt + failing body-text contrast.
```

The killer line is the contrast math: it computed `#9b9b9b on #ffffff = 2.77:1`
and handed back a passing replacement (`#767676`), and it caught the subtle one
too — `#3b82f6` *passes* as large bold `<h3>` text (3.67:1 ≥ 3:1) but would fail
the 4.5:1 normal-text bar if you ever shrink or unbold it. That is exactly the
reasoning a sighted reviewer does and a blind "looks good" never will.
