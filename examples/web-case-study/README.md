# Web case study — frontfrisk, before / after

A real rendered web page (`before.html`) shipped the way an agent does — without
looking — then `after.html` with frontfrisk's fixes applied. The design is the
same; only the accessibility differs.

`e2e.mjs` renders both in a real browser (Playwright), runs **axe-core** on each,
records a video, and asserts the difference:

```
BEFORE violations: 6  (color-contrast, image-alt)
AFTER  violations: 0
PASS: before 6 → after 0
```

Run it:
```
npm i                      # axe-core
node e2e.mjs               # uses a local Playwright + Chromium
```

Outputs `video.webm`, `before.png`, `after.png`. The committed
[`../../assets/case-study.mp4`](../../assets/case-study.mp4) and
[`../../assets/case-study-compare.png`](../../assets/case-study-compare.png) are
rendered from this.
