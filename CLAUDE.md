# Jardin Arena : consignes pour Claude

- Le responsable du projet écrit en français : répondre en français, sans jargon technique.
- Le site est public : demander une validation explicite avant de publier sur `main` des changements visibles (le push déclenche la publication).
- Les sources des données plantes ne sont jamais affichées aux visiteurs (décision du 25/11/2026) : elles vivent dans `data/catalogue/sources.json`. Seules les mentions obligatoires restent (Météo-France, crédits des photos).
- Toute valeur du catalogue doit être sourcée ; sinon elle est marquée « estimation » par le verdict.
- Avant de publier : `npm run build`, puis vérifier l'affichage sur téléphone et ordinateur.
- Décisions produit et sources : documents du projet claude.ai « Argile Arena » (`claude/jardin-arena-*.md`).
