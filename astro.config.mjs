import { defineConfig } from "astro/config";
// SITE_URL : adresse publique ; BASE_PATH : sous-dossier (aperçu GitHub Pages sans domaine), vide avec le domaine
export default defineConfig({
  site: process.env.SITE_URL || "https://diallo2369.github.io",
  base: process.env.BASE_PATH ?? "/jardin-arena",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "never" },
  compressHTML: true
});
