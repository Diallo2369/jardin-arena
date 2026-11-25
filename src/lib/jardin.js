// Jardin Arena : données, verdicts et rendu des pages (partagé entre la construction et le navigateur)
const PHOTOS={"figuier-brown-turkey": {"src": "/photos/figuier-brown-turkey.jpg", "auteur": "Daniel Capilla", "licence": "CC BY-SA 4.0", "licurl": "https://creativecommons.org/licenses/by-sa/4.0", "lien": "https://commons.wikimedia.org/wiki/File:Ficus_carica_leaves_and_fruits.jpg"}, "pommier-reine-des-reinettes": {"src": "/photos/pommier-reine-des-reinettes.jpg", "auteur": "Emőke Dénes", "licence": "CC BY-SA 4.0", "licurl": "https://creativecommons.org/licenses/by-sa/4.0", "lien": "https://commons.wikimedia.org/wiki/File:Rosales_-_Malus_domestica_-_16.jpg"}, "tomate-coeur-de-boeuf": {"src": "/photos/tomate-coeur-de-boeuf.jpg", "auteur": "Ton Rulkens", "licence": "CC BY-SA 2.0", "licurl": "https://creativecommons.org/licenses/by-sa/2.0", "lien": "https://commons.wikimedia.org/wiki/File:Red_tomato_(6951842889).jpg"}, "lavande": {"src": "/photos/lavande.jpg", "auteur": "Laslovarga", "licence": "CC BY-SA 4.0", "licurl": "https://creativecommons.org/licenses/by-sa/4.0", "lien": "https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_(3).jpg"}};
const VERIF={"pommier-reine-des-reinettes": ["flor", "pollin", "recolte", "rust", "taille"], "pommier-golden": ["flor", "gout", "pollin", "recolte"], "poirier-williams": ["calc", "flor", "florDoy", "gout", "pollin", "recolte", "rust", "sensible"], "cerisier-burlat": ["calc", "flor", "florDoy", "pollin", "recolte", "rust", "taille"], "poirier-conference": ["calc", "flor", "florDoy", "gout", "pollin", "recolte", "rust"], "cerisier-stella": ["calc", "pollin", "sensible", "taille"], "abricotier-bergeron": ["flor", "florDoy", "gout", "pollin", "recolte", "rust", "sensible", "taille"], "abricotier-rouge-roussillon": ["flor", "pollin", "recolte", "rust", "taille"], "pecher-reine-des-vergers": ["calc", "flor", "florDoy", "gout", "pollin", "recolte", "sensible"], "prunier-reine-claude-oullins": ["flor", "pollin", "recolte", "rust", "taille"], "amandier-ferragnes": ["flor", "florDoy", "pollin", "recolte", "sech"], "figuier-brown-turkey": ["pollin", "recolte", "rust", "taille"], "kiwi-hayward": ["calc", "flor", "pollin", "recolte", "taille"], "kiwi-tomuri": ["calc", "flor", "pollin", "rust", "taille"], "framboisier-heritage": ["flor", "gout", "pollin", "recolte", "rust", "taille"], "groseillier": ["expo", "pollin", "recolte", "rust", "taille"], "myrtillier": ["calc", "flor", "pollin", "recolte", "rust", "sol", "taille"], "noisetier": ["flor", "pollin", "recolte"], "vigne-chasselas": ["gout", "pollin", "recolte", "rust", "taille"], "kaki": ["flor", "gout", "mise_a_fruit", "pollin", "recolte", "rust", "taille"], "grenadier": ["flor", "pollin", "recolte", "rust", "taille"], "jujubier-li": ["gout", "pollin", "recolte", "rust", "sech", "taille"], "feijoa-coolidge": ["flor", "pollin", "recolte", "rust", "taille"], "pommier-court-pendu-gris": ["flor", "gout", "pollin", "recolte", "sensible"], "pommier-pendragon": ["gout", "recolte", "rust", "taille"], "abricotier-noir-blackforest": ["flor", "gout", "pollin", "recolte", "taille"], "olivier": ["flor", "pollin", "recolte", "rust"], "chayotte": ["eau", "expo", "recolte", "sol", "taille"], "poivron": ["eau", "expo", "recolte", "semis", "sol", "taille"], "concombre": ["eau", "expo", "recolte", "semis", "sol", "taille"], "melon": ["eau", "expo", "recolte", "semis", "sol", "taille"], "carotte": ["eau", "expo", "recolte", "semis", "sol", "sol_lourd", "taille"], "radis": ["eau", "expo", "recolte", "semis", "sol", "taille"], "pomme-de-terre": ["eau", "expo", "plant", "recolte", "sol"], "oignon": ["eau", "expo", "recolte", "semis", "sol", "taille"], "tomate-coeur-de-boeuf": ["eau", "expo", "semis", "sol", "taille"], "courgette": ["eau", "expo", "recolte", "semis", "sol", "taille"], "courge-butternut": ["eau", "expo", "recolte", "semis", "sol", "taille"], "haricot-a-rames": ["eau", "expo", "recolte", "sol", "taille"], "haricot-nain": ["eau", "expo", "recolte", "sol", "taille"], "laitue": ["eau", "expo", "recolte", "semis", "sol", "taille"], "epinard": ["eau", "expo", "recolte", "semis", "sol", "taille"], "ail": ["eau", "expo", "plant", "recolte", "sol", "taille"], "aubergine": ["eau", "expo", "recolte", "semis", "sol", "taille"], "poireau": ["eau", "expo", "recolte", "semis", "sol", "taille"], "fraisier": ["eau", "expo", "plant", "recolte", "sol", "taille"], "rhubarbe": ["eau", "expo", "plant", "recolte", "sol"], "basilic": ["eau", "expo", "recolte", "semis", "sol", "taille"], "thym": ["eau", "expo", "semis", "sol"], "menthe": ["eau", "expo", "plant", "recolte", "sensible", "sol"], "persil": ["eau", "expo", "recolte", "semis", "sol"], "lavande": ["calc", "eau", "expo", "rust", "semis", "sol"], "arbre-de-judee": ["rust", "sech", "sol", "taille"], "hortensia": ["calc", "expo", "rust", "sol", "taille"], "arbre-a-papillons": ["invasive"], "tomate-cerise": ["eau", "expo", "plant", "recolte", "semis", "sol"]};
/* ===================== DONNÉES CLIMAT (réelles) ===================== */
// Station Toulouse-Blagnac (31069001, 151 m), Météo-France, données quotidiennes 1995-2024.
// Par année : [année, jour du dernier gel de printemps (TN<=0, janv-juin), premier gel d'automne, TN minimale, jours TX>=30, jours TX>=35, jours de gel, pluie juin-août, pluie annuelle, nuits TN>=20]
const REF_Y=[[1995,112,309,-6.3,23,0,29,137,628,9],[1996,96,321,-6.1,28,0,25,148,729,4],[1997,47,304,-3.4,25,2,21,212,546,12],[1998,104,311,-7,22,4,31,74,510,5],[1999,60,325,-5.6,31,1,29,77,612,7],[2000,66,366,-5.9,26,0,26,229,729,9],[2001,58,314,-9.7,25,3,28,196,645,5],[2002,21,null,-3.2,19,0,10,211,693,1],[2003,50,298,-6.5,66,24,29,67,479,31],[2004,71,347,-4.4,27,2,27,112,766,12],[2005,73,323,-8.4,32,4,60,89,474,12],[2006,73,348,-5,37,10,35,139,625,19],[2007,35,294,-6.9,15,2,29,114,589,6],[2008,66,332,-4.5,25,4,15,157,720,4],[2009,84,292,-5.3,43,4,29,75,586,18],[2010,75,321,-7.6,29,4,53,121,596,10],[2011,65,353,-6.5,34,4,20,150,423,11],[2012,70,303,-12.5,49,11,37,109,436,12],[2013,75,330,-6.2,35,1,32,132,739,16],[2014,48,344,-5,19,0,10,238,689,2],[2015,65,327,-4.7,41,7,26,205,511,16],[2016,68,337,-2.3,37,2,16,142,577,8],[2017,26,319,-6.7,40,7,26,123,562,22],[2018,81,365,-6.9,51,4,13,139,690,16],[2019,44,324,-5.3,53,11,13,135,626,22],[2020,37,326,-2.8,43,10,9,116,625,18],[2021,79,334,-6,25,2,21,161,594,13],[2022,95,338,-6.1,71,24,28,63,397,34],[2023,66,330,-3.8,60,12,26,177,601,26],[2024,21,351,-5.4,39,7,10,139,607,21]];
// Moyennes mensuelles 1995-2024 : [mois, TN moy, TX moy, pluie moy (mm)]
const REF_M=[[1,3,9.8,57],[2,3.4,11.6,36],[3,5.7,15.1,47],[4,8.1,17.9,59],[5,11.6,21.6,69],[6,15.4,26.2,57],[7,17.2,28.5,39],[8,17.2,28.7,43],[9,14.1,25.1,38],[10,11.3,20.5,52],[11,6.3,13.7,55],[12,3.6,10.6,48]];
// Dernier jour de janvier à juin avec TN <= -2 °C (gel pouvant abîmer les fleurs) ; 0 = aucun
const REF_G={1995:16,1996:72,1997:47,1998:38,1999:45,2000:26,2001:33,2002:18,2003:49,2004:71,2005:72,2006:73,2007:30,2008:34,2009:51,2010:70,2011:38,2012:54,2013:59,2014:0,2015:41,2016:48,2017:26,2018:59,2019:35,2020:20,2021:19,2022:94,2023:60,2024:21};
const SSR=typeof document==="undefined";   // rendu à la construction : pages allégées, le navigateur complète l'affichage
const TOULOUSE_REF={slug:"toulouse-31555",nom:"Toulouse",insee:"31555",cp:"31000",dep:"Haute-Garonne",depCode:"31",station:"Toulouse-Blagnac (151 m d'altitude, à 6 km du centre)",argile:{moyenOuFort:98,fort:38},sols:{tendance:"mixte",resume:"calcaire sur les coteaux (terreforts), plutôt acide sur les terrasses de la Garonne (boulbènes)"}};
let YEARS=REF_Y, MONTHS=REF_M, GEL2=REF_G, COM=null;


/* ===================== ADRESSES ===================== */
const BASE=((typeof import.meta!=="undefined"&&import.meta.env&&import.meta.env.BASE_URL)||"/").replace(/\/$/,"");
const SLUG_RE="((?:[a-z0-9]+-)*[0-9][0-9abAB][0-9]{3})";
function url(h){ let m; h=(h||"").replace(/^#/,"");
  if(!h||h==="accueil") return BASE+"/";
  if((m=h.match(/^commune-(.+)$/))) return `${BASE}/que-planter/${m[1]}/`;
  if((m=h.match(/^plante-(.+)$/))) return `${BASE}/plantes/${m[1]}/`;
  if((m=h.match(new RegExp("^que-planter-en-([a-z]+)-"+SLUG_RE+"$")))) return `${BASE}/que-planter/${m[2]}/${m[1]}/`;
  if((m=quandSplit(h))) return `${BASE}/quand-planter/${m[1]}/${m[2]}/`;
  if(h==="fruitiers") return `${BASE}/arbres-fruitiers/`;
  if(h==="guides"||h==="actualites") return `${BASE}/guides/`;
  if((m=h.match(/^actu-(.+)$/))) return `${BASE}/guides/${m[1]}/`;
  if(h==="a-propos"||h==="methode") return `${BASE}/a-propos/`;
  return null; }
function quandSplit(h){ if(!h.startsWith("quand-planter-"))return null; const r=h.slice(14); const k=Object.keys(ESPECES).sort((a,b)=>b.length-a.length).find(k=>r.startsWith(k+"-")); return k?[h,k,r.slice(k.length+1)]:null; }
function idFromPath(p){ let m; p=p.replace(BASE,"").replace(/index\.html$/,"");
  if(p==="/"||p==="") return "accueil";
  if((m=p.match(/^\/que-planter\/([^/]+)\/([a-z]+)\/$/))) return `que-planter-en-${m[2]}-${m[1]}`;
  if((m=p.match(/^\/que-planter\/([^/]+)\/$/))) return `commune-${m[1]}`;
  if((m=p.match(/^\/quand-planter\/([^/]+)\/([^/]+)\/$/))) return `quand-planter-${m[1]}-${m[2]}`;
  if((m=p.match(/^\/plantes\/([^/]+)\/$/))) return `plante-${m[1]}`;
  if(p==="/arbres-fruitiers/") return "fruitiers";
  if(p==="/guides/") return "guides";
  if((m=p.match(/^\/guides\/([^/]+)\/$/))) return `actu-${m[1]}`;
  if(p==="/a-propos/") return "a-propos";
  return "accueil"; }
const fixLinks=html=>html.replace(/href="#([^"]+)"/g,(m,h)=>{const u=url(h);return u?`href="${u}"`:m;});

