// Viewport sanity check: node scripts/viewport-check.mjs [url]
// Reports horizontal overflow, elements wider than the viewport, and console errors.
import puppeteer from "puppeteer-core";

const url = process.argv[2] || "http://localhost:3000";
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sizes = [
  [320, 568], [375, 667], [390, 844], [768, 1024],
  [1024, 768], [1366, 768], [1440, 900], [1920, 1080],
];

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
let failed = false;
for (const reducedMotion of [false, true]) {
  for (const [w, h] of sizes) {
    if (reducedMotion && w !== 390 && w !== 1440) continue;
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reducedMotion ? "reduce" : "no-preference" }]);
    await page.setViewport({ width: w, height: h });
    await page.goto(url, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 2500));
    // Scroll through to trigger lazy images and scroll animations
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.6)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise((r) => setTimeout(r, 120));
    }
    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll("main *, header *, footer *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > vw + 1 || r.left < -1) && getComputedStyle(el).position !== "fixed";
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
      return {
        scrollW: document.documentElement.scrollWidth,
        vw,
        over,
        h1: document.querySelector("h1")?.getBoundingClientRect().width,
      };
    });
    const bad = res.scrollW > res.vw || errors.length > 0;
    failed ||= bad;
    console.log(`${bad ? "FAIL" : "ok  "} ${w}x${h}${reducedMotion ? " [reduced]" : ""} scrollW=${res.scrollW} vw=${res.vw} h1=${Math.round(res.h1)} offscreen=${JSON.stringify(res.over)} errors=${errors.length}`);
    errors.slice(0, 3).forEach((e) => console.log("   err:", e.slice(0, 200)));
    await page.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
