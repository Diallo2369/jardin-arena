// Jardin Arena : interactions dans le navigateur (filtres, Mon jardin, fiche en surimpression)
import { quandSplit, pageFor, pagePlante, byId, url, idFromPath, fixLinks, CATL, shortPort, villeMemo, retenirVille, moisSlug, MOIS_COURANT, W, $ } from "../lib/jardin.js";

const app = $("#app");
const PAGE = app.dataset.page;
const dlg = $("#fiche"), dlgBody = $("#fiche-body"), dlgTags = $("#fiche-tags");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PL = url("plante-x").replace(/x\/$/, "");             // préfixe des fiches plantes
let lastRect = null, closing = false, savedY = 0, ficheId = null;
const base = /^commune-|^fruitiers$/.test(PAGE);            // pages où la fiche s'ouvre en surimpression

// Ville mémorisée : retenue quand on consulte une page de commune
{ const s = (PAGE.match(/^commune-(.+)$/) || PAGE.match(/^que-planter-en-[a-z]+-(.+)$/) || (quandSplit(PAGE)||[]).slice(1) || [])[1]; if (s) retenirVille(s); }

function majLiens() {
  const v = villeMemo();
  document.querySelectorAll("[data-moislien]").forEach(a => a.href = url(`que-planter-en-${moisSlug(MOIS_COURANT)}-${v ? v.slug : "toulouse-31555"}`));
  document.querySelectorAll("a[data-monjardin]").forEach(x => {
    if (v) { x.href = url("commune-" + v.slug); x.onclick = null; }
    else { x.href = url("accueil"); x.onclick = e => { if (typeof W.focusVille === "function") { e.preventDefault(); W.focusVille(); } }; }
  });
}
W.focusVille = () => {
  const i = $("#q1"); if (!i) { location.href = url("accueil") + "#chercher"; return; }
  i.scrollIntoView({ block: "center", behavior: "smooth" }); i.focus({ preventScroll: true });
  const f = i.closest(".search"); if (f) { f.classList.remove("pulse"); void f.offsetWidth; f.classList.add("pulse"); }
};
W.oublierVille = () => { try { localStorage.removeItem("jardinarena-ville"); } catch (e) { } render(); };
W.toggleMenu = (force) => {
  const m = $("#mmenu"), b = document.querySelector(".burger"); const open = force !== undefined ? force : m.hidden;
  m.hidden = !open; b.setAttribute("aria-expanded", open); b.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
};

// Réaffiche la page (réponses « Mon jardin », ville oubliée…) : même rendu qu'à la construction
function render() {
  app.innerHTML = pageFor(PAGE); majLiens();
  if (dlg.open && ficheId) dlgBody.innerHTML = fixLinks(pagePlante(byId(ficheId), true));
}
W.render = render;
// Le rendu de la construction ne connaît ni la ville ni le jardin mémorisés : on rafraîchit si besoin
{ let jardin = {}; try { jardin = JSON.parse(localStorage.getItem("jardinarena-jardin") || "{}"); } catch (e) { }
  if (jardin.expo || jardin.sol || (PAGE === "accueil" && villeMemo())) render(); else majLiens(); }

// Fiche en surimpression
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest(`a[href^="${PL}"]`);
  if (!a || !base || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const id = idFromPath(new URL(a.href).pathname).replace(/^plante-/, "");
  if (!byId(id)) return;
  e.preventDefault(); if (!dlg.contains(a)) lastRect = a.getBoundingClientRect();
  history.pushState({ fiche: id }, "", a.href); openFiche(byId(id));
});
function fillFiche(p) {
  ficheId = p.id;
  dlgTags.innerHTML = `<span class="dtag">${CATL[p.cat]}</span><span class="dtag">${shortPort(p)}</span>`;
  dlgBody.innerHTML = fixLinks(pagePlante(p, true)); dlgBody.scrollTop = 0;
  $("#fiche-full").href = url("plante-" + p.id);
}
function openFiche(p) {
  const wasOpen = dlg.open; fillFiche(p);
  if (wasOpen) { if (!reduce) dlgBody.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "ease-out" }); return; }
  savedY = scrollY; document.documentElement.classList.add("lock"); dlg.showModal();
  if (reduce) return;
  const R = dlg.getBoundingClientRect(), mobile = innerWidth < 700;
  if (lastRect && !mobile) {
    const C = lastRect;
    dlg.animate([{ transformOrigin: "0 0", transform: `translate(${C.left - R.left}px,${C.top - R.top}px) scale(${C.width / R.width},${C.height / R.height})`, opacity: .5, borderRadius: "40px" }, { transformOrigin: "0 0", transform: "none", opacity: 1, borderRadius: "26px" }], { duration: 340, easing: "cubic-bezier(.2,.7,.2,1)" });
    dlgBody.animate([{ opacity: 0 }, { opacity: 0, offset: .45 }, { opacity: 1 }], { duration: 380, easing: "ease-out" });
  } else dlg.animate([{ transform: "translateY(60px)", opacity: .4 }, { transform: "none", opacity: 1 }], { duration: 300, easing: "cubic-bezier(.2,.7,.2,1)" });
  lastRect = null;
}
function closeFiche() {
  if (!dlg.open || closing) return; closing = true; ficheId = null;
  const done = () => { dlg.close(); document.documentElement.classList.remove("lock"); scrollTo(0, savedY); closing = false; };
  if (reduce) return done();
  dlg.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: innerWidth < 700 ? "translateY(60px)" : "scale(.97) translateY(10px)" }], { duration: 180, easing: "ease-in" }).onfinish = done;
}
W.closeFiche = () => { if (history.state && history.state.fiche) history.back(); else closeFiche(); };
addEventListener("popstate", () => { const id = idFromPath(location.pathname); if (id.startsWith("plante-") && byId(id.slice(7))) openFiche(byId(id.slice(7))); else closeFiche(); });
dlg.addEventListener("cancel", e => { e.preventDefault(); W.closeFiche(); });
dlg.addEventListener("click", e => { if (e.target === dlg) W.closeFiche(); });
$("#fiche-full").addEventListener("click", () => { history.replaceState(null, ""); });

// Infobulles des graphiques
const tip = $("#tip");
document.addEventListener("mousemove", e => { const t = e.target.closest && e.target.closest("[data-tip]"); if (t) { tip.textContent = t.dataset.tip; tip.style.opacity = 1; tip.style.left = (e.clientX + 12) + "px"; tip.style.top = (e.clientY - 36) + "px"; } else tip.style.opacity = 0; });
// Tableaux empilés sur mobile : libellé de colonne sur chaque cellule
const lab = () => { for (const c of document.querySelectorAll(".stack td:not([data-l])")) { let i = 0, q = c; while (q = q.previousElementSibling) i += q.colSpan; c.dataset.l = c.closest("table").rows[0].cells[i]?.textContent || ""; } };
lab(); new MutationObserver(lab).observe(app, { childList: true, subtree: true });
if (location.hash === "#chercher") setTimeout(W.focusVille, 80);
