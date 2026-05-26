# Switch — Local commercial roulant

> Un local. Plusieurs commerces. Zéro chaos.

Switch est une infrastructure physique et logicielle qui permet à plusieurs commerçants d'opérer dans un même local, selon les heures, les jours ou les saisons.

Ce repo contient :

- la **spec concept** dans `docs/concept_local_commercial_roulant_specs.md` ;
- une **démo statique** illustrant le concept, publiée via GitHub Pages depuis `docs/`.

## Démo en ligne

👉 **[Voir la démo](https://chtabay.github.io/Switch/)**

La démo compte 4 pages :

| Page | Fichier | Contenu |
|------|---------|---------|
| Accueil / Concept | `docs/index.html` | Hero interactif jour/soir, problème, solution, journée type, bénéfices |
| Démo d'un local | `docs/demo.html` | Timeline détaillée, avant/après, zones, checklist de switch, incidents |
| Marketplace | `docs/marketplace.html` | 6 packs, catalogue produits, configurateur, devis simulé |
| Back-office | `docs/backoffice.html` | KPIs, planning hebdo, fiches opérateurs, configurations, historique |

## Lancer en local

Aucun build. Servir le dossier `docs/` :

```bash
python -m http.server 8080 --directory docs
# puis ouvrir http://localhost:8080
```

ou ouvrir directement `docs/index.html` dans le navigateur.

## Structure

```
docs/
├── index.html              # Accueil / concept
├── demo.html               # Démo d'un local
├── marketplace.html        # Packs, produits, configurateur, devis
├── backoffice.html         # Planning, opérateurs, configs, historique
├── .nojekyll               # Désactive le pipeline Jekyll de GH Pages
├── concept_local_commercial_roulant_specs.md
└── assets/
    ├── css/style.css       # Design system Switch
    └── js/main.js          # Interactions communes
```

## Stack

- HTML / CSS / JS vanille — aucun build, aucune dépendance NPM.
- Police [Inter](https://rsms.me/inter/) chargée via CDN.
- Hébergement GitHub Pages depuis `main` / `docs`.

## Statut

Démo concept — données fictives. Voir `docs/concept_local_commercial_roulant_specs.md`
pour les questions à approfondir et le backlog MVP.
