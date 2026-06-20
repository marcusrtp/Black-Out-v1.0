# Publication GitHub Pages

Ce projet est une application statique : il n'y a pas de build, pas de dépendance npm et pas d'import de module fragile.

## Dossier à publier

Publier le contenu du dossier `publish/`.

Le dossier contient :

- `index.html`
- `styles.css`
- `rooms.css`
- `game-polish.css`
- `dialogues.js`
- `puzzles.js`
- `script.js`
- `.nojekyll`
- `assets/`

## Mise à jour après modification

Quand une modification est faite à la racine du projet, copier dans `publish/` les fichiers concernés :

- HTML : `index.html`
- CSS : `styles.css`, `rooms.css`, `game-polish.css`
- JS : `dialogues.js`, `puzzles.js`, `script.js`
- Images : uniquement les assets nécessaires dans `publish/assets/`

## Cache navigateur

Les fichiers chargés par `index.html` utilisent un paramètre `?v=...`.
Changer cette valeur après une modification force GitHub Pages et le navigateur à recharger la bonne version.

Version actuelle : `room-elements-aligned`.
