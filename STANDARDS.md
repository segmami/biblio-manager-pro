# Standards de développement — Biblio Manager Pro

Ce document définit les règles techniques du projet afin de garder un code **simple, maintenable, sécurisé**
et adapté au **travail en équipe**.

---

## 1. Structure des fichiers
Le projet respecte la séparation des responsabilités :

- `index.html` : structure + contenu
- `css/style.css` : styles
- `js/app.js` : logique JavaScript

Règles :
- Aucun code CSS ou JS directement dans le HTML.
- Indentation propre et cohérente dans tous les fichiers.

---

## 2. Standards de nommage

### HTML
- `id` et `class` en **kebab-case**  
  Exemple : `book-card`, `search-input`

### CSS
- Sélecteurs en **kebab-case**

### JavaScript
- Variables en **camelCase**  
  Exemple : `bookList`, `currentId`
- Constantes en **UPPER_SNAKE_CASE**  
  Exemple : `STORAGE_KEY`
- Fonctions en **camelCase**  
  Exemple : `addBook()`, `loadDatabase()`
- Noms non explicites interdits : `x`, `stuff`, `Thing`, `inp_A`, etc.

---

## 3. JavaScript moderne (ES6+)
- Interdiction de `var` → utiliser `let` et `const`
- Interdiction de `eval()` (sécurité)
- Utilisation obligatoire de `addEventListener()`  
  (pas de `onclick=...` dans le HTML)
- Fonctions fléchées `() => {}` autorisées si lisibles
- Code structuré en petites fonctions réutilisables
- Utilisation de `JSON.parse()` / `JSON.stringify()` pour le stockage

---

## 4. Sécurité du code
- Ne jamais insérer des données utilisateur dans le DOM sans précaution
- Interdiction de concaténer du HTML avec des données brutes
- Interdiction de `localStorage.clear()`  
  → supprimer uniquement la clé utilisée
- Validation des champs obligatoires côté JavaScript

---

## 5. Formatage et lisibilité
- Indentation cohérente (2 ou 4 espaces) dans tout le projet
- Commentaires seulement si utiles et non répétitifs
- Pas de code mort, doublons ou `console.log` inutiles
- Structure logique du code :
  - Chargement des données
  - Validation
  - Affichage
  - Suppression
  - Recherche

---

## 6. Fonctionnalités à conserver (refactoring)
Toute amélioration interne doit conserver exactement :
- Ajout d’un livre
- Affichage
- Suppression (soft delete)
- Recherche
- Persistance dans `localStorage`

Aucune nouvelle fonctionnalité n’est ajoutée : amélioration **interne uniquement**.

---

## 7. Objectif général
Produire un code :
- Simple
- Maintenable
- Sécurisé
- Cohérent
- Normalisé
- Propre pour le travail en équipe
