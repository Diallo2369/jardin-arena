// Télécharge les données publiques nécessaires au climat des communes (exécuté dans GitHub Actions)
// - relevés quotidiens Météo-France (données climatologiques de base), 96 départements de métropole
// - communes (geo.api.gouv.fr) et altitude de leur centre (Géoplateforme IGN)
// Les fichiers déjà présents (cache de la publication précédente) ne sont retéléchargés que s'ils ont changé de taille.
import fs from "fs";
import path from "path";
const RAW = "data/raw";
fs.mkdirSync(path.join(RAW, "meteo"), { recursive: true });
const MF = "https://meteofrance.s3.sbg.io.cloud.ovh.net/data/synchro_ftp/BASE/QUOT/";
// la Corse figure sous le code 20 dans les fichiers Météo-France
const DEPS = Array.from({ length: 95 }, (_, i) => String(i + 1).padStart(2, "0"));
const only = process.env.DEPS ? process.env.DEPS.split(",") : null;   // pour les essais : DEPS=31,67

async function get(url, tries = 4) {
  for (let i = 1; ; i++) {
    try { const r = await fetch(url); if (!r.ok) throw new Error("HTTP " + r.status); return r; }
    catch (e) { if (i >= tries) throw new Error(`${url} : ${e.message}`); await new Promise(r => setTimeout(r, 2000 * i)); }
  }
}
async function download(url, file) {
  const head = await fetch(url, { method: "HEAD" }).catch(() => null);
  const size = head && head.ok ? Number(head.headers.get("content-length")) : null;
  if (fs.existsSync(file) && size && fs.statSync(file).size === size) return "cache";
  const r = await get(url); fs.writeFileSync(file, Buffer.from(await r.arrayBuffer())); return "ok";
}
// 1. Relevés Météo-France : période ancienne (jusqu'à 2024) et récente (2025-2026)
const list = (only || DEPS);
let n = 0;
async function worker(q) { for (let d; (d = q.shift());) for (const per of ["previous-1950-2024", "latest-2025-2026"]) {
  const f = `Q_${d}_${per}_RR-T-Vent.csv.gz`;
  const s = await download(MF + f, path.join(RAW, "meteo", f)); n++; if (n % 20 === 0) console.log(`  ${n} fichiers (${s})`);
} }
const q = [...list];
await Promise.all(Array.from({ length: 6 }, () => worker(q)));
console.log(`Météo-France : ${n} fichiers`);
// 2. Communes (métropole), avec centre, codes postaux et population
const com = await (await get("https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,centre,population,codeDepartement&format=json&geometry=centre")).json();
const metro = com.filter(c => c.centre && !c.codeDepartement.startsWith("97") && (!only || only.includes(c.codeDepartement.replace(/^2[AB]$/, "20"))));
// 3. Altitude du centre de chaque commune (par paquets)
const ALTI = "https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json";
let alts = {}; const altFile = path.join(RAW, "altitudes.json");
if (fs.existsSync(altFile)) alts = JSON.parse(fs.readFileSync(altFile, "utf8"));
const todo = metro.filter(c => alts[c.code] == null);
for (let i = 0; i < todo.length; i += 200) {
  const part = todo.slice(i, i + 200);
  const body = { lon: part.map(c => c.centre.coordinates[0]).join("|"), lat: part.map(c => c.centre.coordinates[1]).join("|"), resource: "ign_rge_alti_wld", zonly: "true", delimiter: "|" };
  try {
    let j = null;
    for (let t = 1; t <= 3 && !j; t++) { try { const r = await fetch(ALTI, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); if (r.ok) j = await r.json(); else if (t === 3) console.log("  altitude : HTTP " + r.status, (await r.text()).slice(0, 200)); } catch (e) { if (t === 3) throw e; } if (!j) await new Promise(r => setTimeout(r, 1500 * t)); }
    const z = (j && j.elevations) || [];
    part.forEach((c, k) => { const v = typeof z[k] === "number" ? z[k] : z[k]?.z; if (typeof v === "number" && v > -100) alts[c.code] = Math.round(v); });
  } catch (e) { console.log("  altitude : échec d'un paquet", e.message); }
  if (i % 4000 === 0) console.log(`  altitudes : ${Math.min(i + 200, todo.length)} / ${todo.length}`);
}
fs.writeFileSync(altFile, JSON.stringify(alts));
fs.writeFileSync(path.join(RAW, "communes.json"), JSON.stringify(metro.map(c => ({ code: c.code, nom: c.nom, dep: c.codeDepartement, cp: (c.codesPostaux || []).sort()[0] || "", pop: c.population || 0, lon: c.centre.coordinates[0], lat: c.centre.coordinates[1], alt: alts[c.code] ?? null }))));
console.log(`Communes : ${metro.length} · altitude connue : ${metro.filter(c => alts[c.code] != null).length}`);
