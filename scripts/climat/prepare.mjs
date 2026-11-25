// Calcule le climat de chaque commune de métropole à partir des relevés quotidiens Météo-France
// Période : les 30 dernières années complètes (Y0 à Y1). Une commune prend la station la plus proche
// en tenant compte de l'altitude (100 m d'écart comptent comme 10 km), avec une correction de température
// de −0,65 °C par 100 m de dénivelé (arrondie au demi-degré, au plus ±3 °C).
import fs from "fs";
import path from "path";
import zlib from "zlib";
import readline from "readline";
const RAW = "data/raw", OUT = "data/build/climat";
fs.mkdirSync(OUT, { recursive: true });
const Y0 = 1996, Y1 = 2025, NY = Y1 - Y0 + 1;
const T0 = Date.UTC(Y0, 0, 1), ND = Math.round((Date.UTC(Y1 + 1, 0, 1) - T0) / 864e5);
const isLeap = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const yStart = Array.from({ length: NY + 1 }, (_, i) => Math.round((Date.UTC(Y0 + i, 0, 1) - T0) / 864e5));

const stations = new Map();   // id -> {id,nom,lat,lon,alt,dep,TN,TX,RR}
async function readFile(file, dep) {
  if (!fs.existsSync(file)) return;
  const rl = readline.createInterface({ input: fs.createReadStream(file).pipe(zlib.createGunzip()), crlfDelay: Infinity });
  let H = null;
  for await (const line of rl) {
    const c = line.split(";");
    if (!H) { H = Object.fromEntries(c.map((k, i) => [k.trim(), i])); continue; }
    const d = c[H.AAAAMMJJ]; if (!d) continue;
    const y = +d.slice(0, 4); if (y < Y0 || y > Y1) continue;
    const t = Math.round((Date.UTC(y, +d.slice(4, 6) - 1, +d.slice(6, 8)) - T0) / 864e5);
    const id = c[H.NUM_POSTE];
    let s = stations.get(id);
    if (!s) { s = { id, nom: c[H.NOM_USUEL], lat: +c[H.LAT].replace(",", "."), lon: +c[H.LON].replace(",", "."), alt: +c[H.ALTI], dep, TN: new Float32Array(ND).fill(NaN), TX: new Float32Array(ND).fill(NaN), RR: new Float32Array(ND).fill(NaN) }; stations.set(id, s); }
    const v = k => { const x = c[H[k]]; return x === "" || x == null ? NaN : +x.replace(",", "."); };
    s.TN[t] = v("TN"); s.TX[t] = v("TX"); s.RR[t] = v("RR");
  }
}
// Qualité : une année est valable si au moins 90 % des jours ont TN et TX (ou RR pour la pluie)
function quality(s) {
  const okT = [], okR = [];
  for (let i = 0; i < NY; i++) {
    let nt = 0, nr = 0; const a = yStart[i], b = yStart[i + 1];
    for (let t = a; t < b; t++) { if (!isNaN(s.TN[t]) && !isNaN(s.TX[t])) nt++; if (!isNaN(s.RR[t])) nr++; }
    okT.push(nt >= 0.9 * (b - a)); okR.push(nr >= 0.9 * (b - a));
  }
  s.okT = okT; s.okR = okR; s.nT = okT.filter(Boolean).length; s.nR = okR.filter(Boolean).length;
}
const raw = path.join(RAW, "meteo");
const files = fs.existsSync(raw) ? fs.readdirSync(raw) : [];
const deps = [...new Set(files.map(f => f.split("_")[1]))].sort();
for (const dep of deps) {
  const before = new Set(stations.keys());
  for (const per of ["previous-1950-2024", "latest-2025-2026"]) await readFile(path.join(raw, `Q_${dep}_${per}_RR-T-Vent.csv.gz`), dep);
  for (const [id, s] of stations) if (!before.has(id)) {          // stations de ce département : on ne garde que les séries complètes
    quality(s);
    if (s.nT < 24) { if (s.nR >= 24) { s.TN = s.TX = null; s.rainOnly = true; } else stations.delete(id); }
  }
}
const ST = [...stations.values()];
const TEMP = ST.filter(s => !s.rainOnly), RAIN = ST.filter(s => s.nR >= 24);
console.log(`Stations : ${TEMP.length} avec températures (≥ 24 années complètes sur ${NY}), ${RAIN.length} avec pluie`);

