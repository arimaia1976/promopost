/**
 * Teste de regressão visual: compara o site de referência (original) com o novo,
 * página a página, em 360, 768, 1280 e 1920 px. Gera capturas e mapas de diferença
 * em tests/visual/output. Uso:
 *   REF=http://localhost:8080 NEW=http://localhost:3000 node tests/visual/compare.mjs / /sobre/
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("playwright-core")); }

const REF = process.env.REF ?? "http://localhost:8080";
const NEW = process.env.NEW ?? "http://localhost:3000";
const WIDTHS = (process.env.WIDTHS ?? "360,768,1280,1920").split(",").map(Number);
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
const OUT = new URL("./output/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

async function capture(browser, url, width, file) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.clock.install({ time: new Date("2026-11-06T12:00:00") });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.clock.runFor(1000); // inicializa carrosséis, sem chegar ao autoplay (3 s)
  // o carrossel jQuery do site original às vezes avança um slide sozinho ao carregar
  // (condição de corrida); fixa no 1º slide, que é o estado configurado
  await page.evaluate(() => { if (window.jQuery) window.jQuery(".owl-carousel").trigger("stop.owl.autoplay").trigger("to.owl.carousel", [0, 0]); });
  await page.clock.runFor(50);
  await page.evaluate(async () => {
    document.querySelectorAll("img[data-src]").forEach((i) => { i.src = i.dataset.src; if (i.dataset.srcset) i.srcset = i.dataset.srcset; if (i.dataset.sizes === "auto") i.sizes = i.getBoundingClientRect().width + "px"; i.classList.remove("lazyload"); i.classList.add("lazyloaded"); });
    document.querySelectorAll("img.lazyautosizes").forEach((i) => { i.classList.remove("lazyautosizes"); i.removeAttribute("data-sizes"); i.sizes = Math.round(i.getBoundingClientRect().width) + "px"; });
    document.querySelectorAll(".elementor-invisible").forEach((e) => e.classList.remove("elementor-invisible"));
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = "eager"; });
    // remove listeners do lazysizes (original) clonando a imagem já resolvida
    document.querySelectorAll("img.lazyloaded").forEach((i) => { const c = i.cloneNode(true); c.decoding = "sync"; i.replaceWith(c); });
  });
  // aguarda imagens (relógio da página está congelado; espera feita pelo Node)
  for (let t = 0; t < 50; t++) {
    if (await page.evaluate(() => [...document.images].every((i) => i.complete) && document.fonts.status === "loaded")) break;
    await new Promise((r) => setTimeout(r, 200));
  }
  await page.addStyleTag({ content: "*,*:before,*:after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
  await page.clock.runFor(100);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
}

function diff(a, b, out) {
  const A = PNG.sync.read(fs.readFileSync(a)), B = PNG.sync.read(fs.readFileSync(b));
  const w = Math.max(A.width, B.width), h = Math.max(A.height, B.height);
  const pad = (img) => { const p = new PNG({ width: w, height: h }); p.data.fill(255); PNG.bitblt(img, p, 0, 0, img.width, img.height, 0, 0); return p; };
  const pa = pad(A), pb = pad(B), d = new PNG({ width: w, height: h });
  const n = pixelmatch(pa.data, pb.data, d.data, w, h, { threshold: 0.1, includeAA: false });
  fs.writeFileSync(out, PNG.sync.write(d));
  // faixas verticais com diferença (para localizar)
  const rows = [];
  for (let y = 0; y < h; y++) {
    let c = 0;
    for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (d.data[i] === 255 && d.data[i + 1] === 0) c++; }
    if (c) rows.push(y);
  }
  const bands = [];
  for (const y of rows) { const l = bands.at(-1); if (l && y - l[1] <= 5) l[1] = y; else bands.push([y, y]); }
  return { n, pct: (100 * n) / (w * h), size: [A.width, A.height, B.width, B.height], bands: bands.slice(0, 12) };
}

const browser = await chromium.launch();
let falhou = false;
for (const pg of PAGES) {
  const name = pg.replace(/\//g, "") || "home";
  for (const w of WIDTHS) {
    const a = `${OUT}${name}-${w}-ref.png`, b = `${OUT}${name}-${w}-new.png`;
    await capture(browser, REF + pg, w, a);
    await capture(browser, NEW + pg, w, b);
    const r = diff(a, b, `${OUT}${name}-${w}-diff.png`);
    if (r.n > 0) falhou = true;
    console.log(`${name} @${w}: ${r.n} px diferentes (${r.pct.toFixed(3)}%) tam ref ${r.size[0]}x${r.size[1]} novo ${r.size[2]}x${r.size[3]} faixas ${JSON.stringify(r.bands)}`);
  }
}
await browser.close();
process.exit(falhou ? 1 : 0);
