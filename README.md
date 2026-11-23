# OZHB — Frontend

Maquette frontend responsive de l'Observatoire des Zones Humides du Bénin.

## Démarrage
- Décompresser le dossier.
- Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur local depuis ce dossier : `python -m http.server 8000` puis visiter `http://localhost:8000`.

## Technologies
- HTML5, CSS3, JavaScript vanilla
- Leaflet 1.9.4 pour la carte interactive
- Fonds cartographiques OpenStreetMap
- Google Fonts (Manrope et DM Sans)

## Fonctionnalités de démonstration
- Navigation responsive avec menu mobile
- Sections : accueil, zones humides, cartographie, publications, recherche, biodiversité, menaces, conservation, à propos et contact
- Recherche des sites et filtre par département
- Fiches de sites dans une fenêtre modale
- Carte interactive avec marqueurs et zoom sur les sites
- Formulaire de contact côté navigateur (aucun envoi réel)

## Important — limites de cette livraison
Ceci est uniquement le frontend. Il n'y a pas de backend, base de données, authentification, espace administrateur, téléversement de fichiers ni envoi réel de formulaires. Les sites, points cartographiques et publications sont des exemples de présentation ; leurs coordonnées et contenus doivent être vérifiés et validés avant publication. La carte et les polices distantes nécessitent une connexion internet.

## Personnalisation
- Styles : `style.css`
- Interactions et données de démonstration : `script.js`
- Structure des pages : `index.html`