// Indicateurs d'une station, températures décalées de o °C
const r1 = x => Math.round(x * 10) / 10;
function indicateurs(s, o, sr) {
  const Y = [], G = {}, mT = Array.from({ length: 12 }, () => [0, 0, 0, 0]), mR = Array.from({ length: 12 }, () => [0, 0]);
  for (let i = 0; i < NY; i++) {
    const y = Y0 + i, a = yStart[i], b = yStart[i + 1], jul = a + (isLeap(y) ? 182 : 181);
    let last = 0, first = 0, g2 = 0, mn = Infinity, d30 = 0, d35 = 0, gel = 0, n20 = 0, rJJA = 0, rAn = 0;
    for (let t = a; t < b; t++) {
      const doy = t - a + 1, m = new Date(T0 + t * 864e5).getUTCMonth();
      const tn = s.TN[t] + o, tx = s.TX[t] + o, rr = sr.RR[t];
      if (s.okT[i] && !isNaN(tn)) {
        if (tn <= 0) { gel++; if (t < jul) last = doy; else if (!first) first = doy; }
        if (tn <= -2 && t < jul) g2 = doy;
        if (tn < mn) mn = tn; if (tn >= 20) n20++;
        mT[m][0] += tn; mT[m][1]++;
      }
      if (s.okT[i] && !isNaN(tx)) { if (tx >= 30) d30++; if (tx >= 35) d35++; mT[m][2] += tx; mT[m][3]++; }
      if (sr.okR[i] && !isNaN(rr)) { rAn += rr; if (m >= 5 && m <= 7) rJJA += rr; mR[m][0] += rr; }
    }
    if (sr.okR[i]) for (let m = 0; m < 12; m++) mR[m][1]++;
    if (!s.okT[i]) continue;
    Y.push([y, last, first, r1(mn), d30, d35, gel, sr.okR[i] ? Math.round(rJJA) : null, sr.okR[i] ? Math.round(rAn) : null, n20]);
    G[y] = g2;
  }
  const M = mT.map((v, m) => [m + 1, r1(v[0] / v[1]), r1(v[2] / v[3]), Math.round(mR[m][0] / (mR[m][1] || 1))]);
  return { Y, G, M };
}
// Rattachement des communes
const km = (a, b) => { const R = 6371, dLa = (b.lat - a.lat) * Math.PI / 180, dLo = (b.lon - a.lon) * Math.PI / 180, x = Math.sin(dLa / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const communes = JSON.parse(fs.readFileSync(path.join(RAW, "communes.json"), "utf8"));
const rd = f => fs.existsSync(path.join(RAW, f)) ? JSON.parse(fs.readFileSync(path.join(RAW, f), "utf8")) : null;
const DEPN = Object.fromEntries((rd("departements.json") || []).map(d => [d.code, d.nom]));
const ARG = rd("argile.json") || {};
// Tendance calcaire / acide renseignée à la main, commune par commune (carte des sols INRAE) : data/sols/tendances.json
const SOLS = fs.existsSync("data/sols/tendances.json") ? JSON.parse(fs.readFileSync("data/sols/tendances.json", "utf8")) : {};
// Même adresse que sur Argile Arena : nom-de-la-commune-code-insee
const slugify = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/['’]/g, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const out = [], keys = new Map();
for (const c of communes) {
  let best = null, bs = Infinity;
  for (const s of TEMP) {
    if (Math.abs(s.lat - c.lat) > 1 || Math.abs(s.lon - c.lon) > 1.4) continue;
    const d = km(c, s), sc = d + (c.alt != null ? Math.abs(c.alt - s.alt) / 10 : 0);
    if (sc < bs) { bs = sc; best = { s, d }; }
  }
  if (!best) for (const s of TEMP) { const d = km(c, s), sc = d + (c.alt != null ? Math.abs(c.alt - s.alt) / 10 : 0); if (sc < bs) { bs = sc; best = { s, d }; } }
  if (!best) continue;
  const s = best.s, dAlt = c.alt != null ? c.alt - s.alt : 0;
  const corr = Math.max(-3, Math.min(3, Math.round(-0.0065 * dAlt * 2) / 2)) || 0;
  let sr = s; if (s.nR < 24) { let bd = Infinity; for (const r of RAIN) { const d = km(c, r); if (d < bd) { bd = d; sr = r; } } }
  const key = `${s.id}|${corr}|${sr.id}`; keys.set(key, [s, corr, sr]);
  const r = ARG[c.code];   // [aucune, faible, moyenne, forte] en % du territoire
  out.push({ ...c, slug: slugify(c.nom) + "-" + c.code, depNom: DEPN[c.dep] || "", st: s.id, stNom: s.nom, stAlt: s.alt, dist: Math.round(best.d), dAlt, corr, key,
    argile: r ? { moyenOuFort: Math.round(r[2] + r[3]), fort: Math.round(r[3]) } : null,
    sols: SOLS[c.code] ? { tendance: SOLS[c.code].tendance, resume: SOLS[c.code].resume } : null });
}
const climats = {};
for (const [key, [s, corr, sr]] of keys) climats[key] = indicateurs(s, corr, sr);
fs.writeFileSync(path.join(OUT, "communes.json"), JSON.stringify(out));
fs.writeFileSync(path.join(OUT, "climats.json"), JSON.stringify(climats));
// Pour le navigateur : un fichier par climat (fiches et accueil de la ville mémorisée) et l'index de recherche
const PUB = "public/data"; fs.rmSync(path.join(PUB, "climats"), { recursive: true, force: true }); fs.mkdirSync(path.join(PUB, "climats"), { recursive: true });
const fileKey = k => k.replace(/\|/g, "_");
for (const [k, v] of Object.entries(climats)) fs.writeFileSync(path.join(PUB, "climats", fileKey(k) + ".json"), JSON.stringify(v));
fs.writeFileSync(path.join(PUB, "communes.json"), JSON.stringify(out.slice().sort((a, b) => b.pop - a.pop).map(c => [c.nom, c.cp, c.slug])));
fs.writeFileSync(path.join(OUT, "stations.json"), JSON.stringify(TEMP.map(s => ({ id: s.id, nom: s.nom, lat: s.lat, lon: s.lon, alt: s.alt, dep: s.dep, nT: s.nT, nR: s.nR }))));
const far = out.filter(c => c.dist > 30).length, big = out.filter(c => Math.abs(c.dAlt) > 300).length;
console.log(`Communes rattachées : ${out.length} / ${communes.length} · climats distincts : ${keys.size} · station à plus de 30 km : ${far} · dénivelé de plus de 300 m : ${big}`);

// Villes témoins
const median = a => { const b = [...a].sort((x, y) => x - y); return b.length % 2 ? b[(b.length - 1) / 2] : (b[b.length / 2 - 1] + b[b.length / 2]) / 2; };
const quant = (a, q) => { const b = [...a].sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.round(q * (b.length - 1)))]; };
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const date = n => { if (!n) return "aucune"; const d = new Date(Date.UTC(2025, 0, Math.round(n))); return d.getUTCDate() + " " + MOIS[d.getUTCMonth()]; };
const TEM = (process.env.TEMOINS || "31555,67482,29019,06088,63113,59350,66136,74056,05023,2A004,75056,69123").split(",");
const lignes = [];
for (const code of TEM) {
  const c = out.find(x => x.code === code); if (!c) { lignes.push(`${code} : absente`); continue; }
  const { Y } = climats[c.key]; const A = Y.filter(y => y[0] < 2011), B = Y.filter(y => y[0] >= 2011);
  const last = Y.map(y => y[1]), nSans = last.filter(x => !x).length;
  lignes.push([c.nom, `station ${c.stNom} (${c.dist} km, ${c.stAlt} m ; commune ${c.alt ?? "?"} m ; correction ${c.corr} °C)`, `années ${Y.length}`,
    `dernière gelée médiane ${date(median(last))}, 1 an sur 10 après ${date(quant(last, .9))}${nSans ? `, aucune gelée ${nSans} printemps` : ""}`,
    `froid d'un hiver ordinaire ${r1(mean(Y.map(y => y[3])))} °C, record ${Math.min(...Y.map(y => y[3]))} °C`,
    `jours ≥ 30 °C : ${Math.round(mean(A.map(y => y[4])))} (1996-2010) → ${Math.round(mean(B.map(y => y[4])))} (2011-2025)`,
    `pluie juin-août ${Math.round(mean(Y.filter(y => y[7] != null).map(y => y[7])))} mm, année ${Math.round(mean(Y.filter(y => y[8] != null).map(y => y[8])))} mm`].join(" | "));
}
fs.writeFileSync(path.join(OUT, "temoins.txt"), lignes.join("\n") + "\n");
console.log("\nVILLES TÉMOINS\n" + lignes.join("\n"));
