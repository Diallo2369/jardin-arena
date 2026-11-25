// Contrôle avant construction : bloque la publication si le catalogue ou les pages sont anormaux
import { P, pageFor, pagesGenerales, pagesCommune, setCommune, setToulouseRef, vueCommune } from "../src/lib/jardin.js";
import { donnees } from "../src/lib/donnees.js";
const err = [];
if (P.length < 50) err.push(`catalogue trop petit : ${P.length} plantes`);
const ids = new Set();
for (const p of P) { if (ids.has(p.id)) err.push("identifiant en double : " + p.id); ids.add(p.id); if (!p.nom || !p.cat || !p.expo?.length) err.push("fiche incomplète : " + p.id); }
const D = donnees();
const essai = (id, prep) => { try { prep(); const h = pageFor(id); if (h.length < 800) err.push("page trop courte : " + id); } catch (e) { err.push(`page en erreur : ${id} (${e.message})`); } };
for (const id of pagesGenerales()) essai(id, () => id.startsWith("actu-") ? setToulouseRef() : setCommune(null));
// toutes les communes : la page commune doit se construire, avec un climat complet
let n = 0;
for (const c of D.communes) { const clim = D.climats[c.key]; if (!clim || clim.Y.length < 20) { err.push(`climat incomplet : ${c.nom} (${c.code})`); continue; }
  for (const id of pagesCommune(vueCommune(c))) { essai(id, () => setCommune(c, clim)); n++; } }
if (!D.demo && D.communes.length < +(process.env.COMMUNES_MIN ?? 34000)) err.push(`trop peu de communes : ${D.communes.length}`);
if (err.length) { console.error("Contrôle des données : ÉCHEC\n- " + err.join("\n- ")); process.exit(1); }
console.log(`Contrôle des données : OK · ${P.length} plantes · ${D.communes.length} communes · ${n + pagesGenerales().length} pages${D.demo ? " (démo : Toulouse seule)" : ""}`);
