# Lien Direct
https://nicowithmanyo.github.io/Alex/

# Planning Équipes 2x8 et 5x8

Une application web pour gérer les plannings d'équipes en 2x8 et 5x8 avec un calendrier dynamique.

## Fonctionnalités

### Colonne Calendrier (Gauche)
- Affichage dynamique des jours avec date complète
- Génération automatique de 30 jours supplémentaires lors du scroll
- Format français (jour de la semaine + date complète)

### Colonne Équipe 2x8 (Centre)
- Alternance hebdomadaire : semaine matin / semaine après-midi
- Couleurs différenciées : bleu pour matin, rouge pour après-midi

### Colonne Équipe 5x8 (Droite)
- Cycle fixe de 10 jours : 6 jours de travail + 4 jours de repos
- Séquence : Matin, Matin, AM, AM, Nuit, Nuit, Repos, Repos, Repos, Repos
- Couleurs différenciées :
  - Matin : Bleu (`#3498db`)
  - Après-midi (AM) : Vert (`#2ecc71`)
  - Nuit : Marron/jaune (`#b48a00`)
  - Repos : Gris/transparent (`#555`)

## Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Le planning commence automatiquement à partir d'aujourd'hui
3. Faites défiler pour voir plus de jours (génération automatique)
4. Les trois colonnes restent synchronisées lors du scroll

## Fonctions JavaScript disponibles

### Changer la date de début
```javascript
setStartDate("2024-01-15"); // Format YYYY-MM-DD
```

### Obtenir les informations du planning
```javascript
getPlanningInfo(); // Retourne le nombre de jours et les dates de début/fin
```

## Structure des fichiers

- `index.html` : Structure HTML principale
- `styles.css` : Styles CSS avec design responsive
- `calendar.js` : Module de gestion du calendrier
- `team-2x8.js` : Module de gestion de l'équipe 2x8
- `team-5x8.js` : Module de gestion de l'équipe 5x8
- `main.js` : Initialisation et synchronisation

## Technologies utilisées

- HTML5
- CSS3 (Flexbox, responsive design)
- JavaScript natif (modules, événements, DOM manipulation)

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Design responsive pour mobile et desktop
- Fonctionne sans connexion internet 