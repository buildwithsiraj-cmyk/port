// Captures 16:10 screenshots of the live sites using the locally installed Chrome.
// Usage: npm run capture            (all projects)
//        npm run capture -- slug    (one project)
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].find((p) => fs.existsSync(p));

const sites = JSON.parse(fs.readFileSync("data/projects.json", "utf8"));
const only = process.argv[2];
const out = path.resolve("public/projects");
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const results = [];
for (const p of sites) {
  if (only && p.slug !== only) continue;
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  try {
    const res = await page.goto(p.demo, { waitUntil: "networkidle2", timeout: 60000 });
    const status = res?.status();
    await new Promise((r) => setTimeout(r, 3000));
    // nudge scroll to trigger lazy/reveal content, then return to top
    await page.evaluate(() => window.scrollTo(0, 400));
    await new Promise((r) => setTimeout(r, 800));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1200));
    // Never publish prefilled personal data (e.g. login demo credentials) in thumbnails
    await page.evaluate(() =>
      document.querySelectorAll("input").forEach((i) => {
        if (["email", "password", "text", "tel"].includes(i.type)) i.value = "";
      })
    );
    const title = await page.title();
    const meta = await page.evaluate(
      () => document.querySelector('meta[name="description"]')?.getAttribute("content") || ""
    );
    await page.screenshot({ path: path.join(out, `${p.slug}.webp`), type: "webp", quality: 85 });
    results.push({ slug: p.slug, ok: true, status, title, meta });
  } catch (e) {
    results.push({ slug: p.slug, ok: false, error: String(e.message || e) });
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