/* ===================== CATALOGUE (maquette, valeurs à sourcer) ===================== */
// expo: soleil | mi-ombre | ombre ; rust: froid supporté (°C, plante installée) ; sech/chal: tolérance 1 faible 2 moyenne 3 forte
// argile: 0 craint les sols lourds et humides, 1 avec précautions, 2 bien ; mois: 1-12 ; florDoy: début de floraison indicatif dans le Sud-Ouest (jour de l'année)
const P=[
 {id:"pommier-reine-des-reinettes",cat:"fruitier",nom:"Pommier",variete:"Reine des reinettes",expo:["soleil","mi-ombre"],rust:-25,sech:2,chal:2,argile:2,froid:"élevé",
  pollin:{type:"autosterile",avec:["pommier-golden", "Melrose", "Idared"],note:"Pas autofertile : plantez un pommier en fleur au même moment (Golden, Melrose ou Idared)."},flor:[4],florDoy:95,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[9,10],
  port:"Arbre",taille:"2 à 3 m sur porte-greffe nanisant (M9), 4 à 5 m sur M106, 6 à 8 m sur franc",gout:"Chair ferme, sucrée et acidulée, très parfumée",usage:"À croquer, tartes, compotes",cons:"Jusqu'en janvier",sensible:"Tavelure (modérée)"},
 {id:"pommier-golden",cat:"fruitier",nom:"Pommier",variete:"Golden Delicious",expo:["soleil"],rust:-25,sech:2,chal:2,argile:2,froid:"élevé",
  pollin:{type:"autosterile",avec:["pommier-reine-des-reinettes", "Granny Smith", "Melrose"],note:"Pas autofertile : plantez Reine des reinettes, Granny Smith ou Melrose à côté. Excellent pollinisateur des autres pommiers."},flor:[4],florDoy:95,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[9,10],
  port:"Arbre",taille:"2 à 3 m sur M9, 4 à 5 m sur M106",gout:"Douce, sucrée, peu acidulée",usage:"À croquer, cuisson",cons:"Jusqu'en mars",sensible:"Tavelure"},
 {id:"poirier-williams",calc:"craint",calcNote:"Sur sol calcaire, choisissez un poirier greffé sur franc plutôt que sur cognassier.",cat:"fruitier",nom:"Poirier",variete:"Williams",expo:["soleil"],rust:-20,sech:2,chal:2,argile:2,froid:"moyen",
  pollin:{type:"autosterile",avec:["poirier-conference", "Doyenné du Comice"],note:"Pas autofertile : plantez un Conférence ou un Doyenné du Comice à côté."},flor:[4],florDoy:92,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[8,9],
  port:"Arbre",taille:"3 à 4 m sur cognassier, 6 à 8 m sur franc",gout:"Fondante, juteuse, musquée",usage:"À croquer, conserves",cons:"Courte (2 à 3 semaines)",sensible:"Feu bactérien"},
 {id:"poirier-conference",calc:"craint",calcNote:"Sur sol calcaire, choisissez un poirier greffé sur franc plutôt que sur cognassier.",cat:"fruitier",nom:"Poirier",variete:"Conférence",expo:["soleil"],rust:-20,sech:2,chal:2,argile:2,froid:"moyen",
  pollin:{type:"autosterile",avec:["poirier-williams", "Doyenné du Comice", "Général Leclerc"],note:"Pas autofertile : plantez un autre poirier qui fleurit en même temps. Particularité : il est parthénocarpe, il donne quelques poires sans pépins même mal pollinisé."},flor:[4],florDoy:92,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[9,10],
  port:"Arbre",taille:"3 à 4 m sur cognassier",gout:"Fondante, sucrée",usage:"À croquer",cons:"Jusqu'en décembre",sensible:"Peu sensible"},
 {id:"cerisier-burlat",calc:"aime",cat:"fruitier",nom:"Cerisier",variete:"Burlat",expo:["soleil"],rust:-20,sech:2,chal:2,argile:1,froid:"moyen",
  pollin:{type:"autosterile",avec:["cerisier-stella", "Van", "Rainier"],note:"Pas autofertile : plantez un autre cerisier compatible à moins de 15 m (Stella, Van, Rainier…)."},flor:[4],florDoy:105,florGroupe:"moyenne (vers le 15 avril)",plant:[11,12,1,2,3],recolte:[5],
  port:"Arbre",taille:"3 à 4 m sur porte-greffe Gisela 5, 8 à 10 m sur franc",gout:"Grosse cerise rouge, juteuse",usage:"À croquer",cons:"Quelques jours",sensible:"Craint l'eau stagnante au pied"},
 {id:"cerisier-stella",calc:"aime",cat:"fruitier",nom:"Cerisier",variete:"Stella",expo:["soleil"],rust:-25,sech:2,chal:2,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile, et pollinisateur reconnu de nombreux cerisiers doux."},flor:[4],florDoy:85,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[6,7],
  port:"Arbre",taille:"2,5 à 4 m",gout:"Rouge foncé, ferme et sucrée",usage:"À croquer, clafoutis",cons:"Quelques jours",sensible:"Fruits qui éclatent par temps de pluie"},
 {id:"abricotier-bergeron",cat:"fruitier",nom:"Abricotier",variete:"Bergeron",expo:["soleil"],rust:-20,sech:3,chal:3,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile : un seul arbre suffit."},flor:[3],florDoy:79,florGroupe:"tardive pour un abricotier",plant:[11,12,1,2,3],recolte:[7],
  port:"Arbre",taille:"4 à 5 m",gout:"Ferme, acidulé, très parfumé",usage:"À croquer, confitures",cons:"Une semaine",sensible:"Moniliose"},
 {id:"abricotier-rouge-roussillon",cat:"fruitier",nom:"Abricotier",variete:"Rouge du Roussillon",expo:["soleil"],rust:-20,sech:3,chal:3,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile : un seul arbre suffit."},flor:[3],florDoy:65,florGroupe:"précoce",plant:[11,12,1,2,3],recolte:[7],
  port:"Arbre",taille:"4 à 5 m",gout:"Juteux, sucré, coloré",usage:"À croquer, confitures",cons:"Quelques jours",sensible:"Gel des fleurs, moniliose"},
 {id:"pecher-reine-des-vergers",calc:"craint",calcNote:"Sur sol calcaire, choisissez un pêcher greffé sur pêcher × amandier (GF 677) ou sur prunier Saint-Julien.",cat:"fruitier",nom:"Pêcher",variete:"Reine des vergers",expo:["soleil"],rust:-20,sech:2,chal:3,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile."},flor:[3],florDoy:85,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[8],
  port:"Arbre",taille:"3 à 4 m",gout:"Chair blanche, juteuse",usage:"À croquer",cons:"Quelques jours",sensible:"Peu sensible à la cloque et à l'oïdium"},
 {id:"prunier-reine-claude-oullins",cat:"fruitier",nom:"Prunier",variete:"Reine-Claude d'Oullins",expo:["soleil","mi-ombre"],rust:-20,sech:2,chal:2,argile:2,froid:"moyen",
  pollin:{type:"partiel",avec:[],note:"Autofertile, mais plus productif avec un autre prunier à proximité."},flor:[4],florDoy:85,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[7,8],
  port:"Arbre",taille:"2,5 à 4 m selon le porte-greffe, jusqu'à 7 m",gout:"Jaune doré, sucrée",usage:"À croquer, tartes, confitures",cons:"Une semaine",sensible:"Peu sensible"},
 {id:"amandier-ferragnes",cat:"fruitier",nom:"Amandier",variete:"Ferragnès",expo:["soleil"],rust:-20,sech:3,chal:3,argile:1,froid:"faible",
  pollin:{type:"autosterile",avec:["Ferraduel", "Aï", "Texas"],note:"Pas autofertile : plantez un Ferraduel, un Aï ou un Texas à côté."},flor:[3],florDoy:62,florGroupe:"tardive pour un amandier",plant:[11,12,1,2],recolte:[9],
  port:"Arbre",taille:"4 à 6 m",gout:"Amande douce",usage:"Amandes sèches",cons:"Un an et plus",sensible:"Gel des fleurs"},
 {id:"figuier-brown-turkey",cat:"fruitier",nom:"Figuier",variete:"Brown Turkey",expo:["soleil"],rust:-15,sech:3,chal:3,argile:2,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Pas besoin de pollinisateur : les figues se forment sans fécondation."},flor:[],florDoy:null,florGroupe:"—",plant:[3,4,10],recolte:[7,8,9],
  port:"Arbre ou grand arbuste",taille:"3 à 5 m",gout:"Violette, sucrée",usage:"À croquer, confitures",cons:"Quelques jours",sensible:"Peu sensible"},
 {id:"olivier",cat:"fruitier",nom:"Olivier",variete:"Aglandau",expo:["soleil"],rust:-12,sech:3,chal:3,argile:0,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Autofertile ; une 2e variété à proximité améliore la récolte."},flor:[5,6],florDoy:140,florGroupe:"—",plant:[3,4,5],recolte:[11,12],
  port:"Arbre",taille:"4 à 8 m, croissance lente",gout:"Olives à préparer",usage:"Olives de table",cons:"—",sensible:"Craint l'eau stagnante"},
 {id:"kiwi-hayward",calc:"craint",calcNote:"Préfère une terre neutre à légèrement acide ; en sol calcaire, ajoutez de la terre de bruyère à la plantation.",cat:"fruitier",nom:"Kiwi",variete:"Hayward (femelle)",expo:["soleil","mi-ombre"],rust:-15,sech:1,chal:2,argile:1,froid:"moyen",
  pollin:{type:"autosterile",avec:["kiwi-tomuri"],note:"Pied femelle : sans un pied mâle à proximité, aucun fruit."},flor:[6],florDoy:155,florGroupe:"—",plant:[3,4,10,11],recolte:[10,11],
  port:"Liane grimpante (palissage solide)",taille:"6 à 8 m de long",gout:"Acidulé, sucré",usage:"À croquer",cons:"Plusieurs mois au frais",sensible:"Craint le vent et la sécheresse"},
 {id:"kiwi-tomuri",calc:"craint",calcNote:"Préfère une terre neutre à légèrement acide ; en sol calcaire, ajoutez de la terre de bruyère à la plantation.",cat:"fruitier",nom:"Kiwi",variete:"Tomuri (mâle)",expo:["soleil","mi-ombre"],rust:-15,sech:1,chal:2,argile:1,froid:"moyen",
  pollin:{type:"male",avec:["kiwi-hayward"],note:"Pied mâle : ne donne pas de fruits, sert à polliniser les pieds femelles qui fleurissent en même temps."},flor:[5,6],florDoy:155,florGroupe:"—",plant:[3,4,10,11],recolte:[],
  port:"Liane grimpante",taille:"6 à 8 m de long",gout:"—",usage:"Pollinisateur",cons:"—",sensible:"—"},
 {id:"framboisier-heritage",cat:"fruitier",nom:"Framboisier",variete:"Heritage (remontant)",expo:["soleil","mi-ombre"],rust:-20,sech:1,chal:1,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile."},flor:[5,6,7,8],florDoy:null,florGroupe:"—",plant:[10,11,12,2,3],recolte:[8,9,10,11],
  port:"Arbuste à cannes, palissé",taille:"1,5 m",gout:"Rouge, parfumée",usage:"À croquer, confitures",cons:"1 à 2 jours",sensible:"Craint la chaleur sèche"},
 {id:"groseillier",cat:"fruitier",nom:"Groseillier",variete:"Junifer",expo:["soleil","mi-ombre"],rust:-25,sech:1,chal:1,argile:2,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile."},flor:[4],florDoy:95,florGroupe:"moyenne",plant:[11,12,1,2,3],recolte:[6,7],
  port:"Arbuste",taille:"1 à 1,5 m",gout:"Grappes rouges, acidulées",usage:"Gelées, desserts",cons:"Quelques jours",sensible:"Craint les étés brûlants"},
 {id:"myrtillier",calc:"acide",cat:"fruitier",nom:"Myrtillier",variete:"Bluecrop",expo:["soleil","mi-ombre"],rust:-25,sech:1,chal:2,argile:0,froid:"élevé",
  pollin:{type:"autofertile",avec:[],note:"Autofertile ; deux pieds ou plus améliorent la récolte."},flor:[4,5],florDoy:100,florGroupe:"moyenne",plant:[10,11,3],recolte:[7,8],
  port:"Arbuste",taille:"1,5 m",gout:"Baies bleues, douces et parfumées",usage:"À croquer, pâtisserie",cons:"Une semaine au frais",sensible:"Exige une terre acide : en bac de terre de bruyère dans la plupart des jardins"},
 {id:"noisetier",cat:"fruitier",nom:"Noisetier",variete:"Fertile de Coutard",expo:["soleil","mi-ombre"],rust:-25,sech:2,chal:2,argile:2,froid:"moyen",
  pollin:{type:"autosterile",avec:["Un noisetier d'une autre variété (ex. Merveille de Bollwiller)"],note:"Autostérile : il faut un deuxième noisetier d'une autre variété, fleurissant en même temps."},flor:[1,2],florDoy:null,florGroupe:"hivernale",plant:[11,12,1,2,3],recolte:[9],
  port:"Arbuste en cépée",taille:"4 à 5 m",gout:"Noisette fine",usage:"Sèche, pâtisserie",cons:"Plusieurs mois",sensible:"Balanin (ver de la noisette)"},
 {id:"vigne-chasselas",cat:"fruitier",nom:"Vigne de table",variete:"Chasselas doré",expo:["soleil"],rust:-15,sech:3,chal:3,argile:1,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Autofertile."},flor:[5,6],florDoy:140,florGroupe:"tardive",plant:[11,12,1,2,3],recolte:[8,9],
  port:"Liane grimpante (treille, pergola)",taille:"Palissée, 2 à 5 m",gout:"Grains dorés, sucrés, juteux",usage:"Raisin de table",cons:"Une à deux semaines",sensible:"Oïdium, mildiou"},
 {id:"kaki",cat:"fruitier",nom:"Plaqueminier (kaki)",variete:"Fuyu",expo:["soleil"],rust:-15,sech:2,chal:3,argile:2,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Autofertile : un seul arbre suffit."},flor:[5,6],florDoy:135,florGroupe:"tardive",plant:[11,12,2,3],recolte:[10,11],
  port:"Arbre",taille:"4 à 8 m (jusqu'à 10 m) sur porte-greffe Diospyros lotus",gout:"Chair ferme et sucrée, se croque comme une pomme",usage:"À croquer",cons:"Quelques semaines",sensible:"Peu sensible"},
 {id:"grenadier",cat:"fruitier",nom:"Grenadier",variete:"À fruits",expo:["soleil"],rust:-12,sech:3,chal:3,argile:1,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Autofertile."},flor:[6,7],florDoy:165,florGroupe:"estivale",plant:[3,4,5],recolte:[9,10,11],
  port:"Arbuste",taille:"3 à 5 m",gout:"Grains acidulés et sucrés",usage:"Jus, salades",cons:"Plusieurs semaines",sensible:"Mûrit mal si l'été est frais"},
 {id:"jujubier-li",cat:"fruitier",nom:"Jujubier",variete:"Li",expo:["soleil"],rust:-15,sech:3,chal:3,argile:2,froid:"faible",
  pollin:{type:"autofertile",avec:["Lang"],note:"Autofertile ; un 'Lang' à proximité augmente la récolte."},flor:[6,7],florDoy:160,florGroupe:"tardive (début d'été)",plant:[11,12,1,2,3],recolte:[9,10,11],
  port:"Arbre ou grand arbuste épineux",taille:"6 à 6,5 m",gout:"Croquant et sucré comme une petite pomme, puis goût de datte une fois ridé",usage:"Frais, séché, confitures",cons:"Quelques jours frais, des mois séché",sensible:"Rejets au pied ; démarre tard au printemps"},
 {id:"feijoa-coolidge",cat:"fruitier",nom:"Feijoa",variete:"Coolidge",expo:["soleil","mi-ombre"],rust:-12,sech:2,chal:3,argile:1,froid:"faible",
  pollin:{type:"autofertile",avec:[],note:"Autofertile, mais la récolte est meilleure avec un deuxième feijoa d'une autre variété."},flor:[6],florDoy:160,florGroupe:"tardive (juin)",plant:[3,4,9,10],recolte:[10],
  port:"Arbuste persistant",taille:"2 à 4 m",gout:"Parfumé, entre ananas, goyave et fraise",usage:"À la cuillère, confitures",cons:"Une à deux semaines",sensible:"Fruits tardifs : une gelée précoce d'automne peut gâcher la fin de récolte"},
 {id:"pommier-court-pendu-gris",cat:"fruitier",rare:"Variété ancienne",nom:"Pommier",variete:"Court-Pendu Gris",expo:["soleil"],rust:-25,sech:2,chal:2,argile:2,froid:"élevé",
  pollin:{type:"partiel",avec:["Api rouge"],note:"Annoncé autofertile ; un Api rouge à proximité améliore la récolte."},flor:[4],florDoy:105,florGroupe:"très tardive (mi-avril)",plant:[11,12,1,2,3],recolte:[10],
  port:"Arbre",taille:"Selon le porte-greffe",gout:"Croquante, fine, très sucrée, parfum de cannelle",usage:"Frais, pâtisserie, compote",cons:"De novembre à avril",sensible:"Résiste très bien à la tavelure"},
 {id:"pommier-pendragon",cat:"fruitier",rare:"Variété rare",nom:"Pommier",variete:"Pendragon",expo:["soleil"],rust:-20,sech:2,chal:2,argile:2,froid:"élevé",
  pollin:{type:"inconnu",avec:[],note:"Pollinisation à vérifier sur sources avant publication."},flor:[],florDoy:null,florGroupe:"à sourcer",plant:[11,12,1,2,3],recolte:[8],
  port:"Arbre",taille:"5 m sur porte-greffe M106 (jusqu'à 8 m)",gout:"Chair marbrée de rouge et de blanc, douce et sucrée",usage:"À croquer",cons:"—",sensible:"—"},
 {id:"abricotier-noir-blackforest",cat:"fruitier",rare:"Fruit original",nom:"Abricotier noir",variete:"BlackForest®",expo:["soleil"],rust:-20,sech:2,chal:3,argile:1,froid:"moyen",
  pollin:{type:"autofertile",avec:[],note:"Autofertile selon la fiche technique du pépiniériste, qui conseille quand même un prunier ou un abricotier à proximité."},flor:[3,4],florDoy:null,florGroupe:"plus tardive que les abricotiers classiques",plant:[11,12,1,2,3],recolte:[7],
  port:"Arbre, vigueur moyenne",taille:"3 à 4 m (porte-greffe myrobolan)",gout:"Goût d'abricot, chair rougeâtre ; peau violette à presque noire",usage:"Cru ou en dessert",cons:"Courte",sensible:"Croisement naturel prunier × abricotier, dit résistant aux maladies ; rusticité non indiquée : à sourcer"},
 {id:"chayotte",cat:"legume",nom:"Chayotte",variete:"Verte",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[],plant:[5],recolte:[10,11],port:"Grimpante vigoureuse : grillage ou pergola solide",taille:"Tiges de 6 à 10 m",gout:"Croquante, goût doux entre courgette et concombre",usage:"Crue en salade, cuite, en gratin",sensible:"Il lui faut une longue saison chaude : on plante le fruit entier, germé",pollin:{type:"insectes",avec:[],note:"Pollinisée par les insectes."},eau:"Abondant",cons:"Plusieurs semaines"},
 {id:"poivron",cat:"legume",nom:"Poivron",variete:"Rouge long",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[3,4,5],plant:[5],recolte:[7,8,9,10],port:"Buissonnant, tuteur court",taille:"60 à 80 cm",gout:"Charnu, sucré à maturité",usage:"Cru, grillé",sensible:"Pucerons",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"concombre",cat:"legume",nom:"Concombre",variete:"Long vert",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[3,4,5],plant:[5,6],recolte:[6,7,8,9],port:"Coureur ou palissé sur filet",taille:"Tiges de 1 à 1,5 m",gout:"Frais, croquant",usage:"Salade",sensible:"Oïdium",pollin:{type:"insectes",avec:[],note:"Pollinisé par les insectes."},eau:"Abondant"},
 {id:"melon",cat:"legume",nom:"Melon",variete:"Charentais",expo:["soleil"],tendre:true,sech:2,chal:3,argile:1,
  semis:[3,4,5],plant:[5],recolte:[6,7,8,9],port:"Coureur",taille:"Tiges de 1,5 m",gout:"Sucré, très parfumé",usage:"Dessert, entrée",sensible:"Oïdium ; craint l'humidité au pied",pollin:{type:"insectes",avec:[],note:"Pollinisé par les insectes."},eau:"Modéré"},
 {id:"carotte",cat:"legume",nom:"Carotte",variete:"Nantaise",expo:["soleil","mi-ombre"],rustL:-5,sech:1,chal:2,argile:0,
  semis:[3,4,5,6,7],plant:[],recolte:[7,8,9,10,11],port:"Racine",taille:"30 cm",gout:"Sucrée, tendre",usage:"Crue, cuite",sensible:"Racines fourchues en terre lourde",pollin:{type:"sans",avec:[],note:"Récoltée avant floraison."},eau:"Régulier"},
 {id:"radis",cat:"legume",nom:"Radis",variete:"De 18 jours",expo:["soleil","mi-ombre"],rustL:-3,sech:1,chal:1,argile:1,
  semis:[2,3,4,5,6,7,8,9],plant:[],recolte:[3,4,5,6,7,8,9],port:"Racine",taille:"20 cm",gout:"Piquant doux",usage:"Cru",sensible:"Devient creux et fort par chaleur",pollin:{type:"sans",avec:[],note:"Récolté avant floraison."},eau:"Régulier"},
 {id:"pomme-de-terre",cat:"legume",nom:"Pomme de terre",variete:"Charlotte",expo:["soleil"],rustL:-1,sech:1,chal:2,argile:1,
  semis:[],plant:[4,5],recolte:[8,9,10],port:"Touffe, buttée",taille:"60 cm",gout:"Chair ferme, fondante",usage:"Vapeur, salade",sensible:"Mildiou, doryphores",pollin:{type:"sans",avec:[],note:"Plantée en tubercules."},eau:"Régulier"},
 {id:"oignon",cat:"legume",nom:"Oignon",variete:"Jaune paille",expo:["soleil"],rustL:-10,hiver:true,sech:2,chal:3,argile:1,
  semis:[2,3,4],plant:[3,4,10],recolte:[7,8],port:"Bulbe",taille:"30 cm",gout:"Doux à piquant",usage:"Condiment, cuisson",sensible:"Mildiou",pollin:{type:"sans",avec:[],note:"Planté en bulbilles."},eau:"Faible",cons:"Plusieurs mois"},
 {id:"tomate-coeur-de-boeuf",cat:"legume",nom:"Tomate",variete:"Cœur de bœuf",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[2,3,4],plant:[5],recolte:[7,8,9],port:"Grimpante (croissance continue) : tuteur de 1,8 m",taille:"1,2 à 2 m",gout:"Charnue, peu de pépins, douce",usage:"Salade",sensible:"Mildiou ; fleurs qui avortent au-dessus de 35 °C",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier, au pied"},
 {id:"tomate-cerise",cat:"legume",nom:"Tomate cerise",variete:"Délice du Jardinier",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[3,4],plant:[5],recolte:[7,8,9,10],port:"Grimpante : tuteur de 1,8 m",taille:"1,5 à 2 m",gout:"Sucrée",usage:"Apéritif, salade",sensible:"Résiste mieux au mildiou que les grosses tomates",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"courgette",cat:"legume",nom:"Courgette",variete:"Verte non coureuse",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[4,5,6],plant:[5],recolte:[6,7,8],port:"Buissonnante : 1 m² par pied",taille:"1 m",gout:"Douce",usage:"Cuisson",sensible:"Oïdium en fin d'été",pollin:{type:"insectes",avec:[],note:"Fleurs mâles et femelles sur le même pied, pollinisées par les insectes."},eau:"Abondant"},
 {id:"courge-butternut",cat:"legume",nom:"Courge",variete:"Butternut",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[4,5,6],plant:[5,6],recolte:[9,10],port:"Coureuse : tiges de 3 à 4 m au sol",taille:"Rampante, 2 m",gout:"Chair fine, goût de noisette",usage:"Soupes, purées",sensible:"Oïdium",pollin:{type:"insectes",avec:[],note:"Pollinisée par les insectes."},eau:"Abondant",cons:"Plusieurs mois"},
 {id:"haricot-a-rames",cat:"legume",nom:"Haricot à rames",variete:"Mangetout",expo:["soleil"],tendre:true,sech:1,chal:2,argile:1,
  semis:[5,6,7],plant:[],recolte:[7,8,9,10],port:"Grimpant : rames ou filet de 2 m",taille:"2 à 3 m",gout:"Tendre",usage:"Cuisson",sensible:"Graines qui pourrissent en sol froid",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"haricot-nain",cat:"legume",nom:"Haricot nain",variete:"Vert filet",expo:["soleil"],tendre:true,sech:1,chal:2,argile:1,
  semis:[5,6,7],plant:[],recolte:[7,8,9,10],port:"Buissonnant, sans tuteur",taille:"40 cm",gout:"Fin",usage:"Cuisson",sensible:"Graines qui pourrissent en sol froid",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"petit-pois-a-rames",cat:"legume",nom:"Petit pois",variete:"À rames",expo:["soleil","mi-ombre"],rustL:-5,sech:1,chal:1,argile:1,
  semis:[2,3],plant:[],recolte:[5,6],port:"Grimpant : rames ou grillage de 1,5 m",taille:"1,2 à 1,5 m",gout:"Sucré",usage:"Cuisson",sensible:"Craint la chaleur",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Modéré"},
 {id:"laitue",cat:"legume",nom:"Laitue",variete:"Batavia",expo:["soleil","mi-ombre"],rustL:-3,sech:1,chal:1,argile:2,
  semis:[2,3,4,5,6,7],plant:[4,5,6,7,8,9],recolte:[4,5,6,7,8,9],port:"Rosette",taille:"20 cm",gout:"Croquante",usage:"Salade",sensible:"Monte en graines par forte chaleur",pollin:{type:"sans",avec:[],note:"Récoltée avant floraison."},eau:"Régulier"},
 {id:"epinard",cat:"legume",nom:"Épinard",variete:"D'hiver",expo:["mi-ombre","soleil"],rustL:-10,hiver:true,sech:1,chal:1,argile:2,
  semis:[3,4,5,8,9,10],plant:[],recolte:[4,5,6,10,11,12],port:"Rosette",taille:"25 cm",gout:"Tendre",usage:"Cru ou cuit",sensible:"Monte en graines par chaleur",pollin:{type:"sans",avec:[],note:"Récolté avant floraison."},eau:"Régulier"},
 {id:"ail",cat:"legume",nom:"Ail",variete:"Violet d'automne",expo:["soleil"],rustL:-15,hiver:true,sech:3,chal:3,argile:0,
  semis:[],plant:[10,11,12,1],recolte:[5,6,7],port:"Bulbe",taille:"50 cm",gout:"Piquant",usage:"Condiment",sensible:"Pourrit en sol lourd et humide",pollin:{type:"sans",avec:[],note:"Planté en caïeux."},eau:"Faible",cons:"Plusieurs mois"},
 {id:"aubergine",cat:"legume",nom:"Aubergine",variete:"Violette longue",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[3,4],plant:[5],recolte:[7,8,9,10],port:"Buissonnante, tuteur court",taille:"50 cm",gout:"Fondante cuite",usage:"Cuisson",sensible:"Doryphores",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"poireau",cat:"legume",nom:"Poireau",variete:"D'hiver",expo:["soleil","mi-ombre"],rustL:-15,hiver:true,sech:1,chal:2,argile:2,
  semis:[3],plant:[6,7],recolte:[8,9,10,11,12],port:"Tige droite",taille:"75 cm",gout:"Doux",usage:"Cuisson",sensible:"Teigne",pollin:{type:"sans",avec:[],note:"Récolté avant floraison."},eau:"Régulier"},
 {id:"fraisier",cat:"legume",nom:"Fraisier",variete:"Gariguette",expo:["soleil","mi-ombre"],rustL:-15,hiver:true,sech:1,chal:2,argile:1,
  semis:[],plant:[8,9,10,3],recolte:[5,6],port:"Touffe à stolons",taille:"25 cm",gout:"Allongée, acidulée, parfumée",usage:"À croquer",sensible:"Pourriture grise",pollin:{type:"autofertile",avec:[],note:"Autofertile."},eau:"Régulier"},
 {id:"rhubarbe",cat:"legume",nom:"Rhubarbe",variete:"Victoria",expo:["mi-ombre","soleil"],rustL:-25,hiver:true,sech:1,chal:1,argile:2,
  semis:[],plant:[3,4,5],recolte:[5,6,7,8,9],port:"Grosse touffe vivace",taille:"1 m",gout:"Acide",usage:"Tartes, compotes",sensible:"Souffre en plein soleil brûlant",pollin:{type:"sans",avec:[],note:"Récoltée pour ses tiges."},eau:"Abondant"},
 {id:"basilic",cat:"aromatique",nom:"Basilic",variete:"Grand vert",expo:["soleil"],tendre:true,sech:1,chal:3,argile:2,
  semis:[3,4,5],plant:[5,6],recolte:[6,7,8,9,10],port:"Touffe annuelle",taille:"30 cm",gout:"Anisé",usage:"Cuisine",sensible:"Gèle à 0 °C",pollin:{type:"sans",avec:[],note:"Pincer les fleurs."},eau:"Régulier"},
 {id:"thym",cat:"aromatique",nom:"Thym",variete:"Commun",expo:["soleil"],rustL:-15,hiver:true,sech:3,chal:3,argile:0,
  semis:[3,4,5,6],plant:[3,4,9,10],recolte:[1,2,3,4,5,6,7,8,9,10,11,12],port:"Petit arbuste persistant",taille:"30 cm",gout:"Aromatique",usage:"Cuisine",sensible:"Craint l'humidité l'hiver",pollin:{type:"insectes",avec:[],note:"Très visité par les abeilles."},eau:"Très faible"},
 {id:"menthe",cat:"aromatique",nom:"Menthe",variete:"Verte",expo:["mi-ombre","ombre","soleil"],rustL:-20,hiver:true,sech:1,chal:2,argile:2,
  semis:[],plant:[3,4,5,6,9,10,11],recolte:[5,6,7,8,9,10],port:"Vivace envahissante (en pot conseillé)",taille:"50 cm",gout:"Fraîche",usage:"Cuisine, infusions",sensible:"Envahissante : racines traçantes, à cultiver en pot ou en bac",pollin:{type:"insectes",avec:[],note:"—"},eau:"Régulier"},
 {id:"persil",cat:"aromatique",nom:"Persil",variete:"Plat",expo:["mi-ombre","soleil"],rustL:-10,hiver:true,sech:1,chal:2,argile:2,
  semis:[3,4,5,6,7,8,9],plant:[],recolte:[1,2,3,4,5,6,7,8,9,10,11,12],port:"Touffe bisannuelle",taille:"30 cm",gout:"Herbacé",usage:"Cuisine",sensible:"Lent à lever",pollin:{type:"sans",avec:[],note:"—"},eau:"Régulier"},
 {id:"lavande",calc:"aime",cat:"ornement",nom:"Lavande",variete:"Vraie (angustifolia)",expo:["soleil"],rust:-15,sech:3,chal:3,argile:0,froid:"faible",
  pollin:{type:"insectes",avec:[],note:"Très mellifère."},flor:[6,7],florDoy:null,plant:[3,4,9,10],recolte:[7],port:"Arbrisseau persistant",taille:"50 cm",gout:"—",usage:"Bordures, bouquets séchés",sensible:"Meurt en sol détrempé l'hiver"},
 {id:"arbre-a-papillons",cat:"ornement",nom:"Arbre à papillons",variete:"Buddleia de David",expo:["soleil"],rust:-20,sech:3,chal:3,argile:2,froid:"faible",invasive:true,
  pollin:{type:"insectes",avec:[],note:"Très visité par les papillons."},flor:[7,8,9],florDoy:null,plant:[10,11,3,4],recolte:[],port:"Arbuste",taille:"2 à 4 m",gout:"—",usage:"Massif, haie fleurie",sensible:"Se ressème partout : classé espèce exotique envahissante"},
 {id:"hortensia",calc:"couleur",cat:"ornement",nom:"Hortensia",variete:"Macrophylla",expo:["mi-ombre","ombre"],rust:-15,sech:1,chal:1,argile:2,froid:"faible",
  pollin:{type:"sans",avec:[],note:"—"},flor:[6,7,8,9],florDoy:null,plant:[10,11,3,4],recolte:[],port:"Arbuste",taille:"1 à 1,5 m",gout:"—",usage:"Massifs à l'ombre",sensible:"Feuilles qui pendent au moindre coup de chaud"},
 {id:"arbre-de-judee",cat:"ornement",nom:"Arbre de Judée",variete:"Cercis siliquastrum",expo:["soleil"],rust:-15,sech:3,chal:3,argile:1,froid:"faible",
  pollin:{type:"insectes",avec:[],note:"—"},flor:[4],florDoy:null,plant:[10,11,3],recolte:[],port:"Arbre",taille:"6 à 8 m",hauteurMax:8,gout:"—",usage:"Isolé, floraison rose sur le bois nu",sensible:"Supporte mal la transplantation"}
];
P.forEach(p=>{ if(p.cat==="fruitier"&&!p.hauteurMax){const m=(p.taille.match(/\d+(?:,\d+)?(?=\s*m\b)/g)||[]).map(x=>parseFloat(x.replace(",",".")));p.hauteurMax=m.length?Math.max(...m):null;} });

/* ===================== OUTILS ===================== */
const $=s=>document.querySelector(s);
const W=typeof window!=="undefined"?window:{};
const MOIS=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const MOISC=["J","F","M","A","M","J","J","A","S","O","N","D"];
const fmtDoy=n=>{const d=new Date(Date.UTC(2025,0,n));return d.getUTCDate()+(d.getUTCDate()===1?"er":"")+" "+MOIS[d.getUTCMonth()];};
const nf=x=>String(x).replace(".",",").replace("-","−");
const NOW=new Date(); const MOIS_COURANT=NOW.getMonth()+1;
const leapNorm=(y,n)=>n&&((y%4===0&&y%100!==0)||y%400===0)&&n>59?n-1:n;
const median=a=>{const s=[...a].sort((x,y)=>x-y);const m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;};
const quant=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.round(p*(s.length-1)))];};
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const r1=x=>Math.round(x*10)/10;

