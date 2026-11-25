// Données de la construction : communes rattachées à leur station et climats (produits par scripts/climat/prepare.mjs).
// Sans ces fichiers (aperçu local), le site se construit avec Toulouse seule, à partir des données de la maquette.
import fs from "fs";
import { TOULOUSE_REF, REF_Y, REF_M, REF_G } from "./jardin.js";
const DIR = "data/build/climat";
let cache = null;
export function donnees() {
  if (cache) return cache;
  if (fs.existsSync(`${DIR}/communes.json`)) {
    let communes = JSON.parse(fs.readFileSync(`${DIR}/communes.json`, "utf8"));
    const climats = JSON.parse(fs.readFileSync(`${DIR}/climats.json`, "utf8"));
    if (process.env.COMMUNES_MAX) communes = communes.sort((a, b) => b.pop - a.pop).slice(0, +process.env.COMMUNES_MAX);
    cache = { communes, climats, demo: false };
  } else {
    const t = TOULOUSE_REF;
    cache = { demo: true, climats: { demo: { Y: REF_Y, M: REF_M, G: REF_G } },
      communes: [{ code: "31555", nom: "Toulouse", slug: t.slug, cp: t.cp, dep: "31", depNom: "Haute-Garonne", pop: 504078, key: "demo",
        stNom: "TOULOUSE-BLAGNAC", stAlt: 151, dist: 6, corr: 0, alt: 146, argile: t.argile, sols: t.sols }] };
  }
  cache.parCode = new Map(cache.communes.map(c => [c.code, c]));
  return cache;
}
