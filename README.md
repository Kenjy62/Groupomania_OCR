# C'est quoi Groupomania ?

Groupomania est un réseau social d'entreprise réaliser dans le cadre d'une formation che OpenClassRooms

## Technologies Utilisées

### `React`

### `Socket.IO`

### `NodeJS`

### `MongoDB`

## Démarrer le projet

\
Cloner le projet avec :

### `git clone`

Déplacer vous dans le dossier cloner et installer les dépendances avec :

### `npm install`

Déplacer vous ensuite dans le dossier backend et installer les dépendances avec :

### `npm install`

Ouvrer maintenant le fichier .env est configurer de la façon suivante

IP > localhost ou votre adresse IP local si vous souhaitez tester le projet sur plusieurs appareils connecter au même réseau
\
\
DBUSER > Votre nom d'utilisateur de base de donnée Mongo (nécessite son installation si ce n'est pas déjà fait)
\
\
DBPWD > Votre mot de passe de base de donnée Mongo
\
\
DBCLUSTER > L'adresse url de la base de donnée (local ou distante)
\
\
DBNAME > Nom de la base de donnée (Groupomania en l'occurence)

## Sauvegarder !

\
\

## Définir l'adresse de l'API pour le frontend

Rendez vous dans src/utils/api.jsx et définir burl avec :
\
\
http://localhost:3000/api si vous avez choisie de définir localhost comme adresse pour le backend
\
\
http://IPLOCAL:3000/api si vous avez définit une adresse IP local

\
En étant dans le dossier backend taper la commande :

### `npm start`

Maintenant, en étant à la racine du projet tapper la commande :

### `npm start`

Votre navigateur ouvrira automatiquement le projet (ou taper simplement dans un navigateur localhost:3001 ou VOTREIPLOCAL:3001)

## Enjoy!
