# tuyo

## Concept

Tuyo est un générateur d'itinéraires de voyage avec des recommandations de la part d'habitants locaux !
Il permet de planifier votre journée selon les conseils avisés des adeptes de votre prochaine destination.

[Wireframes disponibles](https://whimsical.com/tuyo-SRe1iRjrV6aU6f6jEGtBnV)

## Fonctionnalités

La page d'accueil est visible par tous les utilisateurs. Une barre de recherche permet de filter la zone géographique de votre destination.
Les conseils s'affichent et sont triés selon la popularité avec la possibilité d'affiner la recherche selon des catégories prédéfinies.
Chaque "tip" contient un titre, une localisation, une description, un nombre de vote et une recommandation du temps à consacrer à l'activité.

L'utilisateur inscrit et connecté (authentification au choix via google, facebook ou email ) peut ajouter des tips dans ses favoris. L'affichage de carte interactive lui permet de toutes les visualiser afin d'évaluer les distances et faciliter sa prise de décision pour la journée.  

La page d'itinéraire permet à l'utilisateur connecté de construire un itinéraire d'une journée basé sur les 'tips' sélectionnés préalablement.
Il peut aussi réorganiser l'emploi du temps grâce à un système de glisser-déposer, le sauvegarder et l'exporter (en format PDF ou sur son Google Calendar).

## Technologies

Tuyo est une Single Page Application développée avec Node.js, Express, Postgresql (ORM Sequelize) pour le Back, React.js, Redux et SASS pour le Front.
La fonction de recherche utilise l'API de Geolocation Leaflet.js avec Here pour le géocoding.
Le glisser-deposer de l'itinéraire s'effectue grâce au package react-sortable.

## Preview
![tuyo-home](https://github.com/kamilduvert/tuyo/blob/master/Capture.PNG)
