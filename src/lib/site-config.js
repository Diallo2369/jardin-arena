// Réglages du site (lus à la construction)
export const SITE_URL = (process.env.SITE_URL || "https://diallo2369.github.io").replace(/\/$/, "");
// Fermé à Google tant que NOINDEX vaut 1 (valeur par défaut) : passer NOINDEX=0 pour ouvrir
export const NOINDEX = process.env.NOINDEX !== "0";
// Jeton Cloudflare Web Analytics (sans cookie), vide = pas de mesure d'audience
export const CF_BEACON = process.env.CF_BEACON || "";
