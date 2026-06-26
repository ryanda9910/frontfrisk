/**
 * E2E case study for frontfrisk: render a real web page (before / after the
 * skill's fixes), run axe-core accessibility checks on each, and record a video
 * showing the difference. Asserts: before has violations, after has none.
 *
 *   node e2e.mjs
 *
 * Output: video.webm (the recording) + before.png / after.png.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("/Users/aldoryanda/project/design-id/node_modules/playwright");
const axeSource = require("axe-core").source;
const here = dirname(fileURLToPath(import.meta.url));
const url = (f) => "file://" + join(here, f);

const RULES = ["color-contrast", "image-alt", "button-name", "link-name", "label"];

async function audit(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async (rules) => {
    const res = await window.axe.run(document, { runOnly: rules });
    return res.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target.join(" ")),
    }));
  }, RULES);
}

// red-outline every violating node + a banner
async function annotate(page, violations, ok) {
  await page.evaluate(({ violations, ok }) => {
    for (const v of violations) for (const sel of v.nodes) {
      const el = document.querySelector(sel);
      if (el) { el.style.outline = "3px solid #ff3b3b"; el.style.outlineOffset = "2px"; }
    }
    const b = document.createElement("div");
    const total = violations.reduce((n, v) => n + v.nodes.length, 0);
    b.textContent = ok ? "✓  0 accessibility violations" : `✗  ${total} accessibility violations`;
    Object.assign(b.style, {
      position: "fixed", top: "16px", right: "16px", zIndex: 99999,
      font: "600 15px -apple-system, system-ui, sans-serif", color: "#fff",
      background: ok ? "#16a34a" : "#dc2626", padding: "10px 16px",
      borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,.25)",
    });
    document.body.appendChild(b);
  }, { violations, ok });
}

const main = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: here, size: { width: 1280, height: 800 } },
  });
  const page = await ctx.newPage();

  // BEFORE — the page an agent shipped without looking
  await page.goto(url("before.html"));
  await page.waitForTimeout(900);
  const before = await audit(page);
  await annotate(page, before, false);
  await page.waitForTimeout(2600);
  await page.screenshot({ path: join(here, "before.png") });

  // AFTER — frontfrisk's fixes applied
  await page.goto(url("after.html"));
  await page.waitForTimeout(900);
  const after = await audit(page);
  await annotate(page, after, after.length === 0);
  await page.waitForTimeout(2600);
  await page.screenshot({ path: join(here, "after.png") });

  await ctx.close(); // finalizes the video
  await browser.close();

  const bn = before.reduce((n, v) => n + v.nodes.length, 0);
  const an = after.reduce((n, v) => n + v.nodes.length, 0);
  console.log("BEFORE violations:", bn, before.map((v) => v.id).join(", "));
  console.log("AFTER  violations:", an, after.map((v) => v.id).join(", ") || "(none)");
  if (bn === 0) { console.error("FAIL: before should have violations"); process.exit(1); }
  if (an !== 0) { console.error("FAIL: after should be clean"); process.exit(1); }
  console.log("PASS: before", bn, "→ after 0");
};
main().catch((e) => { console.error(e); process.exit(1); });
