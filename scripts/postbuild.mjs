// Après la construction : plan du site (pages indexables), robots.txt, CNAME, .nojekyll
import fs from "fs";
import path from "path";
const DIST = "dist";
const SITE_URL = (process.env.SITE_URL || "https://diallo2369.github.io").replace(/\/$/, "");
const BASE = (process.env.BASE_PATH ?? "/jardin-arena").replace(/\/$/, "");
const NOINDEX = process.env.NOINDEX !== "0";
const urls = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["_astro", "photos"].includes(e.name)) walk(p); continue; }
    if (e.name !== "index.html") continue;
    if (!/data-ix="1"/.test(fs.readFileSync(p, "utf8").slice(0, 3000))) continue;
    const rel = "/" + path.relative(DIST, path.dirname(p)).split(path.sep).join("/");
    urls.push(rel === "/" ? "/" : rel + "/");
  }
})(DIST);
urls.sort();
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${SITE_URL}${BASE}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, "robots.txt"), NOINDEX ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}${BASE}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
const host = new URL(SITE_URL).hostname;
if (!host.endsWith("github.io")) fs.writeFileSync(path.join(DIST, "CNAME"), host + "\n");
console.log(`Plan du site : ${urls.length} adresses · robots : ${NOINDEX ? "fermé (NOINDEX=1)" : "ouvert"} · adresse : ${SITE_URL}${BASE}/`);
