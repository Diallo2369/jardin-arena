# Jardin Arena

« Que planter dans mon jardin ? » Pour chaque commune : les arbres fruitiers, légumes, aromatiques et arbustes qui réussiront, et quand les planter, d'après le climat relevé par Météo-France et les cartes officielles des sols.

Site 100 % statique (Astro), publié par GitHub Actions sur GitHub Pages, comme Argile Arena.

## Où modifier quoi

| Fichier | Contenu |
| --- | --- |
| `src/lib/jardin.js` | Catalogue des plantes, climat de la commune, règles du verdict, rendu de toutes les pages (partagé entre la construction et le navigateur) |
| `src/scripts/app.js` | Interactions dans le navigateur : filtres, « Mon jardin », fiche en surimpression, ville mémorisée |
| `src/layouts/Base.astro` | En-tête, pied de page, balises de référencement |
| `src/styles/site.css` | Design |
| `data/catalogue/sources.json` | Sources de chaque valeur du catalogue (interne : jamais affichées sur le site) |
| `scripts/check-data.mjs` | Contrôle avant construction : bloque la publication si une page plante |
| `scripts/postbuild.mjs` | Plan du site, robots.txt, CNAME |

## Commandes

```
npm ci
npm run dev      # aperçu local
npm run build    # contrôle + construction dans dist/
```

## Réglages (variables du dépôt GitHub)

| Variable | Défaut | Rôle |
| --- | --- | --- |
| `SITE_URL` | `https://diallo2369.github.io` | Adresse publique |
| `BASE_PATH` | `/jardin-arena` tant que `SITE_URL` n'est pas défini, vide ensuite | Sous-dossier de l'aperçu |
| `NOINDEX` | `1` | Site fermé à Google ; `0` pour ouvrir |
| `CF_BEACON` | vide | Jeton Cloudflare Web Analytics (sans cookie) |

## État

Version de travail : Toulouse seulement (climat de la station Toulouse-Blagnac, 1995-2024). Prochaines étapes : climat et sol de toutes les communes de France, catalogue élargi, mentions légales.
