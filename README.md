🛒 Site E-commerce - Projet Collaboratif

Site de vente en ligne développé avec Vue.js (Vue CLI), Node.js (Express.js, ESM) et MongoDB.

📋 Technologies utilisées

Frontend : Vue.js 3 (Vue CLI), Vue Router, Pinia (optionnel), Tailwind CSS

Backend : Node.js, Express.js, JWT, Multer, Dotenv, CORS

Base de données : MongoDB avec Mongoose

Outils : Git, Nodemon (dev), Docker (optionnel)

🚀 Installation et configuration
🔑 Prérequis

Assurez-vous d’avoir installé :

-> Node.js (v18+)

-> MongoDB Community
   ou MongoDB Atlas

-> Git

-> Vue CLI
   (npm install -g @vue/cli)

-> VS Code (recommandé)


1. Cloner le projet
git clone https://github.com/Evrard-Noumbi-3il/ecommerce-app.git
cd ecommerce-project


2. Structure du projet
ecommerce-project/
├── frontend/              # Application Vue.js (Vue CLI)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vue.config.js
├── backend/               # API Node.js (ESM)
│   ├── src/
│   │   ├── index.js       # Point d'entrée serveur
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── package.json
│   
├── .gitignore
└── README.md

🔧 Configuration Backend
1. Installer les dépendances
cd backend
npm install

2. Configurer les variables d'environnement

Contenu du fichier .env à créer sur /Backend/.env :

        # Port du serveur
        PORT=3000

        # Base de données MongoDB
        MONGO_URI=mongodb://localhost:27017/ecommerce

        # JWT Secret
        JWT_SECRET=kanope

        # CORS (Frontend)
        CORS_ORIGIN=http://localhost:8080

        # Environnement
        NODE_ENV=development


3. Démarrer MongoDB

Option 1 - MongoDB local :

# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# ou
brew services start mongodb/brew/mongodb-community


Option 2 - MongoDB Atlas :

Créer un cluster sur MongoDB Atlas

Récupérer l’URI de connexion

Remplacer MONGO_URI dans .env



4. Démarrer le serveur backend
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start


👉 Le backend sera disponible sur : http://localhost:3000/api




🎨 Configuration Frontend

1. Installer les dépendances
cd frontend
npm install



2. Configurer les variables d'environnement

Créer un fichier .env dans frontend/ et dont le contenu sera:

        VUE_APP_API_URL=http://localhost:3000/api
        VUE_APP_NAME=MonShop



3. Démarrer l’application frontend
# Mode développement
npm run serve

# Build pour production
npm run build


👉 Le frontend sera disponible sur : http://localhost:8080
    et vous devez voir le message "Backend fonctionne 🚀"




🐳 Installation avec Docker (Optionnel)
1. Prérequis

    Docker

    Docker Compose



2. Lancer l’environnement complet
    docker-compose up -d


Cela démarre :

        MongoDB sur le port 27017

        Backend sur le port 3000

        Frontend sur le port 8080

3. Arrêter l’environnement
    docker-compose down




📚 Scripts disponibles

Backend
npm start          # Démarrer le serveur
npm run dev        # Mode développement (nodemon)
npm test           # Lancer les tests (à configurer)
npm run lint       # Vérifier le code

Frontend
npm run serve      # Serveur de développement
npm run build      # Build pour production
npm run lint       # Vérifier le code
npm test           # Lancer les tests (à configurer)



🔑 Comptes de test (optionnel)

Vous pouvez créer des seeds pour initialiser des comptes de test dans le fichier /Backend/seed.js :



🛠️ Développement
Workflow Git recommandé
# 1. Créer une nouvelle branche
git checkout -b feature/nom-fonctionnalite

# 2. Développer et commiter
git add .
git commit -m "feat: ajout de la fonctionnalité X"

# 3. Pousser la branche
git push origin feature/nom-fonctionnalite

# 4. Créer une Pull Request

Convention de commits

feat: nouvelle fonctionnalité

fix: correction de bug

docs: documentation

style: formatage

refactor: refactorisation

test: ajout/modif de tests

chore: maintenance




🧪 Tests
Lancer les tests
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test




🚨 Dépannage
1. Erreur de connexion MongoDB
sudo systemctl status mongod

2. Port déjà utilisé
lsof -ti:3000 | xargs kill -9

3. Modules non trouvés
rm -rf node_modules package-lock.json
npm install

4. Erreurs CORS

Vérifier que dans frontend/.env :

VUE_APP_API_URL=http://localhost:3000/api




🤝 Contribution

Fork du projet

Créer une branche

Commit et push

Ouvrir une Pull Request

📄 Licence

Ce projet est sous licence MIT.

💡 Happy Coding avec Vue CLI + Node.js + MongoDB 🚀