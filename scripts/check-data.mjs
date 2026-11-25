// Contrôle avant construction : bloque la publication si le catalogue ou les pages sont anormaux
import { P, allPageIds, pageFor } from "../src/lib/jardin.js";
const err = [];
if (P.length < 50) err.push(`catalogue trop petit : ${P.length} plantes`);
const ids = new Set();
for (const p of P) { if (ids.has(p.id)) err.push("identifiant en double : " + p.id); ids.add(p.id); if (!p.nom || !p.cat || !p.expo?.length) err.push("fiche incomplète : " + p.id); }
for (const id of allPageIds()) { try { const h = pageFor(id); if (h.length < 800) err.push("page trop courte : " + id); } catch (e) { err.push(`page en erreur : ${id} (${e.message})`); } }
if (err.length) { console.error("Contrôle des données : ÉCHEC\n- " + err.join("\n- ")); process.exit(1); }
console.log(`Contrôle des données : OK · ${P.length} plantes · ${allPageIds().length} pages`);
