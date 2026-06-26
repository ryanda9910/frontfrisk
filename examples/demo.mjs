/**
 * Self-driving demo for the README recording (VHS). Key-free and deterministic.
 * Report content is faithful to the real run in CASES.md. Run: node examples/demo.mjs
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", b: "\x1b[1m",
  green: "\x1b[38;5;42m", red: "\x1b[38;5;203m", yellow: "\x1b[38;5;221m",
  grey: "\x1b[90m", cyan: "\x1b[36m",
};
async function line(s = "", d = 55) { process.stdout.write(s + "\n"); await sleep(d); }
async function type(s, speed = 12) { for (const ch of s) { process.stdout.write(ch); await sleep(speed); } process.stdout.write(C.reset + "\n"); }

async function main() {
  await line(`${C.green}${C.b}  frontfrisk${C.reset} ${C.dim}— frisk your frontend before you ship it${C.reset}\n`, 400);

  await type(`${C.dim}  (agent finishes a component…)${C.reset}`, 18);
  await sleep(150);
  await line(`${C.red}  ✗ "Looks good, the button is done!"${C.reset} ${C.dim}(it never saw the page)${C.reset}`, 80);
  await line();
  await sleep(300);

  await type(`${C.cyan}$${C.reset} ${C.b}/frontfrisk${C.reset}`, 24);
  await sleep(300);
  await line(`${C.dim}  checking what the eyes would catch…${C.reset}`, 700);
  await line();

  await line(`${C.b}frontfrisk${C.reset} ${C.dim}— 4 issues in the UI you couldn't see${C.reset}`, 250);
  await line(`  ${C.red}✗ contrast${C.reset}  Button.tsx:14  ${C.cyan}#8A8A8A on #FFF${C.reset} = ${C.red}2.9:1${C.reset} (needs 4.5) ${C.green}→ #595959${C.reset}  ${C.green}[fixed]${C.reset}`, 340);
  await line(`  ${C.red}✗ a11y${C.reset}      Icon.tsx:7     icon-only <button>, no label ${C.green}→ aria-label="Close"${C.reset}  ${C.green}[fixed]${C.reset}`, 340);
  await line(`  ${C.red}✗ keyboard${C.reset}  Card.tsx:22    <div onClick> not focusable ${C.green}→ <button>${C.reset}  ${C.green}[fixed]${C.reset}`, 340);
  await line(`  ${C.yellow}⚠ drift${C.reset}     Hero.tsx:30    hardcoded ${C.cyan}#3b82f6${C.reset} ${C.green}→ var(--primary)${C.reset}  ${C.green}[fixed]${C.reset}`, 340);
  await line(`  ${C.green}✓${C.reset} rest clean ${C.dim}(alt text, ARIA)${C.reset}`, 250);
  await line(`${C.b}4 issues it couldn't see, now fixed.${C.reset}`, 200);
  await line();
  await sleep(400);
  await line(`${C.dim}  "looks good" is not a thing you can say about a page you never saw.${C.reset}`, 120);
  await line(`${C.green}  github.com/ryanda9910/frontfrisk${C.reset}`, 100);
  await line();
}
main();