/* Synthèse climat */
function climat(){
  const last=YEARS.map(y=>leapNorm(y[0],y[1])), first=YEARS.map(y=>leapNorm(y[0],y[2]||366));
  const y0=YEARS[0][0], y1=YEARS[YEARS.length-1][0], midY=y0+15;
  const A=YEARS.filter(y=>y[0]<midY),B=YEARS.filter(y=>y[0]>=midY), R=a=>a.filter(v=>v!=null);
  const sansGel=YEARS.filter(y=>!y[1]).length, avecGel=last.filter(Boolean);
  return { y0, y1, midY, sansGel, gelRare:sansGel>YEARS.length/2, lastMedGel:avecGel.length?Math.round(median(avecGel)):null,
    n:YEARS.length, last, lastMed:Math.round(median(last)), lastD9:quant(last,.9), lastMax:Math.max(...last),
    firstMed:Math.round(median(first)), firstD1:quant(first,.1),
    mins:YEARS.map(y=>y[3]), minMean:r1(mean(YEARS.map(y=>y[3]))), minRec:Math.min(...YEARS.map(y=>y[3])), minRecYear:YEARS.find(y=>y[3]===Math.min(...YEARS.map(z=>z[3])))[0],
    d30:Math.round(mean(YEARS.map(y=>y[4]))), d30A:Math.round(mean(A.map(y=>y[4]))), d30B:Math.round(mean(B.map(y=>y[4]))),
    d35B:Math.round(mean(B.map(y=>y[5]))), gelA:Math.round(mean(A.map(y=>y[6]))), gelB:Math.round(mean(B.map(y=>y[6]))),
    pluieEte:Math.round(mean(R(YEARS.map(y=>y[7])))), pluieAn:Math.round(mean(R(YEARS.map(y=>y[8])))),
    pluieA:Math.round(mean(R(A.map(y=>y[8])))), pluieB:Math.round(mean(R(B.map(y=>y[8])))),
    n20A:Math.round(mean(A.map(y=>y[9]))), n20B:Math.round(mean(B.map(y=>y[9])))
  };
}
let C=climat();
// Plantation des plantes gélives : quand la moyenne des minimales dépasse 10 °C (interpolation entre milieux de mois)
function dateNuits10(){ for(let m=0;m<11;m++){const a=MONTHS[m][1],b=MONTHS[m+1][1]; if(a<10&&b>=10){const f=(10-a)/(b-a);const mid=[15,46,74,105,135,166,196,227,258,288,319,349];return Math.round(mid[m]+f*(mid[m+1]-mid[m]));}} return null;}
let NUITS10=dateNuits10();
/* Commune courante : la construction l'installe avant chaque page, le navigateur au chargement */
const titreStation=n=>n.toLowerCase().replace(/(^|[\s\-'’(])([a-zà-ÿ])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\bFd\b/,"Ferrand");
function vueCommune(d){ if(!d) return null; if(d.insee) return d;
  return {slug:d.slug,nom:d.nom,insee:d.code,cp:d.cp,dep:d.depNom||"",depCode:d.dep,pop:d.pop||0,key:d.key,
    station:`${titreStation(d.stNom)} (${d.stAlt} m d'altitude, à ${d.dist} km)`+(d.corr?`, températures corrigées de ${nf(d.corr)} °C pour l'altitude de la commune (${d.alt} m)`:""),
    argile:d.argile||null, sols:d.sols||null}; }
function setCommune(c,clim){ COM=c?vueCommune(c):null;
  if(clim){ YEARS=clim.Y; MONTHS=clim.M; GEL2=clim.G; } else { YEARS=REF_Y; MONTHS=REF_M; GEL2=REF_G; }
  C=climat(); NUITS10=dateNuits10(); }
const setToulouseRef=()=>{ COM=TOULOUSE_REF; YEARS=REF_Y; MONTHS=REF_M; GEL2=REF_G; C=climat(); NUITS10=dateNuits10(); };
const extra=c=>!!c&&(c.pop||0)>=10000;      // pages « mois » et « quand planter » : communes de plus de 10 000 habitants
const argNiveau=c=>!c||!c.argile?null:c.argile.moyenOuFort>=50?"souvent argileux":c.argile.moyenOuFort>=20?"argileux par endroits":"rarement argileux";
const debutQuinzaine=n=>{if(!n)return "après la mi-mai, sous abri";const d=new Date(Date.UTC(2025,0,n));return (d.getUTCDate()<=15?"début ":"mi-")+MOIS[d.getUTCMonth()];};

/* Verdict d'une plante pour la commune et les réponses */
const ANS={expo:null,sol:null};
try{const s=JSON.parse(localStorage.getItem("jardinarena-jardin")||"{}");if(s.expo)ANS.expo=s.expo;if(s.sol)ANS.sol=s.sol;}catch(e){}
const memoJardin=()=>{try{localStorage.setItem("jardinarena-jardin",JSON.stringify(ANS));}catch(e){}};
const SOLS={argileux:"argileuse",calcaire:"calcaire",acide:"acide",leger:"légère, sableuse"};
/* Une caractéristique de la plante est-elle vérifiée par une source ? (les données climat Météo-France le sont toujours) */
const SRC_DE={expo:["expo"],rust:["rust"],florDoy:["florDoy","flor"],chal:["chal","sech"],sech:["sech","eau"],argile:["sol","sol_lourd"],froid:["froid"],invasive:["invasive"],calc:["calc"],pollin:["pollin"],taille:["taille"]};
function estime(p,k){ if(!k)return false; if(k==="expo"||(k==="rust"&&p.tendre))return false; const S=Object.fromEntries((VERIF[p.id]||[]).map(f=>[f,1])); return !(SRC_DE[k]||[k]).some(f=>S[f]); }
function verdict(p){
  const R=[]; let K=null; const _p=R.push.bind(R); R.push=(r)=>_p([r[0],r[1],K]); // [niveau, texte] niveau: ok warn bad info
  // Exposition
  K="expo";
  if(ANS.expo){ if(!p.expo.includes(ANS.expo)){ const need=p.expo.includes("soleil")&&!p.expo.includes("mi-ombre")?"le plein soleil":p.expo.join(" ou ");
      R.push(["bad",`Votre jardin est ${ANS.expo==="soleil"?"au soleil":ANS.expo==="mi-ombre"?"à mi-ombre":"à l'ombre"} : cette plante demande ${need}.`]); }
    else R.push(["ok",`Convient à un jardin ${ANS.expo==="soleil"?"ensoleillé":ANS.expo==="mi-ombre"?"à mi-ombre":"ombragé"}.`]); }
  // Froid
  K="rust";
  const rust=p.rust??p.rustL;
  if(p.tendre){ R.push(["info",NUITS10?`Gèle à 0 °C : plantez en pleine terre à partir de ${debutQuinzaine(NUITS10)}, quand les nuits dépassent 10 °C en moyenne.`:"Gèle à 0 °C : plantez-la en pleine terre une fois les gelées passées."]); }
  else if(rust!=null && (p.rust!=null || p.hiver)){ const n=C.mins.filter(t=>t<rust).length;
    if(n===0) R.push(["ok",`Supporte les hivers de la commune : ${nf(rust)} °C supportés, ${nf(C.minRec)} °C au plus froid depuis ${YEARS[0][0]}.`]);
    else if(n<=3) R.push(["warn",`Le froid est descendu sous ${nf(rust)} °C ${n} hiver${n>1?"s":""} sur ${C.n} (${nf(C.minRec)} °C en ${C.minRecYear}) : protégez la plante jeune ou en pot.`]);
    else R.push(["bad",`Le froid descend sous ${nf(rust)} °C ${n} hivers sur ${C.n} : trop froid ici.`]); }
  // Gel des fleurs
  K="florDoy";
  if(p.florDoy){ const n=YEARS.filter(y=>leapNorm(y[0],GEL2[y[0]])>=p.florDoy).length, pct=Math.round(100*n/C.n);
    if(pct>=30) R.push(["bad",`Floraison ${p.florGroupe} (vers ${fmtDoy(p.florDoy)}) : il a encore gelé à −2 °C ou moins après cette date ${n} années sur ${C.n}. Risque de perdre la récolte.`]);
    else if(pct>=10) R.push(["warn",`Gel à −2 °C ou moins pendant la floraison ${n} années sur ${C.n} : choisissez un coin abrité, loin des creux où l'air froid stagne.`]);
    else R.push(["ok",`Floraison à l'abri des gelées tardives (gel à −2 °C ou moins après le début de la floraison ${n} année${n>1?"s":""} sur ${C.n}).`]); }
  // Chaleur
  K="chal";
  if(p.chal===1) R.push(["warn",`Craint la chaleur : ${C.d30B} jours à 30 °C ou plus par an depuis ${C.midY}. Cultivez-la au printemps et à l'automne, ou à mi-ombre.`]);
  // Sécheresse
  K="sech";
  if(p.sech===1) R.push([(p.cat==="legume"||p.cat==="aromatique")?"info":"warn",`Arrosage régulier l'été : ${C.pluieEte} mm de pluie en moyenne de juin à août.`]);
  else if(p.sech===3) R.push(["ok","Résiste bien à la sécheresse une fois installée."]);
  // Sol
  K="argile";
  const argCommune = !!(COM&&COM.argile&&COM.argile.moyenOuFort>=50);
  const argileux = ANS.sol==="argileux"?true:ANS.sol==="leger"?false:argCommune;
  const terre = ANS.sol?"Votre terre est argileuse":`Sol souvent argileux à ${COM?COM.nom:"votre commune"}`;
  if(argileux){ if(p.argile===0) R.push(["warn",`${terre} : cette plante craint l'eau stagnante. Plantez-la en butte ou ajoutez du gravier et du sable.`]);
               else if(p.argile===2) R.push(["ok","S'accommode d'un sol argileux."]); }
  if(ANS.sol==="leger"&&p.sech===1) R.push(["warn","Terre légère qui sèche vite : arrosez souvent l'été et paillez le pied."]);
  // Calcaire et acidité
  K="calc";
  if(p.calc==="acide"){
    if(ANS.sol==="calcaire") R.push(["bad","Votre terre est calcaire : il lui faut une terre acide (pH 4,5 à 5,5). Cultivez-le en grand bac rempli de terre de bruyère."]);
    else if(ANS.sol==="acide") R.push(["ok","Votre terre acide lui convient."]);
    else R.push(["warn",`Il lui faut une terre acide (pH 4,5 à 5,5)${COM&&COM.sols?` ; à ${COM.nom}, la terre est ${COM.sols.resume.replace(/ \((terreforts|boulbènes)\)/g,"")}`:""} : vérifiez la vôtre, ou plantez-le en bac de terre de bruyère.`]); }
  else if(p.calc==="craint"){
    if(ANS.sol==="calcaire") R.push(["warn",`Terre calcaire : risque de feuilles qui jaunissent (chlorose). ${p.calcNote||""}`.trim()]);
    else if(!ANS.sol) R.push(["info",`Craint les terres calcaires (feuilles qui jaunissent). ${p.calcNote||""}`.trim()]); }
  else if(p.calc==="aime"){ if(ANS.sol==="calcaire") R.push(["ok","Supporte bien une terre calcaire."]); }
  else if(p.calc==="couleur"){
    if(ANS.sol==="calcaire") R.push(["info","Terre calcaire : fleurs roses plutôt que bleues. Pour du bleu, plantez-le en bac de terre de bruyère."]);
    else if(ANS.sol==="acide") R.push(["ok","Terre acide : ses fleurs pourront être bleues."]);
    else R.push(["info","Fleurs bleues en terre acide, roses en terre calcaire."]); }
  // Besoin en froid
  K="froid";
  if(p.froid==="élevé") R.push(["info",`Besoin de froid en hiver élevé : ${C.gelB} jours de gel par an depuis ${C.midY}, contre ${C.gelA} avant. À surveiller si les hivers continuent de s'adoucir.`]);
  // Espèce exotique envahissante
  K="invasive";
  if(p.invasive) R.push(["bad","Classé espèce exotique envahissante en France hexagonale (Office français de la biodiversité) : il se ressème hors des jardins, notamment dans le Sud-Ouest. Pour attirer les papillons, préférez par exemple la lavande."]);
  // Pollinisation
  K="pollin";
  if(p.pollin&&p.pollin.type==="autosterile") R.push(["info","A besoin d'un pollinisateur : voir plus bas."]);
  if(p.pollin&&p.pollin.type==="male") R.push(["info","Pied mâle : sert seulement à polliniser."]);
  // Distance maison
  K="taille";
  if(p.hauteurMax&&p.cat!=="legume"&&p.hauteurMax>=4&&argCommune) R.push(["info",`Sol argileux : plantez à au moins ${nf(r1(1.5*p.hauteurMax))} m de la maison (1,5 fois sa hauteur adulte), pour limiter le risque de fissures.`]);
  const lvl=R.some(r=>r[0]==="bad")?"bad":R.some(r=>r[0]==="warn")?"warn":"ok";
  R.forEach(r=>{r[3]=estime(p,r[2]);});
  const det=R.filter(r=>r[0]===lvl&&lvl!=="ok"), nEst=det.filter(r=>r[3]).length;
  const est=lvl==="ok"?null:(nEst===det.length?"total":nEst?"partiel":null);
  return {lvl,R,est};
}
const CATS={fruitier:"Arbres et petits fruits",legume:"Légumes",aromatique:"Aromatiques",ornement:"Arbres et arbustes d'ornement"};
const POLL={inconnu:"À vérifier",autofertile:"Autofertile",partiel:"Partiellement autofertile",autosterile:"Autostérile : pollinisateur indispensable",male:"Pied mâle (pollinisateur)",insectes:"Pollinisée par les insectes",sans:"Sans objet"};
const nomComplet=p=>p.nom+(p.variete?` ‘${p.variete}’`:"");
const byId=id=>P.find(p=>p.id===id);


/* ===================== PRÉSENTATION ===================== */
const CATL={fruitier:"Fruitiers",legume:"Légumes",aromatique:"Aromatiques",ornement:"Arbres et fleurs"};
const VL={ok:"Bon choix",warn:"Avec précautions",bad:"À éviter ici"};
const ICO={
 fruitier:`<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M16 9c-2-3-5-3-7-2-4 2-4 8-2 12 2 5 5 8 9 6 4 2 7-1 9-6 2-4 2-10-2-12-2-1-5-1-7 2z" fill="#ef6b4a"/><path d="M11 12c-1 2-1 4 0 6" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 9c0-3 1-5 3-6" stroke="#6b4a2b" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M17 6c2-3 6-3 7-1-2 2-5 2-7 1z" fill="#4c9a62"/></svg>`,
 legume:`<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><circle cx="16" cy="18" r="10" fill="#e5533a"/><path d="M11 15c0-2 1-3 3-4" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 8l2 3 4-1-3 3 3 2-4 0-2 3-1-3-4 0 3-2-3-3 4 1z" fill="#3f8a55"/></svg>`,
 aromatique:`<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M16 29V8" stroke="#3f7a52" stroke-width="2" stroke-linecap="round"/><g fill="#5fae78"><ellipse cx="11" cy="12" rx="5" ry="2.6" transform="rotate(-30 11 12)"/><ellipse cx="21" cy="15" rx="5" ry="2.6" transform="rotate(30 21 15)"/><ellipse cx="11" cy="20" rx="5" ry="2.6" transform="rotate(-30 11 20)"/><ellipse cx="21" cy="23" rx="5" ry="2.6" transform="rotate(30 21 23)"/></g></svg>`,
 ornement:`<svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><g fill="#f2b94b"><circle cx="16" cy="9" r="5"/><circle cx="23" cy="14" r="5"/><circle cx="20" cy="22" r="5"/><circle cx="12" cy="22" r="5"/><circle cx="9" cy="14" r="5"/></g><circle cx="16" cy="16" r="4" fill="#c9582f"/></svg>`};
const av=(p,cls="")=>`<span class="av ${p.cat} ${cls}">${ICO[p.cat]}</span>`;
const sun=e=>`<span class="sunico ${e==="soleil"?"full":e==="mi-ombre"?"half":"none"}"></span>${e==="soleil"?"Soleil":e==="mi-ombre"?"Mi-ombre":"Ombre"}`;
const shortPort=p=>p.port.split(":")[0].split("(")[0].trim();
const moisRange=a=>{if(!a||!a.length)return "";if(a.length===12)return "toute l'année";const set=new Set(a),seen=new Set(),runs=[];
  for(const m0 of a){if(set.has(m0===1?12:m0-1)||seen.has(m0))continue;let m=m0;const run=[m];seen.add(m);while(set.has(m===12?1:m+1)&&!seen.has(m===12?1:m+1)){m=m===12?1:m+1;run.push(m);seen.add(m);}runs.push(run);}
  const ab=m=>({1:"janv.",2:"févr.",3:"mars",4:"avril",5:"mai",6:"juin",7:"juil.",8:"août",9:"sept.",10:"oct.",11:"nov.",12:"déc."})[m];
  return runs.map(r=>r.length===1?ab(r[0]):ab(r[0])+" → "+ab(r[r.length-1])).join(", ");};
const quandPlanter=p=>p.tendre?(COM&&NUITS10?`dès ${debutQuinzaine(NUITS10)}`:"après les gelées"):(p.plant&&p.plant.length?moisRange(p.plant):"");

function heroArt(){
  const L=(x,y,r,a,c)=>`<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0 C${r*.45} ${-r*.42} ${r*1.05} ${-r*.36} ${r*1.4} 0 C${r*1.05} ${r*.36} ${r*.45} ${r*.42} 0 0Z" fill="${c}"/>`;
  // feuillage en grappes : ombre, corps, lumière (soleil en haut à droite)
  const blob=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#2f6f45"/><circle cx="${x+r*.12}" cy="${y-r*.12}" r="${r*.9}" fill="#3f8a55"/><path d="M${x-r*.2} ${y-r*.75} A${r*.82} ${r*.82} 0 0 1 ${x+r*.85} ${y+r*.05} A${r*.95} ${r*.95} 0 0 0 ${x-r*.2} ${y-r*.75}Z" fill="#5aab6e" opacity=".9"/>`;
  const apple=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="8.5" fill="${c}"/><path d="M${x+2} ${y+2} a8 8 0 0 1 -10 -4 a8.5 8.5 0 0 0 10 10.5Z" fill="#000" opacity=".12"/><circle cx="${x+3}" cy="${y-3}" r="2.6" fill="#fff" opacity=".6"/><path d="M${x} ${y-8} q1 -4 4 -5" stroke="#5b3a25" stroke-width="1.5" fill="none"/>`;
  const lettuce=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-4" cy="5" rx="20" ry="4.5" fill="#3b2416" opacity=".35"/>${L(0,0,15,-165,"#5fae55")}${L(0,0,15,-15,"#6fbf5c")}${L(0,0,15,-125,"#7cc860")}${L(0,0,15,-55,"#8fd46c")}<circle cx="1" cy="-6" r="8" fill="#a9e07f"/><circle cx="3" cy="-8" r="4" fill="#d3f2a8"/></g>`;
  const carrot=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-5 0 Q0 3 5 0 L1 7 H-1Z" fill="#ef6b4a"/>${[[-12,-20],[-4,-28],[4,-27],[12,-18]].map(([a,b])=>`<path d="M0 0 Q${a*.4} ${b*.5} ${a} ${b}" stroke="#4f9d63" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="${a}" cy="${b}" r="3" fill="#5fae55"/>`).join("")}</g>`;
  const flower=(x,y,c,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 2 Q-2 10 0 18" stroke="#3f8a55" stroke-width="2" fill="none"/>${[0,72,144,216,288].map(a=>`<ellipse transform="rotate(${a})" cx="0" cy="-4.5" rx="3" ry="4.5" fill="${c}"/>`).join("")}<circle r="2.4" fill="#f2b94b"/></g>`;
  const tuft=(x,y,c="#3f8a55")=>`<path d="M${x-8} ${y} Q${x-7} ${y-10} ${x-11} ${y-16} M${x-2} ${y} Q${x-2} ${y-13} ${x-1} ${y-22} M${x+5} ${y} Q${x+5} ${y-10} ${x+10} ${y-17}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const lav=(x,y)=>`<g transform="translate(${x} ${y})">${[-14,-7,0,7,14].map((d,i)=>`<path d="M0 0 Q${d*.4} -14 ${d} ${-24-(i%2)*6}" stroke="#6f9a6a" stroke-width="1.8" fill="none"/>${[0,1,2,3].map(k=>`<ellipse cx="${d+(k%2?1:-1)}" cy="${-24-(i%2)*6+k*4}" rx="2.4" ry="3" fill="${k<2?"#8e7cc3":"#a594d6"}"/>`).join("")}`).join("")}</g>`;
  return `<svg viewBox="0 0 520 460" role="img" aria-label="Un jardin en fin de journée : pommier, potager, tomates, lavande, abeille et une maison aux tuiles roses">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3b8"/><stop offset=".55" stop-color="#fff1dc"/><stop offset="1" stop-color="#fbf5ea"/></linearGradient>
    <linearGradient id="far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3bf"/><stop offset="1" stop-color="#b6d6a7"/></linearGradient>
    <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3cf95"/><stop offset="1" stop-color="#86bd82"/></linearGradient>
    <linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#76b676"/><stop offset="1" stop-color="#4f955f"/></linearGradient>
    <linearGradient id="plank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cc935f"/><stop offset="1" stop-color="#a46b42"/></linearGradient>
    <linearGradient id="soilg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b452c"/><stop offset="1" stop-color="#5a3824"/></linearGradient>
    <linearGradient id="path" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead6b2"/><stop offset="1" stop-color="#dcc196"/></linearGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd47a" stop-opacity=".7"/><stop offset=".45" stop-color="#ffd47a" stop-opacity=".22"/><stop offset="1" stop-color="#ffd47a" stop-opacity="0"/></radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .15  0 0 0 .07 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <clipPath id="cadre"><rect width="520" height="460" rx="36"/></clipPath>
  </defs>
  <g clip-path="url(#cadre)">
  <rect width="520" height="460" fill="url(#sky)"/>
  <circle cx="410" cy="104" r="150" fill="url(#glow)"/>
  <circle cx="410" cy="104" r="34" fill="#f6b84a"/><circle cx="410" cy="104" r="34" fill="none" stroke="#fff3d6" stroke-width="2" opacity=".6"/>
  <g fill="#fff" opacity=".85"><path d="M48 96 h84 a16 16 0 0 0 -20 -22 a24 24 0 0 0 -44 3 a14 14 0 0 0 -20 19Z"/></g>
  <g fill="#fff" opacity=".6"><path d="M250 66 h56 a12 12 0 0 0 -15 -16 a17 17 0 0 0 -30 3 a10 10 0 0 0 -11 13Z"/></g>
  <!-- oiseaux -->
  <path d="M300 112 q5 -5 10 0 q5 -5 10 0 M326 98 q4 -4 8 0 q4 -4 8 0" stroke="#3a4a3e" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".55"/>
  <!-- plans lointains -->
  <path d="M0 214 C70 190 140 196 210 186 C300 172 380 188 520 166 L520 460 L0 460Z" fill="url(#far)"/>
  <g fill="#9fc58f" opacity=".9">${[[230,184,9],[246,182,12],[262,180,8],[470,166,10],[488,166,13],[506,164,9]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>
  <!-- maison toulousaine -->
  <g transform="translate(330 150) scale(.95)"><path d="M0 34 L40 8 L80 34Z" fill="#c8664b"/><path d="M0 34 L40 8 L40 12 L4 34Z" fill="#d97a5b"/><rect x="6" y="34" width="68" height="40" fill="#f3d9bf"/><rect x="6" y="34" width="68" height="5" fill="#e4c3a2"/><rect x="16" y="46" width="12" height="14" rx="1.5" fill="#6f8fa3"/><rect x="16" y="46" width="12" height="3" fill="#8fb0c4"/><rect x="48" y="48" width="14" height="26" rx="2" fill="#4f7d5c"/><rect x="58" y="16" width="7" height="14" fill="#b65a42"/></g>
  <path d="M0 246 C110 222 230 238 330 226 C410 216 470 224 520 214 L520 460 L0 460Z" fill="url(#mid)"/>
  <!-- haie -->
  <g>${Array.from({length:10},(_,i)=>{const x=236+i*30,y=252-i*1.4;return `<circle cx="${x}" cy="${y}" r="16" fill="#4f955f"/><circle cx="${x+4}" cy="${y-4}" r="10" fill="#62a873"/>`}).join("")}</g>
  <path d="M0 270 C120 252 250 268 360 258 C430 252 490 256 520 250 L520 460 L0 460Z" fill="url(#lawn)"/>
  <!-- allée -->
  <path d="M336 460 C340 400 352 330 372 262 L388 262 C378 330 388 400 418 460Z" fill="url(#path)"/>
  ${[[376,296,5],[370,326,6],[366,360,7],[368,398,8],[376,436,9]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r*1.6}" ry="${r*.7}" fill="#cfb289" opacity=".7"/>`).join("")}
  <!-- pommier -->
  <ellipse cx="118" cy="318" rx="92" ry="13" fill="#2b5e3c" opacity=".35"/>
  <path d="M106 320 C112 290 110 262 100 236 C96 226 106 222 112 230 C118 246 122 262 124 250 C126 236 136 230 140 240 C134 262 130 292 136 320Z" fill="#6e4a2f"/>
  <path d="M126 318 C122 292 124 270 132 246" stroke="#8a5e3d" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${blob(72,176,46)}${blob(170,178,44)}${blob(120,190,48)}${blob(92,128,48)}${blob(152,124,50)}${blob(122,90,40)}
  ${[[78,170,"#e5533a"],[112,146,"#e5533a"],[160,162,"#ef6b4a"],[190,132,"#e5533a"],[128,198,"#d9473a"],[86,118,"#ef6b4a"],[56,150,"#e5533a"],[176,196,"#d9473a"],[140,108,"#f2b94b"]].map(([x,y,c])=>apple(x,y,c)).join("")}
  ${[[30,170,-160],[38,200,-140],[214,170,-20],[208,200,10],[60,96,-130],[186,86,-50],[122,52,-90],[150,226,60],[94,226,110]].map(([x,y,a],i)=>L(x,y,13,a,i%2?"#3f8a55":"#58a86d")).join("")}
  <!-- pommes tombées -->
  ${apple(60,318,"#e5533a")}${apple(176,322,"#ef6b4a")}
  <!-- lavande -->
  ${lav(250,300)}${lav(276,306)}
  <!-- tomates -->
  <path d="M452 360 L452 226" stroke="#b88a5a" stroke-width="6" stroke-linecap="round"/>
  <path d="M452 356 C432 326 470 308 452 282 C436 258 466 246 452 228" stroke="#3f8a55" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  ${L(448,328,20,205,"#4f9d63")}${L(456,304,19,-18,"#58a86d")}${L(446,276,17,200,"#4f9d63")}${L(456,252,15,-22,"#58a86d")}${L(450,236,12,190,"#62b277")}
  ${[[434,318,10],[468,296,11],[438,262,9],[468,334,10],[462,268,8]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#e5533a"/><path d="M${x+2} ${y+2} a${r} ${r} 0 0 1 ${-r-2} -4 a${r} ${r} 0 0 0 ${r+2} ${r+2}Z" fill="#000" opacity=".12"/><path d="M${x-5} ${y-r+1} l5 3.5 5-3.5" stroke="#3f8a55" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="${x+3}" cy="${y-3}" r="2.6" fill="#fff" opacity=".55"/>`).join("")}
  <!-- carré potager -->
  <ellipse cx="200" cy="432" rx="200" ry="14" fill="#2b5e3c" opacity=".3"/>
  <path d="M24 366 L322 352 L322 364 L24 378Z" fill="url(#soilg)"/>
  <path d="M24 378 L322 364 L322 418 L24 436Z" fill="url(#plank)"/>
  <path d="M24 378 L322 364 L322 370 L24 384Z" fill="#e2ad7a"/>
  <path d="M24 406 L322 390" stroke="#93603b" stroke-width="1.6" opacity=".55"/>
  <rect x="24" y="372" width="10" height="64" fill="#8f5c37"/><rect x="312" y="358" width="10" height="60" fill="#8f5c37"/><rect x="24" y="372" width="10" height="5" fill="#d29b68"/><rect x="312" y="358" width="10" height="5" fill="#d29b68"/>
  ${lettuce(60,368,.95)}${lettuce(108,366,1.05)}${carrot(152,364)}${carrot(172,363)}${carrot(192,362)}${lettuce(236,360,1)}${lettuce(282,358,.9)}
  <!-- étiquette -->
  <g transform="translate(212 340) rotate(-3)"><rect x="-1.8" y="0" width="3.6" height="24" rx="1" fill="#b88a5a"/><rect x="-26" y="-17" width="52" height="19" rx="5" fill="#fffaf0"/><text x="0" y="-3.6" text-anchor="middle" font-size="10" font-weight="800" fill="#1f5138" font-family="Figtree,system-ui,sans-serif">Chez moi</text></g>
  <!-- arrosoir -->
  <g transform="translate(452 420) rotate(-6) scale(.85)"><ellipse cx="0" cy="26" rx="26" ry="5" fill="#2b5e3c" opacity=".3"/><path d="M-18 26 L-14 -2 H14 L18 26Z" fill="#5f9fc2"/><path d="M4 -2 H14 L18 26 H8Z" fill="#4c88aa"/><path d="M-14 -2 H14 L15 4 H-15Z" fill="#86bcd9"/><path d="M14 10 L36 -10" stroke="#5f9fc2" stroke-width="5" stroke-linecap="round"/><ellipse cx="38" cy="-12" rx="5" ry="3" transform="rotate(-42 38 -12)" fill="#4c88aa"/><path d="M-14 4 C-32 4 -32 22 -16 22" stroke="#4c88aa" stroke-width="4" fill="none"/></g>
  <!-- premier plan -->
  ${tuft(14,460)}${tuft(330,458,"#2f6f45")}${tuft(512,458)}${tuft(470,456,"#2f6f45")}
  ${flower(10,438,"#ef6b4a")}${flower(396,446,"#fff",.9)}${flower(500,432,"#f2b94b",.9)}${flower(30,452,"#fff",.8)}
  <!-- abeille -->
  <g transform="translate(222 150) rotate(-8)"><path d="M-46 22 C-30 40 -14 4 2 16" stroke="#1f2a22" stroke-width="1.5" stroke-dasharray="2 5" fill="none" stroke-linecap="round" opacity=".45"/><ellipse cx="13" cy="-11" rx="8" ry="5.5" fill="#fff" opacity=".9" transform="rotate(-20 13 -11)"/><ellipse cx="22" cy="-12" rx="7" ry="5" fill="#fff" opacity=".75" transform="rotate(15 22 -12)"/><ellipse cx="18" cy="0" rx="14" ry="10" fill="#f2b94b"/><path d="M12 -9.5 V9.5 M20 -10 V10" stroke="#1f2a22" stroke-width="4"/><circle cx="30" cy="-2" r="2" fill="#1f2a22"/></g>
  <!-- papillon -->
  <g transform="translate(296 286) rotate(18)"><ellipse cx="-7" cy="-4" rx="8" ry="6.5" fill="#ef6b4a"/><ellipse cx="7" cy="-4" rx="8" ry="6.5" fill="#f2845f"/><ellipse cx="-5" cy="5" rx="5" ry="4" fill="#f6a689"/><ellipse cx="5" cy="5" rx="5" ry="4" fill="#f6a689"/><circle cx="-7" cy="-5" r="2" fill="#fff" opacity=".7"/><rect x="-1.2" y="-8" width="2.4" height="16" rx="1.2" fill="#1f2a22"/></g>
  <rect width="520" height="460" fill="#fff" filter="url(#grain)"/>
  </g></svg>`;
}

function pageAccueil(){
  return `<section class="blk"><div class="wrap hero fade">
    <div>
      <p class="kicker">Conseils de plantation près de chez vous</p>
      <h1>Que planter dans mon jardin ?</h1>
      <p class="lead">Les fruitiers, légumes et plantes qui réussiront chez vous, et quand les planter, d'après le climat et le sol de votre ville.</p>
      ${searchBox("q1")}
      ${villeMemo()?`<div class="examples">Votre ville : <a href="#commune-${villeMemo().slug}">${villeMemo().nom}</a></div>`:`<div class="examples">Par exemple : <a href="#commune-toulouse-31555">Toulouse</a> · <a href="#commune-lille-59350">Lille</a> · <a href="#commune-strasbourg-67482">Strasbourg</a> · <a href="#commune-brest-29019">Brest</a></div>`}
      ${villeMemo()?`<a class="homeseason" href="${extra(villeMemo())?`#que-planter-en-${moisSlug(MOIS_COURANT)}-${villeMemo().slug}`:url("commune-"+villeMemo().slug)+"#sec-mois"}" style="text-decoration:none;color:inherit"><span><small style="color:var(--muted);font-weight:600">En ${MOIS[MOIS_COURANT-1]}</small><br><strong>${SAISON_FRUITIERS.includes(MOIS_COURANT)?"C'est la saison des arbres fruitiers":"Ce qui se plante ce mois-ci"}</strong></span><span class="month-cta" style="margin:0">Que planter en ${MOIS[MOIS_COURANT-1]} à ${villeMemo().nom} <i>→</i></span></a>`
      :`<div class="homeseason"><span><small style="color:var(--muted);font-weight:600">En ${MOIS[MOIS_COURANT-1]}</small><br><strong>${SAISON_FRUITIERS.includes(MOIS_COURANT)?"C'est la saison des arbres fruitiers":"Ce qui se plante ce mois-ci"}</strong></span><button class="month-cta" style="margin:0" onclick="focusVille()">Voir ce qui se plante chez moi <i>→</i></button></div>`}
    </div>
    <div class="pic">${heroArt()}</div>
  </div></section>
  <section class="blk soft"><div class="wrap">
    <h2>Trois réponses, pour votre jardin</h2>
    <div class="promises">
      <div class="promise"><div class="ic" style="background:#fde6dc">${ICO.fruitier}</div><h3>Ce qui va pousser</h3><p>Les bons choix d'abord, puis ceux qui demandent des précautions. Ce qui ne réussira pas est mis de côté.</p></div>
      <div class="promise"><div class="ic" style="background:#e3f0da">${ICO.legume}</div><h3>Quand planter</h3><p>Le calendrier de chez vous, pas une moyenne nationale : les tomates se plantent plus tôt à Toulouse qu'à Lille.</p></div>
      <div class="promise"><div class="ic" style="background:#fbefcf">${ICO.ornement}</div><h3>Pourquoi</h3><p>Chaque conseil s'appuie sur 30 ans de relevés Météo-France et sur les cartes officielles des sols.</p></div>
    </div>
  </div></section>
  <section class="blk"><div class="wrap"><div class="feature">
    <span class="av fruitier" style="width:76px;height:76px;border-radius:24px">${ICO.fruitier}</span>
    <div><h2 style="font-size:clamp(24px,2.6vw,30px)">Un arbre fruitier seul ne donne parfois rien</h2>
      <p class="lead" style="margin-top:10px">Un poirier ‘Williams’ ou un cerisier ‘Burlat’ isolé fleurit mais ne produit presque pas. Chaque fiche dit quel pollinisateur planter à côté.</p></div>
    <a class="btn" href="#fruitiers">Lire le guide</a>
  </div></div></section>`;
}
function searchBox(id){
  return `<form class="search" onsubmit="return goSearch('${id}')" role="search" autocomplete="off">
    <input id="${id}" type="search" placeholder="Votre ville ou code postal" aria-label="Votre ville ou code postal" oninput="sugg('${id}')">
    <button class="btn" type="submit" aria-label="Voir mes plantes"><span class="long">Voir mes plantes</span><span class="short">Voir</span></button><div class="sugg" id="${id}-s" hidden></div></form>`;
}
let IDX=null;
async function index(){ if(IDX) return IDX; try{ IDX=await (await fetch(BASE+"/data/communes.json")).json(); }catch(e){ IDX=[]; } return IDX; }
async function chercher(v){ const q=norm(v.trim()).replace(/['’-]/g," "), I=await index(); if(q.length<2) return [];
  const num=/^\d/.test(q); return I.filter(c=>num?c[1].startsWith(q):norm(c[0]).replace(/['’-]/g," ").startsWith(q)).slice(0,8); }
W.sugg=async id=>{const v=$("#"+id).value, box=$("#"+id+"-s"); if(v.trim().length<2){box.hidden=true;return;}
  const hits=await chercher(v); if($("#"+id).value!==v) return;
  box.innerHTML=hits.length?hits.map(c=>`<a class="sg" href="${url("commune-"+c[2])}">${c[0]} <span class="note">${c[1]}</span></a>`).join(""):`<div class="no">Aucune commune trouvée.</div>`;
  box.hidden=false;};
W.goSearch=id=>{chercher($("#"+id).value).then(h=>{ if(h.length) location.href=url("commune-"+h[0][2]); else W.sugg(id); }); return false;};

function chartTemp(){
  const W=560,H=220,pl=34,pr=14,pt=16,pb=26, x=i=>pl+i*(W-pl-pr)/11, mn=-2,mx=32, y=v=>pt+(mx-v)*(H-pt-pb)/(mx-mn);
  const line=k=>MONTHS.map((m,i)=>`${i?"L":"M"}${x(i).toFixed(1)},${y(m[k]).toFixed(1)}`).join("");
  let g="";for(let v=0;v<=30;v+=10)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${v}°</text>`;
  const lab=MONTHS.map((m,i)=>`<text x="${x(i)}" y="${H-6}" text-anchor="middle">${MOISC[i]}</text>`).join("");
  const pts=(k,col)=>MONTHS.map((m,i)=>`<circle cx="${x(i)}" cy="${y(m[k])}" r="4" fill="${col}" stroke="var(--surface)" stroke-width="2"/><circle cx="${x(i)}" cy="${y(m[k])}" r="13" fill="transparent" data-tip="${MOIS[i]} : ${k===2?"maximales":"minimales"} ${nf(m[k])} °C en moyenne"/>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Températures moyennes par mois">${g}${lab}
   <path d="${line(2)}" fill="none" stroke="var(--coral)" stroke-width="2"/><path d="${line(1)}" fill="none" stroke="var(--brand-2)" stroke-width="2"/>${pts(2,"var(--coral)")}${pts(1,"var(--brand-2)")}</svg>
   <div class="legend"><span><i style="background:var(--coral)"></i>Maximales du jour</span><span><i style="background:var(--brand-2)"></i>Minimales de la nuit</span></div>`;
}
function chartPluie(){
  const W=560,H=180,pl=34,pr=14,pt=12,pb=26,mx=80, bw=(W-pl-pr)/12, y=v=>pt+(mx-v)*(H-pt-pb)/mx;
  let g="";for(let v=0;v<=75;v+=25)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${v}</text>`;
  const bars=MONTHS.map((m,i)=>{const X=pl+i*bw+bw*.2,w=bw*.6,h=y(0)-y(m[3]);return `<path d="M${X},${y(0)} v${-(h-4)} q0,-4 4,-4 h${w-8} q4,0 4,4 v${h-4}z" fill="var(--brand-2)" opacity=".85"/><rect x="${pl+i*bw}" y="${pt}" width="${bw}" height="${H-pt-pb}" fill="transparent" data-tip="${MOIS[i]} : ${m[3]} mm de pluie en moyenne"/><text x="${pl+i*bw+bw/2}" y="${H-6}" text-anchor="middle">${MOISC[i]}</text>`;}).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Pluie moyenne par mois, en millimètres">${g}${bars}</svg><p class="note" style="margin-top:6px">Pluie moyenne par mois, en millimètres.</p>`;
}

const POLLF={inconnu:["pf-mid","Pollinisation à vérifier"],autofertile:["pf-ok","Autofertile"],partiel:["pf-mid","Partiellement autofertile"],autosterile:["pf-no","Autostérile : pollinisateur requis"],male:["pf-no","Pied mâle : pollinisateur"]};
const pollFlag=p=>{if(p.cat!=="fruitier"||!p.pollin||!POLLF[p.pollin.type])return "";const [c,t]=POLLF[p.pollin.type];return `<span class="flag ${c}">${t}</span>`;};
const PH=id=>PHOTOS[id]&&{...PHOTOS[id],src:BASE+PHOTOS[id].src};
function thumb(p){const f=PH(p.id);return f?`<img class="pthumb" src="${f.src}" alt="${p.nom}" loading="lazy">`:av(p)}
function credit(f){return `Photo : ${f.auteur}, <a href="${f.licurl}" target="_blank" rel="noopener">${f.licence}</a>, via <a href="${f.lien}" target="_blank" rel="noopener">Wikimedia Commons</a> · photo de l'espèce, pas forcément de la variété`}
function miniCal(p){
  const pl=new Set(p.tendre&&NUITS10?[new Date(Date.UTC(2025,0,NUITS10)).getUTCMonth()+1]:(p.plant&&p.plant.length?p.plant:p.semis||[])), rc=new Set(p.recolte||[]);
  return `<span class="mcal" aria-hidden="true">${MOISC.map((m,i)=>{const n=i+1,a=pl.has(n),r=rc.has(n);return `<span class="mc${a?" pl":""}${r?" rc":""}${n===MOIS_COURANT?" now":""}"><i></i><em>${m}</em></span>`}).join("")}</span>`;
}
const POLLS={inconnu:["pf-mid","Pollinisation ?"],autofertile:["pf-ok","Autofertile"],partiel:["pf-mid","Partiellement autofertile"],autosterile:["pf-no","Pollinisateur requis"],male:["pf-no","Pied mâle"]};
function carte(p,v){
  const issue=v.R.find(r=>r[0]===v.lvl&&v.lvl!=="ok");
  const q=quandPlanter(p), sem=!q&&p.semis&&p.semis.length?moisRange(p.semis):"";
  const rec=p.recolte&&p.recolte.length?moisRange(p.recolte):"";
  const pf=p.cat==="fruitier"&&p.pollin&&POLLS[p.pollin.type]?POLLS[p.pollin.type]:null;
  return `<a class="pcard" href="#plante-${p.id}">
    <span class="phead">${thumb(p)}<span class="pname">${p.nom}<span>‘${p.variete}’</span></span>${p.rare?`<span class="chip pf-rare prare">★ ${p.rare}</span>`:""}</span>
    <span class="chips">${p.expo.slice(0,2).map(e=>`<span class="chip">${sun(e)}</span>`).join("")}<span class="chip">${shortPort(p).split(/ ou |,/)[0]}</span>${pf?`<span class="chip ${pf[0]}">${pf[1]}</span>`:""}</span>
    ${miniCal(p)}
    <span class="when">${q?`<span><i class="lg pl"></i>Planter <b>${q}</b></span>`:sem?`<span><i class="lg pl"></i>Semer <b>${sem}</b></span>`:""}${rec?`<span><i class="lg rc"></i>Récolte <b>${rec}</b></span>`:""}</span>
    ${p.gout&&p.gout!=="—"&&p.cat!=="ornement"?`<span class="taste">${p.gout}</span>`:""}
    ${issue?`<span class="${v.lvl==="warn"?"tip-w":"tip-b"}">${issue[1]}</span>`:""}</a>`;
}
const FILTRE={cat:"tout",vue:null,rare:false,q:""}; W.EXP=new Set();
const CATORD=["fruitier","legume","aromatique","ornement"];
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
function filtrer(){
  const q=norm(FILTRE.q.trim());
  return P.map(p=>({p,v:verdict(p)})).filter(x=>(FILTRE.cat==="tout"||x.p.cat===FILTRE.cat)&&(!FILTRE.rare||x.p.rare)&&(!q||norm(x.p.nom+" "+x.p.variete).includes(q)))
    .sort((a,b)=>CATORD.indexOf(a.p.cat)-CATORD.indexOf(b.p.cat)||a.p.nom.localeCompare(b.p.nom,"fr"));
}
function ligneLite(x){ return `<li><a href="#plante-${x.p.id}">${x.p.nom} ‘${x.p.variete}’</a></li>`; }
function section(arr,lvl,titre,sous){
  if(!arr.length)return "";
  if(SSR) return `<div class="group" id="g-${lvl}"><div class="group-h"><h2>${titre}</h2><span class="pill tag t-${lvl}">${arr.length}</span></div><p class="note">${sous}</p><ul class="plite">${arr.map(ligneLite).join("")}</ul></div>`;
  return `<div class="group" id="g-${lvl}"><div class="group-h"><h2>${titre}</h2><span class="pill tag t-${lvl}">${arr.length}</span></div><p class="note">${sous}</p><div class="plist">${arr.map(x=>carte(x.p,x.v)).join("")}</div></div>`;
}
function listeHTML(){
  const sel=filtrer(), V=FILTRE.vue;
  const ok=V==="warn"?[]:sel.filter(x=>x.v.lvl==="ok"), warn=V==="ok"?[]:sel.filter(x=>x.v.lvl==="warn"), bad=V?[]:sel.filter(x=>x.v.lvl==="bad");
  const html=section(ok,"ok","Bons choix","Ils réussissent bien ici, sans soin particulier.")+section(warn,"warn","Possibles, avec une précaution","Ça peut marcher : la précaution est indiquée sur chaque plante.")+
    (bad.length?`<details class="fold"><summary>À éviter dans votre jardin (${bad.length})</summary><div class="in">${SSR?`<ul class="plite">${bad.map(ligneLite).join("")}</ul>`:`<div class="plist">${bad.map(x=>carte(x.p,x.v)).join("")}</div>`}</div></details>`:"");
  return {html:html||`<div class="empty">Aucune plante ne correspond. <button class="linkbtn" onclick="resetF()">Effacer les filtres</button></div>`, n:ok.length+warn.length+bad.length};
}
function filtresActifs(){return (FILTRE.cat!=="tout")+(!!ANS.expo)+(!!ANS.sol)+FILTRE.rare+(!!FILTRE.vue)+(!!FILTRE.q.trim());}
function barreHTML(){
  const pill=(on,act,txt,extra="")=>`<button class="fp ${extra}" aria-pressed="${on}" onclick="${act}">${txt}</button>`;
  return `<div class="frow1"><label class="fsearch"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input id="fq" type="search" placeholder="Chercher une plante" aria-label="Chercher une plante" value="${FILTRE.q.replace(/"/g,"&quot;")}" oninput="setQ(this.value)"></label><span class="fcount" id="fcount"></span>${filtresActifs()?`<button class="linkbtn" onclick="resetF()">✕ Effacer</button>`:""}</div>
   <div class="frow2">${[["tout","Tout"],...Object.entries(CATL)].map(([k,t])=>pill(FILTRE.cat===k,`setCat('${k}')`,t)).join("")}
   <span class="fsep"></span>${pill(FILTRE.rare,"toggleRare()","★ Rares","fp-rare")}</div>
   <div class="frow2 frow3"><span class="flab">Mon jardin</span>${[["soleil","full","Soleil"],["mi-ombre","half","Mi-ombre"],["ombre","none","Ombre"]].map(([k,s,t])=>pill(ANS.expo===k,`setExpo('${k}')`,`<span class="sunico ${s}"></span>${t}`)).join("")}<span class="fsep"></span><span class="flab">Terre</span>${Object.entries(SOLS).map(([k,t])=>pill(ANS.sol===k,`setSol('${k}')`,k==="leger"?"Légère":t.charAt(0).toUpperCase()+t.slice(1))).join("")}<a class="flab-q" href="#actu-connaitre-sa-terre" title="Je ne sais pas : 3 tests simples">?</a></div>`;
}
function majListe(scroll){
  const r=listeHTML(); const L=$("#plist-wrap"); if(!L)return;
  L.innerHTML=r.html;
  const bar=$("#fbar-ctrl"); const f=document.activeElement&&document.activeElement.id==="fq"; const pos=f?$("#fq").selectionStart:null;
  bar.innerHTML=barreHTML(); if(f){const i=$("#fq");i.focus();i.setSelectionRange(pos,pos);}
  $("#fcount").textContent=r.n+(r.n>1?" plantes":" plante");
  const all=P.map(p=>verdict(p).lvl); $("#n-ok").textContent=all.filter(l=>l==="ok").length; $("#n-warn").textContent=all.filter(l=>l==="warn").length;
  document.querySelectorAll(".cnt").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v==="rare"?FILTRE.rare:FILTRE.vue===b.dataset.v));
  if(scroll)setTimeout(()=>goTo("plantes"),30);
}
W.setQ=v=>{FILTRE.q=v;majListe(false);};
W.setCat=k=>{FILTRE.cat=k;majListe(false);};
W.setExpo=k=>{ANS.expo=ANS.expo===k?null:k;memoJardin();majListe(false);};
W.setSol=k=>{ANS.sol=ANS.sol===k?null:k;memoJardin();majListe(false);};
W.toggleRare=()=>{FILTRE.rare=!FILTRE.rare;majListe(false);};
W.resetF=()=>{FILTRE.cat="tout";FILTRE.vue=null;FILTRE.rare=false;FILTRE.q="";ANS.expo=null;ANS.sol=null;memoJardin();majListe(false);};


function resumeClimat(c){
  const hiver=C.minMean>-4?"doux":C.minMean>-8?"frais":C.minMean>-12?"froid":"très froid";
  const ete=C.d30B>=30?"chauds":C.d30B>=10?"assez chauds":"plutôt frais";
  const sec=C.pluieEte<120?" et secs":C.pluieEte>250?" et arrosés":"";
  const sol=c.argile?` et un sol ${argNiveau(c)} : ${c.argile.moyenOuFort} % de la commune exposée moyennement ou fortement aux argiles, d'après la carte officielle (<a href="https://argilearena.fr/argile/${c.slug}/">voir Argile Arena</a>).`:".";
  const terre=c.sols?` La terre est ${c.sols.resume}, d'après la carte des sols INRAE : dans votre jardin, elle peut être différente, surtout si elle a été rapportée.`:"";
  return `Un hiver ${hiver}, des étés ${ete}${sec} (${C.pluieEte} mm de pluie de juin à août)${sol}${terre}`; }
function pageCommune(c){
  const all=P.map(p=>verdict(p).lvl), nOk=all.filter(l=>l==="ok").length, nW=all.filter(l=>l==="warn").length;
  const ce=P.filter(p=>((p.plant||[]).includes(MOIS_COURANT)||(p.semis||[]).includes(MOIS_COURANT))&&verdict(p).lvl!=="bad");
  
  return `<div class="wrap"><p class="crumb"><a href="#accueil">Accueil</a> › ${c.dep} › ${c.nom}</p></div>
  <section class="blk tight" style="padding-bottom:12px"><div class="wrap fade">
    <h1>Que planter à ${c.nom} ?</h1>
    <p class="lead">Les plantes qui réussiront dans votre jardin, d'après le climat et le sol de la commune.</p>
    <div class="count">
      <button class="cnt ok" data-v="ok" onclick="setVue('ok')"><b id="n-ok">${nOk}</b><span><strong>bons choix</strong><small>sans soin particulier</small></span></button>
      <button class="cnt warn" data-v="warn" onclick="setVue('warn')"><b id="n-warn">${nW}</b><span><strong>possibles</strong><small>avec une précaution</small></span></button>
    </div>
    <p class="soilline"><span class="sunico" style="background:#a8714a"></span>${argNiveau(c)?"Sol "+argNiveau(c):"Sol"}${c.sols?", "+c.sols.resume.replace(/ \((terreforts|boulbènes)\)/g,""):""} · <a href="#actu-connaitre-sa-terre">connaître votre terre</a></p>
    <nav class="toc" aria-label="Sur cette page"><button onclick="goTo('plantes')">Les plantes</button><button onclick="goTo('sec-mois')">À planter en ${MOIS[MOIS_COURANT-1]} <span>${ce.length}</span></button><button onclick="goTo('sec-climat')">Le climat</button></nav>
  </div></section>
  <section id="plantes" class="plantes"><div class="fbar"><div class="wrap" id="fbar-ctrl">${SSR?"":barreHTML()}</div></div>
    <div class="wrap" id="plist-wrap" style="padding-bottom:56px">${listeHTML().html}</div></section>
  <section class="blk soft" id="sec-mois"><div class="wrap">
    <p class="kicker">C'est le moment</p><h2>À planter en ${MOIS[MOIS_COURANT-1]}</h2>
    ${extra(c)?`<a class="month-cta" href="#que-planter-en-${moisSlug(MOIS_COURANT)}-${c.slug}">Voir tout ce qui se plante en ${MOIS[MOIS_COURANT-1]} <i>→</i></a>`:""}
    ${SSR?`<p class="note" style="margin-top:14px">${ce.length} plantes de la liste se plantent ou se sèment ce mois-ci.</p>`:`<div class="month" style="margin-top:22px">${ce.length?ce.map(p=>`<a href="#plante-${p.id}">${SSR?"":av(p)}<span><strong>${p.nom}</strong><small>‘${p.variete}’ · ${(p.plant||[]).includes(MOIS_COURANT)?"planter":"semer"}</small>${p.cat==="fruitier"&&POLLF[p.pollin.type]?`<small class="${POLLF[p.pollin.type][0]}-t">${POLLF[p.pollin.type][1].split(" :")[0]}</small>`:""}</span></a>`).join(""):`<div class="empty">Rien à planter ce mois-ci dans le catalogue de la maquette.</div>`}</div>`}
  </div></section>

  <section class="blk" id="sec-climat"><div class="wrap">
    <p class="kicker">Pourquoi ces conseils</p><h2>Le climat et le sol de ${c.nom}</h2>
    <p class="lead">${resumeClimat(c)}</p>
    <div class="facts">
      ${C.gelRare?`<div class="fact"><div class="k">Gelées de printemps</div><div class="v">Rares</div><div class="s">aucune gelée ${C.sansGel} printemps sur ${C.n}${C.lastMax?` ; la plus tardive le ${fmtDoy(C.lastMax)}`:""}.</div></div>`:`<div class="fact"><div class="k">Dernières gelées</div><div class="v">${fmtDoy(C.lastMed)}</div><div class="s">en moyenne. Gel après le ${fmtDoy(C.lastD9)} 1 printemps sur 10, jamais après le ${fmtDoy(C.lastMax)}.</div></div>`}
      <div class="fact"><div class="k">Froid de l'hiver</div><div class="v">${nf(C.minMean)} °C</div><div class="s">au plus froid d'un hiver ordinaire. Record : ${nf(C.minRec)} °C en ${C.minRecYear}.</div></div>
      <div class="fact"><div class="k">Chaleur de l'été</div><div class="v">${C.d30B} jours</div><div class="s">à 30 °C ou plus par an depuis ${C.midY}, contre ${C.d30A} entre ${C.y0} et ${C.midY-1}.</div></div>
    </div>
    <details class="fold"><summary>Mois par mois, et ce qui a changé en 30 ans</summary><div class="in">
      ${SSR?"":`<div class="charts"><div><h3 style="font-size:17px;margin-bottom:8px">Températures</h3>${chartTemp()}</div><div><h3 style="font-size:17px;margin-bottom:8px">Pluie</h3>${chartPluie()}</div></div>`}
      <div class="compare"><span></span><span class="h">${C.y0}-${C.midY-1}</span><span class="h">${C.midY}-${C.y1}</span>
        <span>Jours à 30 °C ou plus, par an</span><span class="num">${C.d30A}</span><span class="num">${C.d30B}</span>
        <span>Nuits à 20 °C ou plus, par an</span><span class="num">${C.n20A}</span><span class="num">${C.n20B}</span>
        <span>Jours de gel, par an</span><span class="num">${C.gelA}</span><span class="num">${C.gelB}</span>
        <span>Pluie par an</span><span class="num">${C.pluieA} mm</span><span class="num">${C.pluieB} mm</span></div>
      <p class="note" style="margin-top:16px">Et en 2050 ? Les projections officielles (DRIAS, réchauffement de référence de +2,7 °C en France) seront ajoutées ici.</p>
    </div></details>
    <p class="note" style="margin-top:18px">Source : Météo-France, station ${c.station}, relevés quotidiens ${C.y0}-${C.y1}. Gel mesuré sous abri ; au ras du sol, les gelées blanches peuvent survenir un peu plus tard.</p>
  </div></section>`;
}

W.goTo=id=>{const e=document.getElementById(id);if(e)e.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});};
W.setVue=v=>{if(v==='rare')FILTRE.rare=!FILTRE.rare;else FILTRE.vue=FILTRE.vue===v?null:v;majListe(true);};
W.rerender=()=>{const y=scrollY;W.render();scrollTo(0,y);};

function cal(p){
  const row=(lbl,arr,cls)=>{if(!arr||!arr.length)return "";const set=new Set(arr);
    return `<span class="lbl">${lbl}</span>`+MOISC.map((m,i)=>{const on=set.has(i+1);if(!on)return `<span class="c"></span>`;const s=!set.has(i)||i===0, e=!set.has(i+2)||i===11;return `<span class="c ${cls} ${s?"s":""} ${e?"e":""}" title="${MOIS[i]}"></span>`;}).join("");};
  return `<div class="cal"><span></span>${MOISC.map((m,i)=>`<span class="m ${i+1===MOIS_COURANT?"now":""}">${m}</span>`).join("")}
   ${row("Semis",p.semis,"on-se")}${row("Plantation",p.plant,"on-pl")}${row("Floraison",p.flor,"on-fl")}${row("Récolte",p.recolte,"on-re")}</div>
   ${p.tendre&&COM&&NUITS10?`<p class="note" style="margin-top:12px">À ${COM.nom}, mise en pleine terre à partir de ${debutQuinzaine(NUITS10)}, quand les nuits dépassent 10 °C.</p>`:""}`;
}
/* Lexique : mots techniques expliqués au survol ou au toucher */
const LEX=[
 ["moniliose","Champignon qui dessèche les fleurs et fait pourrir les fruits sur l'arbre (abricotier, cerisier, prunier…)."],
 ["tavelure","Champignon qui fait des taches brunes et des crevasses sur les feuilles et les fruits des pommiers et poiriers."],
 ["cloque","Maladie du pêcher : au printemps, les jeunes feuilles se boursouflent, rougissent puis tombent."],
 ["oïdium","Champignon qui couvre les feuilles d'une poudre blanche, surtout par temps chaud et humide."],
 ["mildiou","Champignon qui fait noircir et pourrir feuilles et fruits par temps chaud et humide (tomate, pomme de terre, vigne)."],
 ["rouille","Champignon qui forme des pustules orangées sous les feuilles."],
 ["pourriture grise","Moisissure grise qui fait pourrir fleurs et fruits par temps humide."],
 ["feu bactérien","Maladie grave des poiriers et pommiers : les rameaux noircissent comme brûlés."],
 ["psylle","Petit insecte piqueur du poirier qui affaiblit l'arbre et salit les feuilles."],
 ["doryphores","Coléoptères rayés jaune et noir qui dévorent les feuilles de pomme de terre."],
 ["balanin","Charançon dont la larve vit dans la noisette et la vide."],
 ["teigne","Petite chenille qui creuse des galeries dans les feuilles ou les bulbes (poireau, oignon)."],
 ["blettissement","Le fruit ramollit et brunit de l'intérieur."],
 ["parthénocarpe","Capable de donner des fruits sans pollinisation : ils n'ont alors pas de pépins."],
 ["pas autofertile","Un arbre seul donne très peu de fruits : il faut une autre variété compatible à proximité."],
 ["partiellement autofertile","Un arbre seul donne des fruits, mais beaucoup plus avec une autre variété à proximité."],
 ["autofertile","Un seul arbre suffit pour avoir des fruits."],
 ["pollinisateur","Arbre d'une autre variété, qui fleurit en même temps, et dont le pollen permet aux fleurs de donner des fruits."],
 ["porte-greffe","Le pied sur lequel la variété est greffée : il décide surtout de la taille et de la vigueur de l'arbre."],
 ["bifère","Donne deux récoltes par an."],
 ["remontant","Produit plusieurs fois dans la saison."],
 ["besoin en froid","Nombre d'heures froides en hiver dont l'arbre a besoin pour bien fleurir au printemps."],
 ["monte en graines","La plante fleurit trop tôt et devient dure ou amère au lieu de grossir."],
 ["terre de bruyère","Terre acide, légère, que demandent myrtilliers, hortensias bleus, etc."],
];
function gl(t){ if(!t||typeof t!=="string")return t; const used=new Set();
  for(const [w,d] of LEX){ if(used.has(w))continue;
    const re=new RegExp("(^|[^\\p{L}])("+w+")(?![\\p{L}])","iu");
    if(re.test(t)&&!/class="term"/.test(t.match(re)?.[0]||"")){ t=t.replace(re,(m,a,b)=>`${a}<span class="term" tabindex="0" role="button" data-def="${d.replace(/"/g,"&quot;")}">${b}</span>`); used.add(w);
      if(w==="pas autofertile"||w==="partiellement autofertile")used.add("autofertile"); }
  } return t; }
const SRC_LBL={semis:"Semis",plant:"Plantation",eau:"Arrosage",sol_lourd:"Sol argileux",invasive:"Statut",sech:"Sécheresse",pollin:"Pollinisation",flor:"Floraison",florDoy:"Date de floraison (risque de gel)",recolte:"Récolte",taille:"Taille adulte",rust:"Froid supporté",gout:"Goût",sensible:"Points faibles",expo:"Ensoleillement",sol:"Sol",mise_a_fruit:"Premiers fruits"};
const SRC_ORD=["invasive","pollin","semis","plant","flor","florDoy","recolte","rust","sech","expo","sol","sol_lourd","eau","taille","mise_a_fruit","gout","sensible"];
const POLL_TXT={autofertile:"autofertile",autosterile:"pas autofertile",partiel:"partiellement autofertile",male:"pied mâle",a_verifier:"à vérifier"};
const dom=u=>{try{return new URL(u).hostname.replace(/^www\./,"")}catch(e){return u}};
const TRAIT={chal:"Le fait que la plante craigne la chaleur",sech:"Son besoin en eau",rust:"Le froid que la plante supporte",florDoy:"Sa date de floraison",argile:"Sa tolérance au sol argileux",taille:"Sa taille adulte",pollin:"Sa pollinisation",froid:"Son besoin de froid en hiver"};
function estPhrase(v){
  const ks=[...new Set(v.R.filter(r=>r[0]===v.lvl&&r[3]).map(r=>r[2]))].filter(k=>TRAIT[k]);
  if(!ks.length)return "";
  const t=ks.map((k,i)=>i?TRAIT[k].toLowerCase():TRAIT[k]).join(ks.length>2?", ":" et ");
  return `À vérifier : ${t.charAt(0).toLowerCase()+t.slice(1)} ${ks.length>1?"sont nos estimations":"est notre estimation"}, nous ne ${ks.length>1?"les":"l'"}avons pas encore vérifié${ks.length>1?"es":"e"}. Les chiffres de climat, eux, viennent de Météo-France.`;
}
const ARBRE_GREFFE=p=>p.cat==="fruitier"&&["Pommier","Poirier","Cerisier","Abricotier","Pêcher","Prunier","Amandier","Plaqueminier (kaki)","Cognassier","Nectarinier","Néflier","Mirabellier","Brugnonier"].some(n=>p.nom.startsWith(n.split(" (")[0]));
function pagePlante(p,modal){
  const v=verdict(p), c=COM, pol=p.pollin||{type:"sans",avec:[]};
  const parts=pol.avec.map(id=>byId(id)||id);
  const pchip=q=>typeof q==="string"?`<span class="partner"><span class="av fruitier">${ICO.fruitier}</span>${q}</span>`:`<a class="partner" href="#plante-${q.id}">${av(q)}${nomComplet(q)}</a>`;
  const ou=(ANS.expo||ANS.sol)?"dans votre jardin":c?`à ${c.nom}`:""; const headline={ok:`Bon choix ${ou}`,warn:`Possible ${ou}, avec une précaution`,bad:`À éviter ${ou}`}[v.lvl];
  const first=v.R.find(r=>r[0]===v.lvl&&v.lvl!=="ok");
  const keys=[["Ensoleillement",p.expo.map(e=>e==="soleil"?"Soleil":e==="mi-ombre"?"Mi-ombre":"Ombre").join(", ")],["Planter",quandPlanter(p)||(p.semis&&p.semis.length?"Semer "+moisRange(p.semis):"—")],["Récolte",p.recolte&&p.recolte.length?moisRange(p.recolte):"—"],["Taille adulte",p.taille.split(/, (?=\d)|;/)[0]]];
  const spec=[["Port",p.port],["Taille adulte",p.taille],p.florGroupe&&p.florGroupe!=="—"?["Floraison",p.florGroupe]:null,["Froid supporté",p.tendre?"Gèle à 0 °C":nf(p.rust??p.rustL)+" °C"],["Sécheresse",["","Résiste peu","Résiste moyennement","Résiste bien"][p.sech]],["Chaleur",["","La craint","Moyenne","La supporte bien"][p.chal]],["Sol argileux",["Craint l'humidité","Avec un bon drainage","Bien"][p.argile]],p.froid?["Besoin de froid l'hiver",p.froid[0].toUpperCase()+p.froid.slice(1)]:null,p.gout&&p.gout!=="—"?["Goût",p.gout]:null,p.usage?["Usage",p.usage]:null,p.cons&&p.cons!=="—"?["Conservation",p.cons]:null,p.eau?["Arrosage",p.eau]:null,p.sensible&&p.sensible!=="—"?["Points faibles",p.sensible]:null].filter(Boolean);
  return `${modal?"":`<div class="wrap"><p class="crumb"><a href="#accueil">Accueil</a> › ${c?`<a href="#commune-${c.slug}">${c.nom}</a> › `:""}${p.nom}</p></div>`}
  <section class="blk tight"><div class="wrap" style="max-width:960px">
    ${PH(p.id)?`<figure class="pphoto fade"><img src="${PH(p.id).src}" alt="${p.nom}"><figcaption>${credit(PH(p.id))}</figcaption></figure>`:""}<div class="phero fade">${PH(p.id)?"":av(p)}<div><p class="kicker" style="margin:0 0 6px">${CATL[p.cat]} · ${shortPort(p)}</p><h1>${p.nom} <span style="color:var(--muted);font-weight:600">‘${p.variete}’</span></h1></div></div>
    ${!c?`<div class="verdict choisir"><div><div class="big">Va-t-il réussir chez vous ?</div><p style="margin-top:6px">Indiquez votre commune : nous comparons ses besoins aux gelées, aux étés et au sol de chez vous.</p>${searchBox("qp")}</div></div>`:`<div class="verdict ${v.lvl}"><span class="vicon ${v.lvl}">${v.lvl==="ok"?"✓":v.lvl==="warn"?"!":"×"}</span><div><div class="big">${headline}</div>${first?`<p style="margin-top:6px">${first[1]}</p>`:`<p style="margin-top:6px">Le climat et le sol de la commune lui conviennent.</p>`}${v.est?`<p class="estnote">${estPhrase(v)}</p>`:""}</div></div>`}
    <div class="keys">${keys.map(([k,x])=>`<div class="key"><div class="k">${k}</div><div class="v">${x}</div></div>`).join("")}</div>
    ${especeDe(p)&&extra(c)?`<a class="month-cta" href="#quand-planter-${especeDe(p)}-${c.slug}">Quand planter ${ESPECES[especeDe(p)].lbl} à ${c.nom} <i>→</i></a>`:""}${ARBRE_GREFFE(p)?`<a class="month-cta" href="#actu-scion-gobelet-demi-tige-haute-tige-premiere-recolte">Scion, gobelet ou demi-tige : quel arbre acheter, et quand récolter ? <i>→</i></a>`:""}
  </div></section>
  ${(pol.type==="autosterile"||pol.type==="partiel"||pol.type==="male")?`<section class="blk tight" style="padding-bottom:0"><div class="wrap" style="max-width:960px"><div class="poll">
    <span class="av fruitier" style="width:60px;height:60px;border-radius:18px">${ICO.fruitier}</span>
    <div><h2 style="font-size:26px">${pol.type==="male"?"Les pieds qu'il pollinise":pol.type==="autosterile"?"Plantez un pollinisateur à côté":"Pour une meilleure récolte"}</h2>
    ${parts.length&&pol.type!=="male"?`<p style="margin-top:8px">${pol.type==="partiel"?"Il produit seul, mais mieux avec l'une de ces variétés à proximité :":"Par exemple l'une de ces variétés :"}</p>`:`<p style="margin-top:8px">${gl(pol.note)}</p>`}${parts.length?`<div class="partners">${parts.map(pchip).join("")}</div>`:""}
    <details class="pmore"><summary>En savoir plus<span class="chev" aria-hidden="true"></span></summary>
    ${parts.length&&pol.type!=="male"?`<p>${gl(pol.note)}</p>`:""}
    <p>Le pollinisateur doit fleurir en même temps et être compatible : deux variétés qui fleurissent ensemble ne se pollinisent pas toujours. Demandez confirmation au pépiniériste.</p>
    <p>Un arbre de la même variété ne compte pas ; celui d'un voisin proche peut suffire.</p></details></div>
  </div></div></section>`:""}
  <section class="blk tight"><div class="wrap" style="max-width:960px">
    <h2>Calendrier</h2>${cal(p)}
    ${!c?"":(()=>{const li=r=>`<li><span class="dot ${r[0]}"></span><span>${gl(r[1])}${r[3]?` <span class="estim" tabindex="0" role="button" data-def="Cette caractéristique de la plante est notre estimation : nous ne l'avons pas encore vérifiée. Les chiffres de climat, eux, viennent de Météo-France.">estimation</span>`:""}</span></li>`;
      const todo=v.R.filter(r=>r[0]!=="ok"&&!/voir plus bas|sert seulement à polliniser/.test(r[1])), good=v.R.filter(r=>r[0]==="ok");
      return `<h2 style="margin-top:48px">${todo.length?`À savoir avant de planter à ${c.nom}`:`Rien de particulier à ${c.nom}`}</h2>
      ${todo.length?`<ul class="reasons">${todo.map(li).join("")}</ul>`:""}
      ${ANS.expo&&ANS.sol?"":`<p class="note" style="margin-top:10px">Pour un conseil complet, indiquez ${!ANS.expo&&!ANS.sol?"l'ensoleillement et la terre":!ANS.expo?"l'ensoleillement":"la terre"} de votre jardin sur la <a href="#commune-${c.slug}">page de ${c.nom}</a>.</p>`}
      ${good.length?`<details class="pmore" style="margin-top:14px"><summary>Voir ${good.length>1?`les ${good.length} points favorables`:"le point favorable"}<span class="chev" aria-hidden="true"></span></summary><ul class="reasons">${good.map(li).join("")}</ul></details>`:""}`;})()}
    <details class="srcbox"><summary><span><b>Caractéristiques</b> · froid, chaleur, sécheresse, goût, conservation…</span><span class="chev" aria-hidden="true"></span></summary>
    <dl class="specs">${spec.map(([k,x])=>`<div><dt>${k}</dt><dd>${gl(x)}</dd></div>`).join("")}</dl></details>
  </div></section>`;
}
/* ===================== ARBRES FRUITIERS ===================== */
const PF={cat:"tout"};
const SPECIES_PL={"Pommier":"Pommiers","Poirier":"Poiriers","Cerisier":"Cerisiers","Abricotier":"Abricotiers","Pêcher":"Pêchers","Prunier":"Pruniers","Amandier":"Amandiers","Figuier":"Figuiers","Olivier":"Oliviers","Kiwi":"Kiwis","Framboisier":"Framboisiers","Groseillier":"Groseilliers","Myrtillier":"Myrtilliers","Noisetier":"Noisetiers","Vigne de table":"Vignes de table","Plaqueminier (kaki)":"Plaqueminiers (kakis)","Grenadier":"Grenadiers","Jujubier":"Jujubiers","Feijoa":"Feijoas","Abricotier noir":"Abricotiers noirs"};
const PGROUP=p=>p.pollin.type==="autofertile"?"seul":p.pollin.type==="partiel"?"mieux":p.pollin.type==="inconnu"?"inconnu":"requis";
W.setPF=v=>{PF.cat=v;W.rerender();};
function pageFruitiers(){
  const F=P.filter(p=>p.cat==="fruitier");
  const n=g=>F.filter(p=>PGROUP(p)===g).length;
  const sel=F.filter(p=>PF.cat==="tout"||(PF.cat==="rare"?p.rare:PGROUP(p)===PF.cat));
  const species=[...new Set(sel.map(p=>p.nom))];
  const vlab={ok:"Bon choix",warn:"Avec précaution",bad:"À éviter"};
  const row=p=>{const v=verdict(p);const partners=p.pollin.avec.map(id=>byId(id)?`<a class="partner sm" href="#plante-${id}">${av(byId(id))}${byId(id).variete}</a>`:`<span class="partner sm">${av(p)}${id}</span>`).join("");
    return `<div class="frow">
      <a class="fname" href="#plante-${p.id}"><span class="fv">‘${p.variete}’${p.rare?` <span class="flag pf-rare" style="vertical-align:middle">★ ${p.rare}</span>`:""}</span><span class="fsub">${p.flor.length?"Fleurit "+moisRange(p.flor):"Floraison discrète"}${p.recolte.length?" · Récolte "+moisRange(p.recolte):""}</span></a>
      <div class="fpoll">${pollFlag(p)}${partners?`<div class="fwith"><span>Avec :</span>${partners}</div>`:""}</div>
      ${COM?`<span class="tag t-${v.lvl} fverd">${vlab[v.lvl]} à ${COM.nom}</span>`:""}</div>`;};
  const chip=(k,t,c,cls)=>`<button class="fchip ${cls||""}" aria-pressed="${PF.cat===k}" onclick="setPF('${k}')">${t}<span>${c}</span></button>`;
  return `<section class="blk tight"><div class="wrap fade" style="max-width:1000px">
    <p class="kicker">Pollinisation</p><h1>Faut-il un pollinisateur à mon arbre fruitier ?</h1>
    <p class="lead">Beaucoup de fruitiers fleurissent mais ne donnent rien s'ils sont seuls. Voici, variété par variété, s'il faut en planter un deuxième et lequel.</p><p style="margin-top:14px"><a class="month-cta" href="#actu-scion-gobelet-demi-tige-haute-tige-premiere-recolte">Avant d'acheter : scion, gobelet, demi-tige ou haute-tige, et quand récolter <i>→</i></a></p>
    <div class="pkinds">
      <div class="pkind ok"><span class="flag pf-ok">Autofertile</span><h3>Un seul arbre suffit</h3><p>Il se pollinise lui-même. Un voisin compatible peut quand même améliorer la récolte.</p></div>
      <div class="pkind mid"><span class="flag pf-mid">Partiellement autofertile</span><h3>Mieux avec un voisin</h3><p>Il produit seul, mais nettement plus et plus régulièrement avec un pollinisateur.</p></div>
      <div class="pkind no"><span class="flag pf-no">Autostérile</span><h3>Pollinisateur requis</h3><p>Sans un arbre compatible qui fleurit en même temps, presque pas de fruits.</p></div>
    </div>
    <div class="ftools"><span class="note">Afficher :</span>
      ${chip("tout","Tous",F.length)}${chip("seul","Un seul arbre suffit",n("seul"),"c-ok")}${chip("mieux","Mieux avec un voisin",n("mieux"),"c-mid")}${chip("requis","Pollinisateur requis",n("requis"),"c-no")}${chip("rare","★ Variétés rares",F.filter(p=>p.rare).length,"c-rare")}</div>
    ${species.map(sp=>{const L=sel.filter(p=>p.nom===sp);return `<div class="fsp"><h2 class="subcat">${av(L[0])}${SPECIES_PL[sp]||sp}<span class="n">${L.length} variété${L.length>1?"s":""}</span></h2><div class="flist">${L.map(row).join("")}</div></div>`;}).join("")}
    <div class="tipcard"><h3>Un bon pollinisateur, c'est…</h3><ul>
      <li>une <strong>autre variété</strong> de la même espèce : deux ‘Williams’ ne se pollinisent pas entre eux ;</li>
      <li>qui <strong>fleurit en même temps</strong> ;</li>
      <li>à <strong>quelques dizaines de mètres</strong> au plus, pour que les abeilles fassent le trajet. Celui d'un voisin peut suffire.</li></ul></div>
    <p class="note" style="margin-top:16px">Maquette : ${F.length} fruitiers, valeurs en cours de vérification. Le site visera les variétés les plus vendues.</p>
  </div></section>`;
}

/* ===================== ACTUALITÉS ET INFOGRAPHIES ===================== */
const doyLab=n=>{const d=new Date(Date.UTC(2025,0,n));return d.getUTCDate()+" "+["janv.","févr.","mars","avril","mai","juin","juil.","août","sept.","oct.","nov.","déc."][d.getUTCMonth()];};
function figChaleur(){
  const W=720,H=300,pl=36,pr=14,pt=24,pb=30,n=YEARS.length,bw=(W-pl-pr)/n,mx=80,y=v=>pt+(mx-v)*(H-pt-pb)/mx;
  let g="";for(let v=0;v<=80;v+=20)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${v}</text>`;
  const bars=YEARS.map((r,i)=>{const X=pl+i*bw+2,w=bw-4,h=y(0)-y(r[4]);const late=r[0]>=C.midY;return `<rect x="${X}" y="${y(r[4])}" width="${w}" height="${h}" rx="3" fill="${late?"var(--coral)":"color-mix(in srgb,var(--coral) 45%,transparent)"}"/><rect x="${pl+i*bw}" y="${pt}" width="${bw}" height="${H-pt-pb}" fill="transparent" data-tip="${r[0]} : ${r[4]} jours à 30 °C ou plus"/>${i%5===0?`<text x="${X+w/2}" y="${H-10}" text-anchor="middle">${r[0]}</text>`:""}`;}).join("");
  const avg=(a,b,v)=>`<line x1="${pl+a*bw}" x2="${pl+b*bw}" y1="${y(v)}" y2="${y(v)}" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 4"/><text x="${pl+a*bw+4}" y="${y(v)-7}" style="fill:var(--ink);font-weight:700">Moyenne ${v} jours</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Jours à 30 °C ou plus par an, ${C.y0}-${C.y1}">${g}${bars}${avg(0,15,C.d30A)}${avg(15,30,C.d30B)}</svg>`;
}
function figGelFleurs(){
  const W=720,H=320,pl=64,pr=150,pt=18,pb=30,n=YEARS.length,x=i=>pl+i*(W-pl-pr)/(n-1),d0=1,d1=110,y=d=>pt+(d-d0)*(H-pt-pb)/(d1-d0);
  let g="";[1,32,60,91].forEach(d=>{g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(d)}" y2="${y(d)}" stroke="var(--line)"/><text x="${pl-8}" y="${y(d)+4}" text-anchor="end">${doyLab(d)}</text>`;});
  const lines=[[65,"Rouge du Roussillon","var(--bad)",-22],[75,"Bergeron","var(--brand-2)",14]].map(([d,t,c,o])=>`<line x1="${pl}" x2="${W-pr}" y1="${y(d)}" y2="${y(d)}" stroke="${c}" stroke-width="2"/><text x="${W-pr+8}" y="${y(d)+o}" style="fill:var(--ink);font-weight:700">${t}</text><text x="${W-pr+8}" y="${y(d)+o+14}">fleurit vers le ${doyLab(d)}</text>`).join("");
  const dots=YEARS.map((r,i)=>{const d=GEL2[r[0]];if(!d)return `<text x="${x(i)}" y="${y(4)}" text-anchor="middle" style="font-size:10px">–</text>`;const late=d>=65;return `<circle cx="${x(i)}" cy="${y(d)}" r="${late?6:4.5}" fill="${late?"var(--bad)":"var(--muted)"}" stroke="var(--surface)" stroke-width="2"/><circle cx="${x(i)}" cy="${y(d)}" r="12" fill="transparent" data-tip="${r[0]} : dernière gelée de −2 °C ou moins le ${doyLab(d)}"/>`;}).join("");
  const xl=YEARS.map((r,i)=>i%5===0?`<text x="${x(i)}" y="${H-8}" text-anchor="middle">${r[0]}</text>`:"").join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Date de la dernière gelée de −2 °C ou moins chaque année, comparée à la floraison de deux abricotiers">${g}${lines}${dots}${xl}</svg>
  <div class="legend"><span><i style="background:var(--bad);height:10px;width:10px;border-radius:50%"></i>Gel après le début de floraison du ‘Rouge du Roussillon’</span><span><i style="background:var(--muted);height:10px;width:10px;border-radius:50%"></i>Dernière gelée avant</span></div>`;
}
function figNuits(){
  const W=720,H=260,pl=36,pr=14,pt=18,pb=28,x=i=>pl+i*(W-pl-pr)/11,mn=0,mx=20,y=v=>pt+(mx-v)*(H-pt-pb)/(mx-mn);
  let g="";for(let v=0;v<=20;v+=5)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end">${v}°</text>`;
  const path=MONTHS.map((m,i)=>`${i?"L":"M"}${x(i)},${y(m[1])}`).join("");
  const pts=MONTHS.map((m,i)=>`<circle cx="${x(i)}" cy="${y(m[1])}" r="4.5" fill="${m[1]>=10?"var(--brand-2)":"var(--muted)"}" stroke="var(--surface)" stroke-width="2"/><circle cx="${x(i)}" cy="${y(m[1])}" r="13" fill="transparent" data-tip="${MOIS[i]} : ${nf(m[1])} °C la nuit en moyenne"/><text x="${x(i)}" y="${H-8}" text-anchor="middle">${MOISC[i]}</text>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Température minimale moyenne par mois">${g}
   <line x1="${pl}" x2="${W-pr}" y1="${y(10)}" y2="${y(10)}" stroke="var(--coral)" stroke-width="2" stroke-dasharray="6 4"/><text x="${pl+6}" y="${y(10)-8}" style="fill:var(--ink);font-weight:700">10 °C : seuil pour les tomates</text>
   <path d="${path}" fill="none" stroke="var(--brand-2)" stroke-width="2"/>${pts}</svg>`;
}
const nGelRR=YEARS.filter(r=>GEL2[r[0]]>=65).length, nGelB=YEARS.filter(r=>GEL2[r[0]]>=75).length;
function figTerre(){
  // 3 tests simples : boudin, vinaigre, bicarbonate (dessin original)
  const box=(x,t,s)=>`<text x="${x}" y="246" text-anchor="middle" class="t1">${t}</text><text x="${x}" y="266" text-anchor="middle" class="t3">${s}</text>`;
  const jar=(x,col,bub)=>`<path d="M${x-42} 70 h84 v120 a14 14 0 0 1 -14 14 h-56 a14 14 0 0 1 -14 -14z" fill="#eef4f7" stroke="#9fb3bd" stroke-width="2"/><rect x="${x-40}" y="150" width="80" height="52" rx="10" fill="#8a6142"/><rect x="${x-40}" y="128" width="80" height="24" fill="${col}" opacity=".55"/>${bub}`;
  const bubbles=x=>[[-18,118],[-4,104],[10,114],[22,98],[-24,96],[4,88],[16,122]].map(([dx,y],i)=>`<circle cx="${x+dx}" cy="${y}" r="${4+(i%3)*1.6}" fill="none" stroke="#5f7d8a" stroke-width="1.6"/>`).join("");
  return `<svg viewBox="0 0 720 290" role="img" aria-label="Trois tests : le boudin pour l'argile, le vinaigre pour le calcaire, le bicarbonate pour l'acidité"><style>.t1{font:700 15px var(--f-b,system-ui);fill:var(--ink)}.t3{font:500 12px var(--f-b,system-ui);fill:var(--muted)}</style>
  <g><rect x="62" y="96" width="116" height="20" rx="10" fill="#8a6142"/><path d="M76 104 h88" stroke="#a87a55" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M120 128 v14 m-7 -7 l7 7 l7 -7" stroke="var(--muted)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="120" cy="182" rx="36" ry="24" fill="none" stroke="#8a6142" stroke-width="14"/>${box(120,"1. Le boudin","se plie sans casser : argileuse")}</g>
  <g>${jar(360,"#d9e6c8",bubbles(360))}<path d="M330 40 l22 22" stroke="#9fb3bd" stroke-width="10" stroke-linecap="round"/>${box(360,"2. Le vinaigre","ça mousse : calcaire")}</g>
  <g>${jar(600,"#f3e4c4",bubbles(600))}<rect x="566" y="34" width="34" height="26" rx="5" fill="#fff" stroke="#9fb3bd" stroke-width="2"/>${box(600,"3. Le bicarbonate","ça mousse : acide")}</g></svg>`;
}
function figFormes(){
  // silhouettes originales à l'échelle de l'arbre adulte : scion, basse-tige, demi-tige, haute-tige
  const W=720,H=300,base=262,m=v=>base-v*28;
  const fr=v=>String(v).replace(".",",");
  const tree=(cx,tronc,haut,rx,lab,sub)=>{const ty=m(tronc),top=m(haut),ry=(ty-top)/2+6,cy=top+ry;
    return `<g><rect x="${cx-5}" y="${ty-8}" width="10" height="${base-ty+8}" rx="3" fill="#7a5233"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#3f8a55"/><ellipse cx="${cx+rx*0.22}" cy="${cy-ry*0.35}" rx="${rx*0.5}" ry="${ry*0.4}" fill="#58a86d" opacity=".75"/>
    <line x1="${cx-rx-12}" x2="${cx-rx-12}" y1="${ty}" y2="${base}" stroke="var(--coral)" stroke-width="2"/><line x1="${cx-rx-16}" x2="${cx-8}" y1="${ty}" y2="${ty}" stroke="var(--coral)" stroke-width="1.5" stroke-dasharray="2 3"/>
    <text x="${cx-rx-16}" y="${(ty+base)/2+4}" text-anchor="end" class="t2" fill="var(--coral)">tronc ${fr(tronc)} m</text>
    <text x="${cx}" y="${base+22}" text-anchor="middle" class="t1">${lab}</text><text x="${cx}" y="${base+38}" text-anchor="middle" class="t3">${sub}</text></g>`;};
  let g="";for(let v=0;v<=8;v+=2)g+=`<line x1="40" x2="${W-6}" y1="${m(v)}" y2="${m(v)}" stroke="var(--line)" ${v?'stroke-dasharray="3 5"':""}/><text x="32" y="${m(v)+4}" text-anchor="end" class="t3">${v} m</text>`;
  const scion=`<g><rect x="86" y="${m(1.4)}" width="5" height="${base-m(1.4)}" rx="2.5" fill="#7a5233"/><path d="M88 ${m(1.4)} q6 -10 14 -8 M89 ${m(1)} q-8 -6 -14 -2" stroke="#4f9d63" stroke-width="3" fill="none" stroke-linecap="round"/><text x="88" y="${base+22}" text-anchor="middle" class="t1">Scion</text><text x="88" y="${base+38}" text-anchor="middle" class="t3">1 an, une tige</text></g>`;
  return `<svg viewBox="0 0 ${W} ${H+20}" role="img" aria-label="Hauteur du tronc et taille adulte : scion, basse-tige 3 à 4 m, demi-tige 5 à 6 m, haute-tige environ 8 m"><style>.t1{font:700 14px var(--f-b,system-ui);fill:var(--ink)}.t2{font:600 11.5px var(--f-b,system-ui)}.t3{font:500 11.5px var(--f-b,system-ui);fill:var(--muted)}</style>
  ${g}<line x1="40" x2="${W-6}" y1="${base}" y2="${base}" stroke="#a8714a" stroke-width="3"/>
  ${scion}${tree(250,0.6,3.5,42,"Basse-tige","adulte : 3 à 4 m")}${tree(445,1.3,5.5,62,"Demi-tige","adulte : 5 à 6 m")}${tree(632,1.9,8,78,"Haute-tige","adulte : environ 8 m")}</svg>`;
}
const listeNoms=L=>{const n=[...new Set(L.map(x=>x.nom.toLowerCase()))];return n.slice(0,6).join(", ")+(n.length>6?"…":"");};
const ACTUS=[
 {slug:"connaitre-sa-terre",type:"Guide pratique",date:"25 novembre 2026",title:"Argileuse, calcaire ou acide ? Connaître sa terre en 3 tests",
  lead:"Avec un peu d'eau, du vinaigre et du bicarbonate, vous saurez en dix minutes quelles plantes réussiront chez vous.",
  fig:figTerre, src:"Dessin Jardin Arena.",
  body:`<p>La carte des sols donne une tendance pour votre commune. À Toulouse, la terre est souvent calcaire sur les coteaux et plutôt acide sur les terrasses de la Garonne. Mais la terre de votre jardin peut être différente, surtout si elle a été rapportée lors de la construction. Ces tests donnent la réponse pour chez vous.</p>
   <h2>Avant de commencer : prélever la terre</h2>
   <p>Creusez à 10 ou 20 cm de profondeur, à trois ou quatre endroits du jardin, et mélangez. Ôtez les cailloux et les racines.</p>
   <h2>1. Le boudin : votre terre est-elle argileuse ?</h2>
   <p>Mouillez une poignée de terre et roulez-la entre vos mains pour former un boudin.</p>
   <ul class="bul"><li><strong>Il se plie en anneau sans casser</strong> : terre argileuse. Lourde, elle colle l'hiver et se fend l'été.</li>
   <li><strong>Il se forme mais casse quand on le plie</strong> : terre limoneuse ou riche en humus, la plus facile à cultiver.</li>
   <li><strong>Impossible de faire un boudin, ça s'effrite</strong> : terre légère, sableuse. Elle sèche vite.</li></ul>
   <h2>2. Le vinaigre : votre terre est-elle calcaire ?</h2>
   <p>Mettez une cuillère de terre dans un verre et versez du vinaigre blanc. <strong>Si ça mousse ou pétille, la terre est calcaire</strong> : plus la mousse est forte, plus elle l'est.</p>
   <h2>3. Le bicarbonate : votre terre est-elle acide ?</h2>
   <p>Si le vinaigre n'a rien donné, mouillez une autre cuillère de terre avec de l'eau, puis ajoutez une pincée de bicarbonate de soude. <strong>Si ça mousse, la terre est acide.</strong> Si rien ne se passe dans les deux tests, elle est plutôt neutre : la plupart des plantes s'y plaisent.</p>
   <p class="note">Ces tests donnent une tendance. Pour un chiffre précis, un kit de mesure du pH coûte quelques euros en jardinerie ; un laboratoire fait une analyse complète.</p>
   <h2>Ce que ça change pour vos plantations</h2>
   <table class="stack gtab"><thead><tr><th>Votre terre</th><th>À éviter ou à adapter</th><th>À l'aise</th></tr></thead><tbody>
    <tr><td data-l="Votre terre"><strong>Calcaire</strong></td><td data-l="À éviter">myrtillier (terre acide obligatoire), kiwi ; poirier sur cognassier, pêcher sur franc : choisissez un autre porte-greffe ; hortensia : fleurs roses</td><td data-l="À l'aise">cerisier, lavande</td></tr>
    <tr><td data-l="Votre terre"><strong>Acide</strong></td><td data-l="À éviter">lavande (préfère le calcaire)</td><td data-l="À l'aise">myrtillier, hortensia à fleurs bleues, kiwi</td></tr>
    <tr><td data-l="Votre terre"><strong>Argileuse</strong></td><td data-l="À éviter">plantes qui craignent l'eau stagnante, comme ${listeNoms(P.filter(x=>x.argile===0))} : plantez-les en butte</td><td data-l="À l'aise">${listeNoms(P.filter(x=>x.argile===2))}</td></tr>
    <tr><td data-l="Votre terre"><strong>Légère</strong></td><td data-l="À éviter">plantes gourmandes en eau : paillez et arrosez souvent</td><td data-l="À l'aise">plantes qui résistent à la sécheresse : ${listeNoms(P.filter(x=>x.sech===3))}</td></tr>
   </tbody></table>
   <p style="margin-top:20px"><strong>Une fois votre terre connue</strong>, indiquez-la dans « Mon jardin », ligne « Terre », sur la page de votre commune : les conseils s'adaptent à votre jardin.</p>`,
  method:""},
 {slug:"scion-gobelet-demi-tige-haute-tige-premiere-recolte",type:"Guide pratique",date:"25 novembre 2026",title:"Scion, gobelet, demi-tige ou haute-tige : quel arbre acheter, et quand récolterez-vous ?",
  lead:"La forme de l'arbre décide de sa taille adulte et de la facilité de cueillette. Pour la date de la première récolte, ce qui compte surtout, c'est le porte-greffe.",
  fig:figFormes, src:"Dessin Jardin Arena.",
  body:`<h2>En bref</h2>
   <ul class="bul">
    <li><strong>La forme</strong> (scion, basse-tige, demi-tige, haute-tige) fixe la hauteur du tronc et la taille de l'arbre adulte.</li>
    <li><strong>Le <span class="term" tabindex="0" role="button" data-def="Le pied sur lequel la variété est greffée : il décide surtout de la taille et de la vigueur de l'arbre.">porte-greffe</span></strong> décide surtout de la rapidité de la première récolte : faible vigueur = fruits plus tôt, arbre plus petit ; forte vigueur (franc) = fruits plus tard, arbre plus grand et plus durable.</li>
    <li><strong>Un arbre plus jeune reprend mieux</strong> et rattrape en quelques années un arbre planté plus gros.</li>
   </ul>
   <h2>Les formes vendues en pépinière</h2>
   <table class="stack gtab"><thead><tr><th>Forme</th><th>Tronc</th><th>Taille adulte</th><th>Pour qui</th></tr></thead><tbody>
    <tr><td data-l="Forme"><strong>Scion</strong></td><td data-l="Tronc">pas encore de branches</td><td data-l="Taille adulte">selon la forme que vous lui donnerez</td><td data-l="Pour qui">le moins cher ; vous choisissez la forme, mais il faut la former vous-même</td></tr>
    <tr><td data-l="Forme"><strong>Basse-tige</strong> (gobelet, quenouille)</td><td data-l="Tronc">environ 50 à 60 cm</td><td data-l="Taille adulte">3 à 4 m</td><td data-l="Pour qui">petit jardin, cueillette sans échelle</td></tr>
    <tr><td data-l="Forme"><strong>Demi-tige</strong></td><td data-l="Tronc">1,20 à 1,50 m</td><td data-l="Taille adulte">5 à 6 m</td><td data-l="Pour qui">jardin moyen ; on passe dessous, un escabeau suffit</td></tr>
    <tr><td data-l="Forme"><strong>Haute-tige</strong> (plein vent)</td><td data-l="Tronc">1,80 à 2 m</td><td data-l="Taille adulte">environ 8 m</td><td data-l="Pour qui">grand terrain, prairie ; on peut passer la tondeuse ou faire pâturer dessous</td></tr>
   </tbody></table>
   <p class="note">Les formes palissées (cordon, palmette, colonnaire) se plantent le long d'un mur ou d'un fil : elles prennent très peu de place mais demandent une taille régulière.</p>
   <h2>Ce qui décide de la première récolte : le porte-greffe</h2>
   <p>Le porte-greffe donne sa vigueur à l'arbre. Plus il est faible, plus l'arbre reste petit et plus il donne vite des fruits. Les demi-tiges et hautes-tiges sont en général greffées sur un porte-greffe vigoureux (le « franc ») : elles mettent donc plus longtemps à produire, mais vivent plus longtemps.</p>
   <table class="stack gtab"><thead><tr><th>Espèce</th><th>Porte-greffe</th><th>Vigueur</th><th>Première récolte</th></tr></thead><tbody>
    <tr><td data-l="Espèce">Pommier</td><td data-l="Porte-greffe">M9</td><td data-l="Vigueur">faible</td><td data-l="Première récolte"><span class="pf-ok-t">rapide à très rapide</span> ; sol sain et fertile, arrosage et tuteur obligatoires</td></tr>
    <tr><td data-l="Espèce">Pommier</td><td data-l="Porte-greffe">M106</td><td data-l="Vigueur">moyenne</td><td data-l="Première récolte"><span class="pf-ok-t">assez rapide</span> ; tout type de sol sauf trop humide</td></tr>
    <tr><td data-l="Espèce">Pommier</td><td data-l="Porte-greffe">Franc (semis)</td><td data-l="Vigueur">forte</td><td data-l="Première récolte"><span class="pf-mid-t">tardive</span> ; arbre durable, pour tige et demi-tige</td></tr>
    <tr><td data-l="Espèce">Poirier</td><td data-l="Porte-greffe">Cognassier</td><td data-l="Vigueur">faible</td><td data-l="Première récolte"><span class="pf-ok-t">très précoce</span> ; craint la sécheresse</td></tr>
    <tr><td data-l="Espèce">Poirier</td><td data-l="Porte-greffe">Franc</td><td data-l="Vigueur">forte</td><td data-l="Première récolte"><span class="pf-mid-t">tardive</span> ; arbre de 6 m et plus</td></tr>
    <tr><td data-l="Espèce">Pêcher</td><td data-l="Porte-greffe">Saint-Julien</td><td data-l="Vigueur">faible</td><td data-l="Première récolte"><span class="pf-ok-t">assez précoce</span> ; supporte les sols humides</td></tr>
    <tr><td data-l="Espèce">Pêcher</td><td data-l="Porte-greffe">Franc</td><td data-l="Vigueur">moyenne</td><td data-l="Première récolte"><span class="pf-mid-t">assez tardive</span> ; sol bien drainé</td></tr>
   </tbody></table>
   <p class="note">La vitesse de mise à fruit se décrit en termes généraux (« rapide », « tardive »), pas en nombre d'années précis : il dépend aussi de la variété, du sol et de l'entretien. Demandez une estimation à votre pépiniériste.</p>
   <h2>Jeune ou déjà grand à l'achat ?</h2>
   <p>Un arbre plus âgé (gobelet de 2 à 3 ans, demi-tige de 4 à 5 ans) a déjà ses branches : il vous évite la taille de formation. Mais <strong>plus un arbre est jeune, mieux il reprend</strong>, et sa croissance rapide lui permet de rattraper en quelques années un arbre planté plus gros. Pour un scion, prévoyez quelques années de formation avant les premiers fruits.</p>
   <p><strong>Racines nues ou conteneur ?</strong> Les arbres en racines nues offrent le meilleur rapport qualité-prix et permettent de voir les racines. Ils se plantent de novembre à mars, dès leur réception, ou se mettent en attente en couvrant les racines de terre.</p>
   <h2>Ce que ça change à Toulouse</h2>
   <ul class="bul">
    <li><strong>Petit jardin</strong> : basse-tige ou demi-tige sur porte-greffe moyen (M106 pour le pommier) : récolte assez rapide, arbre gérable.</li>
    <li><strong>Sol souvent argileux</strong> : le M9 et le cognassier, très précoces, demandent un sol sain et craignent la sécheresse l'été ; préférez un porte-greffe plus vigoureux si votre sol est lourd et que vous arrosez peu.</li>
    <li><strong>Près de la maison</strong> : sur sol argileux, plantez à au moins 1,5 fois la hauteur adulte de l'arbre (soit environ 12 m pour une haute-tige de 8 m) pour limiter le risque de fissures.</li>
   </ul>
   <h2>Les 4 questions à poser au pépiniériste</h2>
   <ol class="bul"><li>Quel âge a l'arbre ?</li><li>Quelle forme : scion, basse-tige, demi-tige, haute-tige ?</li><li><strong>Sur quel porte-greffe</strong> est-il greffé ?</li><li>Racines nues ou conteneur ?</li></ol>`,
  method:""},
 {slug:"gel-des-fleurs-abricotier-toulouse",type:"Guide chiffré",date:"21 novembre 2026",title:`Abricotier à Toulouse : choisissez une variété qui fleurit tard`,
  lead:`Depuis 1995, une gelée de −2 °C ou moins a suivi la floraison d'un abricotier précoce ${nGelRR} années sur 30. Pour un abricotier à floraison plus tardive, c'est ${nGelB} sur 30.`,
  fig:figGelFleurs,
  body:`<p>Un abricotier ne craint pas le froid de l'hiver. Ce qui ruine la récolte, c'est une gelée qui tombe quand il est déjà en fleurs. Nous avons cherché, pour chaque année depuis 1995, la date de la dernière gelée de −2 °C ou moins à la station de Toulouse-Blagnac, et nous l'avons comparée au début de floraison de deux variétés courantes.</p>
   <p>Le ‘Rouge du Roussillon’ fleurit vers le début mars : il a été exposé ${nGelRR} printemps sur 30. Le ‘Bergeron’ fleurit une dizaine de jours plus tard : il ne l'a été que ${nGelB} fois.</p>
   <p><strong>Ce que ça change pour vous :</strong> à Toulouse, préférez un abricotier à floraison tardive, plantez-le dans un endroit abrité, loin des creux où l'air froid stagne. Un voile d'hivernage posé les nuits de gel pendant la floraison peut sauver la récolte.</p>`,
  method:"Température minimale quotidienne sous abri, station Toulouse-Blagnac, 1995-2024. Seuil de −2 °C et dates de floraison indicatifs."},
 {slug:"chaleur-toulouse-30-degres",type:"Guide chiffré",date:"21 novembre 2026",title:`À Toulouse, ${C.d30B-C.d30A} jours de plus à 30 °C chaque été qu'il y a quinze ans`,
  lead:`${C.d30A} jours à 30 °C ou plus par an entre 1995 et 2009, ${C.d30B} depuis 2010. Les plantes qui craignent la chaleur souffrent davantage.`,
  fig:figChaleur,
  body:`<p>La station de Toulouse-Blagnac a relevé en moyenne ${C.d30A} jours à 30 °C ou plus par an de 1995 à 2009, et ${C.d30B} de 2010 à 2024. Les nuits chaudes (20 °C ou plus) sont passées de ${C.n20A} à ${C.n20B} par an. 2003 et 2022 dépassent les 65 jours.</p>
   <p><strong>Ce que ça change pour vous :</strong> les salades, épinards, radis et petits pois montent vite en graines l'été. Semez-les au printemps et à l'automne, ou à mi-ombre. Les tomates supportent la chaleur, mais leurs fleurs avortent au-delà de 35 °C : paillez et arrosez au pied, le soir.</p>`,
  method:"Température maximale quotidienne sous abri, station Toulouse-Blagnac, 1995-2024."},
 {slug:"quand-planter-tomates-toulouse",type:"Guide chiffré",date:"21 novembre 2026",title:`Tomates à Toulouse : plantez-les ${debutQuinzaine(NUITS10)}`,
  lead:`Les tomates ont besoin de nuits au-dessus de 10 °C. À Toulouse, la moyenne des nuits passe ce seuil ${debutQuinzaine(NUITS10)}, bien avant les « saints de glace » souvent cités.`,
  fig:figNuits,
  body:`<p>Planter trop tôt ne fait pas gagner de temps : sous 10 °C la nuit, les tomates, aubergines, poivrons et courges restent bloquées. À Toulouse, la température minimale moyenne atteint 8 °C en avril et 11,6 °C en mai.</p>
   <p><strong>Ce que ça change pour vous :</strong> semez sous abri en février-mars, sortez les plants ${debutQuinzaine(NUITS10)}. Si une nuit froide est annoncée après la plantation, couvrez d'un voile. Dans une commune plus fraîche, la date sera plus tardive : c'est pour cela que Jardin Arena la calcule commune par commune.</p>`,
  method:"Moyenne mensuelle des températures minimales, station Toulouse-Blagnac, 1995-2024 ; interpolation entre les milieux de mois."}
];
function pageActus(){
  return `<section class="blk tight"><div class="wrap fade">
    <p class="kicker">Guides</p><h1>Guides pour réussir vos plantations</h1>
    <p class="lead">Des conseils pratiques, appuyés sur les relevés Météo-France de votre commune quand c'est utile.</p>
    <div class="actus">
      <a class="actu" href="#fruitiers"><div class="athumb gfeat"><span class="av fruitier" style="width:72px;height:72px;border-radius:22px">${ICO.fruitier}</span><span class="gchips"><span class="flag pf-ok">Autofertile</span><span class="flag pf-mid">Partiellement autofertile</span><span class="flag pf-no">Autostérile</span></span></div><div class="abody"><span class="tag t-ok">Guide</span><h3>Arbres fruitiers : faut-il un pollinisateur ?</h3><p class="note">Variété par variété, s'il faut planter un deuxième arbre, et lequel.</p></div></a>
      ${ACTUS.map(a=>`<a class="actu" href="#actu-${a.slug}"><div class="athumb">${a.fig()}</div><div class="abody"><span class="tag t-ok">${a.type}</span> <span class="note">${a.date}</span><h3>${a.title}</h3><p class="note">${a.lead}</p></div></a>`).join("")}</div>
    <p class="note" style="margin-top:20px">Les guides chiffrés portent pour l'instant sur Toulouse ; ils seront déclinés pour d'autres villes. À venir : bien planter un arbre fruitier (trou, greffe hors sol, arrosage), que planter en sol argileux, plantes envahissantes à éviter.</p>
  </div></section>`;
}
function pageActu(a){
  const others=ACTUS.filter(x=>x!==a);
  return `<div class="wrap"><p class="crumb"><a href="#accueil">Accueil</a> › <a href="#guides">Guides</a></p></div>
  <article class="blk tight"><div class="wrap fade" style="max-width:820px">
    <p class="kicker">${a.type} · ${a.date}</p><h1 style="font-size:clamp(30px,4.2vw,44px)">${a.title}</h1>
    <p class="lead" style="max-width:none">${a.lead}</p>
    <figure class="figbox">${a.fig()}<figcaption class="note">${a.src?a.src:`Source : Météo-France. ${a.method}`}</figcaption></figure>
    <div class="prose">${a.body}</div>
    <p style="margin-top:28px"><a class="btn" href="${a.slug.startsWith("scion")?"#fruitiers":a.slug==="connaitre-sa-terre"?(villeMemo()?"#commune-"+villeMemo().slug:"#accueil"):"#commune-toulouse-31555"}">${a.slug.startsWith("scion")?"Voir les arbres fruitiers":a.slug==="connaitre-sa-terre"?"Indiquer ma terre":"Que planter à Toulouse ?"}</a></p>
    <h2 style="margin-top:56px;font-size:24px">À lire aussi</h2>
    <div class="actus two">${others.map(o=>`<a class="actu" href="#actu-${o.slug}"><div class="abody"><span class="tag t-ok">${o.type}</span><h3>${o.title}</h3></div></a>`).join("")}</div>
  </div></article>`;
}

/* ===================== À PROPOS ===================== */
function pageAPropos(){
  return `<section class="blk tight"><div class="wrap fade" style="max-width:860px">
   <p class="kicker">À propos</p><h1>Des conseils de plantation fondés sur des données</h1>
   <p class="lead" style="max-width:none">Jardin Arena répond à une question simple : que planter dans mon jardin ? La réponse dépend de votre commune : de ses gelées, de ses étés et de son sol. Nous les mesurons à partir des données publiques, puis nous croisons ces mesures avec les besoins de chaque plante.</p>
   <div class="prose">
   <h2>D'où viennent les chiffres</h2>
   <div class="srcs">
     <div class="src"><span class="flag pf-ok">Climat</span><h3>Météo-France</h3><p>Relevés quotidiens de la station la plus proche, sur les 30 dernières années complètes. Licence Ouverte.</p></div>
     <div class="src"><span class="flag pf-mid">Sol</span><h3>Cartes des sols</h3><p>Carte officielle d'exposition au retrait-gonflement des argiles (2026), la même qu'Argile Arena, et carte des sols de France (INRAE) pour la tendance calcaire ou acide.</p></div>
     <div class="src"><span class="flag pf-no">Plantes</span><h3>Catalogue Jardin Arena</h3><p>Rusticité, floraison, pollinisation, goût : chaque valeur sera sourcée et datée (instituts de recherche, conservatoires, pépiniéristes).</p></div>
   </div>
   <h2>Comment on décide qu'une plante est un bon choix</h2>
   <p><strong>Froid</strong> : nombre d'hivers où il a fait plus froid que ce que la plante supporte. <strong>Gel des fleurs</strong> : nombre d'années avec une gelée de −2 °C ou moins après le début de la floraison (10 % des années : précaution ; 30 % : à éviter). <strong>Chaleur et sécheresse</strong> : jours à 30 °C ou plus, pluie de juin à août. <strong>Sol</strong> : la carte officielle, connue dès que vous tapez votre commune. <strong>Ensoleillement</strong> : votre réponse, la seule chose que nous ne pouvons pas deviner.</p>
   <p>Le point le plus défavorable l'emporte. C'est une indication, pas une garantie : un mur au sud, un creux ou l'arrosage changent beaucoup les choses.</p>
   <h2>Nos engagements</h2>
   <ul class="engs"><li>Aucun classement payé : une plante est conseillée parce qu'elle convient, jamais parce qu'un vendeur paie.</li><li>Aucune inscription pour consulter les conseils.</li><li>Chaque chiffre a une source, et nous signalons ce que les données ne permettent pas de dire.</li><li>Une erreur ? Écrivez-nous, nous corrigeons sous quelques jours.</li></ul>
   <h2>Les sites Arena</h2>
   <p>Jardin Arena fait partie d'une famille de sites indépendants qui rendent les données publiques utiles : <a href="https://argilearena.fr/">Argile Arena</a> (risque de fissures), <a href="https://ehpadarena.fr/">EHPAD Arena</a>, <a href="https://scolarena.fr/">Scol Arena</a>, <a href="https://eauarena.fr/">Eau Arena</a> et <a href="https://jobarena.org/">Job Arena</a>.</p>
   <p class="note">Contact : contact@jardinarena.fr (adresse à créer).</p>
   </div>
  </div></section>`;
}

/* ===================== ROUTEUR ET FICHE EN SURIMPRESSION ===================== */
/* ===================== PAGES D'ENTRÉE (recherche) ===================== */
const ESPECES={
  tomate:{lbl:"les tomates",titre:"tomates",match:p=>/^Tomate/.test(p.nom),assoc:["basilic","persil","carotte","laitue"],eviter:["pomme-de-terre"],
    eviterTxt:"La pomme de terre attrape le même mildiou que la tomate : gardez-les éloignées."},
  pommier:{lbl:"un pommier",titre:"pommier",match:p=>p.nom==="Pommier"},
  figuier:{lbl:"un figuier",titre:"figuier",match:p=>p.nom==="Figuier"},
  "pomme-de-terre":{lbl:"les pommes de terre",titre:"pommes de terre",match:p=>p.nom==="Pomme de terre"},
  courgette:{lbl:"les courgettes",titre:"courgettes",match:p=>p.nom==="Courgette"},
  oignon:{lbl:"les oignons",titre:"oignons",match:p=>p.nom==="Oignon"},
  ail:{lbl:"l'ail",titre:"ail",match:p=>p.nom==="Ail"},
  fraisier:{lbl:"les fraisiers",titre:"fraisiers",match:p=>p.nom==="Fraisier"},
  lavande:{lbl:"la lavande",titre:"lavande",match:p=>p.nom==="Lavande"}
};
const especeDe=p=>Object.keys(ESPECES).find(k=>ESPECES[k].match(p));
const moisSlug=n=>norm(MOIS[n-1]);
const pourMois=(n)=>P.filter(p=>((p.plant||[]).includes(n)||(p.semis||[]).includes(n)||(p.tendre&&n===Math.ceil(new Date(Date.UTC(2025,0,NUITS10)).getUTCMonth()+1)))&&verdict(p).lvl!=="bad");
const SAISON_FRUITIERS=[11,12,1,2,3];

function pageMois(c,n){
  const L=pourMois(n), suiv=n%12+1, Ls=pourMois(suiv).filter(p=>!L.includes(p));
  const grp=CATORD.map(cat=>[cat,L.filter(p=>p.cat===cat)]).filter(x=>x[1].length);
  const now=n===MOIS_COURANT, avant=n===MOIS_COURANT%12+1;
  const fr=L.filter(p=>p.cat==="fruitier").length;
  return `<div class="wrap"><p class="crumb"><a href="#accueil">Accueil</a> › <a href="#commune-${c.slug}">${c.nom}</a> › Que planter en ${MOIS[n-1]}</p></div>
  <section class="blk tight" style="padding-bottom:8px"><div class="wrap fade">
    <h1>Que planter en ${MOIS[n-1]} à ${c.nom} ?</h1>
    <p class="lead">${L.length} plantes qui réussissent à ${c.nom} et se plantent ou se sèment en ${MOIS[n-1]}${now?", c'est-à-dire maintenant":avant?", le mois prochain : de quoi préparer":""}. Choisies d'après le climat et le sol de la commune.</p>
    <nav class="mchips" aria-label="Choisir un mois">${MOIS.map((m,i)=>`<a href="#que-planter-en-${moisSlug(i+1)}-${c.slug}" class="${i+1===n?"on":""}${i+1===MOIS_COURANT?" now":""}">${["janv.","févr.","mars","avril","mai","juin","juil.","août","sept.","oct.","nov.","déc."][i]}</a>`).join("")}</nav>
  </div></section>
  ${fr&&SAISON_FRUITIERS.includes(n)?`<section class="blk tight" style="padding-top:8px;padding-bottom:0"><div class="wrap"><div class="seasonbox">
    ${SSR?"":`<span class="av fruitier" style="width:54px;height:54px;border-radius:16px">${ICO.fruitier}</span>`}
    <div><h2>C'est la saison des arbres fruitiers</h2><p>De novembre à mars, plantez les fruitiers en racines nues, hors jours de gel et de sol détrempé. « À la Sainte-Catherine, tout bois prend racine » : un arbre planté maintenant s'enracine tout l'hiver et démarre mieux au printemps.</p>
    <p style="margin-top:10px"><a href="#fruitiers">Vérifier les pollinisateurs avant d'acheter</a></p></div></div></div></section>`:""}
  <section class="blk tight"><div class="wrap">
    ${grp.map(([cat,arr])=>`<div class="group"><div class="group-h"><h2>${CATL[cat]}</h2><span class="pill tag t-ok">${arr.length}</span></div>${SSR?`<ul class="plite">${arr.map(p=>ligneLite({p})).join("")}</ul>`:`<div class="plist">${arr.map(p=>carte(p,verdict(p))).join("")}</div>`}</div>`).join("")||`<div class="empty">Rien à planter ce mois-ci dans le catalogue de la maquette.</div>`}
  </div></section>
  ${Ls.length?`<section class="blk soft"><div class="wrap">
    <p class="kicker">Pour prendre de l'avance</p><h2>À préparer pour ${MOIS[suiv-1]}</h2>
    <p class="note" style="margin-top:6px">Commandez les plants ou les graines, préparez la terre.</p>
    <div class="month" style="margin-top:22px">${Ls.map(p=>`<a href="#plante-${p.id}">${SSR?"":thumb(p)}<span><strong>${p.nom}</strong><small>‘${p.variete}’</small></span></a>`).join("")}</div>
    <a class="month-cta" href="#que-planter-en-${moisSlug(suiv)}-${c.slug}">Que planter en ${MOIS[suiv-1]} <i>→</i></a>
  </div></section>`:""}
  <section class="blk"><div class="wrap"><a class="month-cta" href="#commune-${c.slug}">Toutes les plantes qui réussissent à ${c.nom} <i>→</i></a></div></section>`;
}

const moisLong=s=>s.replace(/\b(janv|févr|avr|juil|sept|oct|nov|déc)\./g,m=>({"janv.":"janvier","févr.":"février","avr.":"avril","juil.":"juillet","sept.":"septembre","oct.":"octobre","nov.":"novembre","déc.":"décembre"})[m]);
function pageQuand(c,k){
  const E=ESPECES[k], L=P.filter(E.match); if(!L.length)return pageAccueil();
  const p=L[0], tendre=p.tendre;
  const date=quandPlanter(p);
  const saints=133, ecart=tendre&&NUITS10?Math.round((saints-NUITS10)/7):0;
  const lastD=fmtDoy(C.lastMed), last9=fmtDoy(C.lastD9);
  const tiles=[p.semis&&p.semis.length?["Semis à l'abri",moisRange(p.semis)]:null,["Plantation en pleine terre",tendre?debutQuinzaine(NUITS10):moisRange(p.plant||[])],p.recolte&&p.recolte.length?["Récolte",moisRange(p.recolte)]:null].filter(Boolean);
  const A=(E.assoc||[]).map(byId).filter(Boolean), X=(E.eviter||[]).map(byId).filter(Boolean);
  return `<div class="wrap"><p class="crumb"><a href="#accueil">Accueil</a> › <a href="#commune-${c.slug}">${c.nom}</a> › Quand planter ${E.lbl}</p></div>
  <section class="blk tight" style="padding-bottom:8px"><div class="wrap fade" style="max-width:960px">
    <h1>Quand planter ${E.lbl} à ${c.nom} ?</h1>
    <div class="answer"><span class="vicon ok">✓</span><div>
      <div class="big">À ${c.nom}, plantez ${E.lbl} ${tendre?date:"de "+moisLong(moisRange(p.plant||[])).replace(" → "," à ")}.</div>
      <p style="margin-top:6px">${tendre?`C'est le moment où les nuits ne descendent plus sous 10 °C en moyenne à ${c.nom}. ${ecart>0?`Environ ${ecart} semaine${ecart>1?"s":""} plus tôt que le conseil national des Saints de glace (mi-mai).`:""}`:`Hors jours de gel et de sol détrempé. Plus tôt dans la saison, mieux l'arbre s'enracine avant l'été.`}</p>
    </div></div>
    <div class="keys" style="grid-template-columns:repeat(${tiles.length},1fr)">${tiles.map(([a,b])=>`<div class="key"><div class="k">${a}</div><div class="v">${b}</div></div>`).join("")}</div>
  </div></section>
  <section class="blk tight"><div class="wrap" style="max-width:960px">
    <h2>Pourquoi cette date à ${c.nom}</h2>
    <ul class="reasons">${tendre?`
      <li><span class="dot info"></span><span>${C.gelRare?`Les gelées de printemps sont rares : aucune ${C.sansGel} années sur ${C.n}`:`La dernière gelée tombe en moyenne vers le <b>${lastD}</b>, et 9 années sur 10 avant le <b>${last9}</b>`} (Météo-France, station ${c.station}, ${C.y0}-${C.y1}).</span></li>
      <li><span class="dot info"></span><span>${p.nom==="Tomate"?"La tomate":"Cette plante"} ne pousse vraiment qu'avec des nuits au-dessus de 10 °C : à ${c.nom}, c'est ${debutQuinzaine(NUITS10)}. Planter plus tôt ne fait pas gagner de temps.</span></li>
      <li><span class="dot warn"></span><span>Si une nuit froide est annoncée après la plantation, couvrez d'un voile d'hivernage.</span></li>`:`
      <li><span class="dot info"></span><span>L'arbre doit être en repos (sans feuilles) : de novembre à mars à ${c.nom}.</span></li>
      ${argNiveau(c)==="souvent argileux"?`<li><span class="dot info"></span><span>Le sol est souvent argileux à ${c.nom} : évitez de planter juste après de fortes pluies, quand la terre colle.</span></li>`:""}`}
    </ul>
    <h2 style="margin-top:48px">Quelle variété à ${c.nom}</h2>
    <div class="plist" style="margin-top:18px">${L.map(q=>carte(q,verdict(q))).join("")}</div>
    ${A.length?`<h2 style="margin-top:48px">Que planter à côté des ${E.titre}</h2>
    <div class="partners" style="margin-top:14px">${A.map(q=>`<a class="partner" href="#plante-${q.id}">${thumb(q)}${q.nom}</a>`).join("")}</div>
    ${X.length?`<p class="note" style="margin-top:14px"><b>À éloigner :</b> ${X.map(q=>q.nom.toLowerCase()).join(", ")}. ${E.eviterTxt||""}</p>`:""}`:""}
  </div></section>
  <section class="blk tight" style="padding-top:0"><div class="wrap" style="max-width:960px;display:flex;gap:10px;flex-wrap:wrap">
    <a class="month-cta" href="#que-planter-en-${moisSlug(MOIS_COURANT)}-${c.slug}">Que planter en ${MOIS[MOIS_COURANT-1]} à ${c.nom} <i>→</i></a>
    <a class="month-cta" href="#commune-${c.slug}">Toutes les plantes pour ${c.nom} <i>→</i></a></div></section>`;
}

function pageFor(h){return fixLinks(pageFor0(h));}
function pageFor0(h){let m;
  if((m=h.match(/^commune-(.+)$/))){return COM&&COM.slug===m[1]?pageCommune(COM):pageAccueil();}
  if((m=h.match(/^plante-(.+)$/))){const p=byId(m[1]);return p?pagePlante(p):pageAccueil();}
  if((m=h.match(/^que-planter-en-([a-z]+)-(.+)$/))){const n=MOIS.findIndex(x=>norm(x)===m[1])+1,c=COM&&COM.slug===m[2]?COM:null;if(n&&c)return pageMois(c,n);}
  if((m=quandSplit(h))){const c=COM&&COM.slug===m[2]?COM:null;if(c&&ESPECES[m[1]])return pageQuand(c,m[1]);}
  if(h==="fruitiers")return pageFruitiers();
  if(h==="guides"||h==="actualites")return pageActus();
  if((m=h.match(/^actu-(.+)$/))){const a=ACTUS.find(x=>x.slug===m[1]);return a?pageActu(a):pageActus();}
  if(h==="a-propos"||h==="methode")return pageAPropos();
  return pageAccueil();}


/* Mémoire de la dernière ville (sur l'appareil seulement) */
const VK="jardinarena-ville";
// on garde de quoi retrouver la commune et son climat : {slug, nom, cp, pop, key}
function villeMemo(){try{const s=JSON.parse(localStorage.getItem(VK)||"null");return s&&s.slug&&s.key?s:null}catch(e){return null}}
function retenirVille(c){try{if(c&&c.slug&&c.key)localStorage.setItem(VK,JSON.stringify({slug:c.slug,nom:c.nom,cp:c.cp,pop:c.pop,key:c.key,data:c.data||null}))}catch(e){}}

/* ===================== MÉTADONNÉES DES PAGES ===================== */
function metaFor(h){ let m; const T=" | Jardin Arena";
  if(h==="accueil") return {title:"Que planter dans mon jardin ? Conseils pour votre commune"+T,desc:"Les arbres fruitiers, légumes et plantes qui réussiront dans votre jardin, d'après le climat relevé par Météo-France et les cartes officielles des sols."};
  if((m=h.match(/^commune-(.+)$/))){const c=COM;return {title:`Que planter à ${c.nom} ? Fruitiers, légumes, fleurs`+T,desc:`Ce qui réussit dans un jardin à ${c.nom} (${c.cp}) : gelées, chaleur et sol de la commune, plante par plante.`};}
  if((m=h.match(/^que-planter-en-([a-z]+)-(.+)$/))){const c=COM;const n=MOIS.findIndex(x=>norm(x)===m[1]);return {title:`Que planter en ${MOIS[n]} à ${c.nom} ?`+T,desc:`Les plantations et semis de ${MOIS[n]} à ${c.nom}, adaptés au climat de la commune.`};}
  if((m=quandSplit(h))){const c=COM;const e=ESPECES[m[1]];return {title:`Quand planter ${e.lbl} à ${c.nom} ?`+T,desc:`La bonne période pour planter ${e.lbl} à ${c.nom}, d'après les gelées et les températures relevées par Météo-France.`};}
  if((m=h.match(/^plante-(.+)$/))){const p=byId(m[1]);return {title:`${p.nom} ‘${p.variete}’ : où et quand le planter`+T,desc:`${p.nom} ‘${p.variete}’ : ensoleillement, plantation, récolte, pollinisation, froid supporté, et s'il réussira dans votre commune.`};}
  if(h==="fruitiers") return {title:"Faut-il un pollinisateur à mon arbre fruitier ?"+T,desc:"Autofertile ou pas : variété par variété, faut-il planter un deuxième arbre, et lequel."};
  if(h==="guides") return {title:"Guides pour réussir vos plantations"+T,desc:"Guides pratiques et chiffrés : gel des fleurs, chaleur, formes d'arbres, connaître sa terre."};
  if((m=h.match(/^actu-(.+)$/))){const a=ACTUS.find(x=>x.slug===m[1]);return {title:a.title.replace(/<[^>]+>/g,"")+T,desc:a.lead.replace(/<[^>]+>/g,"").slice(0,155)};}
  if(h==="a-propos") return {title:"À propos de Jardin Arena"+T,desc:"D'où viennent les données et comment nous décidons qu'une plante est un bon choix."};
  return {title:"Jardin Arena",desc:""}; }
// Pages sans commune (la liste des communes vient des données, côté construction)
function pagesGenerales(){ return ["accueil","fruitiers","guides","a-propos",...P.map(p=>"plante-"+p.id),...ACTUS.map(a=>"actu-"+a.slug)]; }
function pagesCommune(c){ const ids=["commune-"+c.slug]; if(extra(c)){ MOIS.forEach(x=>ids.push(`que-planter-en-${norm(x)}-${c.slug}`)); Object.keys(ESPECES).forEach(k=>ids.push(`quand-planter-${k}-${c.slug}`)); } return ids; }
export { setCommune, setToulouseRef, vueCommune, extra, pagesGenerales, pagesCommune, quandSplit, villeMemo, retenirVille, ESPECES, pageFor, metaFor, url, idFromPath, fixLinks, byId, pagePlante, P, CATL, shortPort, MOIS, MOIS_COURANT, moisSlug, norm, W, $, TOULOUSE_REF, REF_Y, REF_M, REF_G };
