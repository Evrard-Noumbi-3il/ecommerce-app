#  Kanope - Plateforme E-commerce Moderne

Plateforme de vente en ligne complète développée avec **Vue.js 3**, **Node.js/Express** et **MongoDB Atlas**.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)

---

##  Technologies & Services

### Frontend
- **Vue.js 3** - Framework JavaScript progressif
- **Vue Router** - Gestion de la navigation
- **Axios** - Client HTTP pour les requêtes API
- **Chart.js + Vue-ChartJS** - Visualisation de données
- **Stripe.js** - Interface de paiement sécurisée

### Backend
- **Node.js** (v18+) - Runtime JavaScript
- **Express.js 5.x** - Framework web minimaliste
- **Mongoose** - ODM pour MongoDB
- **JWT (jsonwebtoken)** - Authentification sécurisée
- **Bcrypt** - Hachage des mots de passe
- **Multer** - Gestion des uploads de fichiers
- **Helmet** - Sécurité des en-têtes HTTP
- **Express-validator** - Validation des données
- **Nodemailer** - Service d'envoi d'emails
- **Twilio** - Service de SMS (optionnel)

### Services Externes
- **MongoDB Atlas** - Base de données cloud NoSQL
- **Stripe** - Plateforme de paiement en ligne
- **Mailtrap/SMTP** - Service de vérification d'emails
- **Chat à délais différé** - Système de messagerie asynchrone

---

##  Installation et Configuration

###  Prérequis

Assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Git](https://git-scm.com/)
- [Vue CLI](https://cli.vuejs.org/) : `npm install -g @vue/cli`
- Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Un compte [Stripe](https://stripe.com/) (mode test)
- Un compte [Mailtrap](https://mailtrap.io/) (ou autre service SMTP)

---

##  Installation

### 1. Cloner le projet
```bash
git clone https://github.com/Evrard-Noumbi-3il/ecommerce-app.git
cd ecommerce-app
```

### 2. Structure du projet
```
ecommerce-app/
├── frontend/              # Application Vue.js
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── views/         # Pages de l'application
│   │   ├── router/        # Configuration des routes
│   │   ├── auth/          # Middleware d'authentification
│   │   └── assets/        # Images
│   ├── public/
│   ├── package.json
│   └── vue.config.js
│
├── backend/               # API Node.js/Express (ESM)
│   ├── controllers/       # Logique métier
│   ├── models/            # Schémas Mongoose
│   ├── routes/            # Routes API
│   ├── middleware/        # Middlewares Express
│   ├── utils/             # Utilitaires (emails, etc.)
│   ├── uploads/           # Fichiers uploadés (images)
│   ├── index.js           # Point d'entrée
│   ├── package.json
│   └── .env               # Variables d'environnement
│
├── .gitignore
├── package.json
└── README.md
```

---

##  Configuration Backend

### 1. Installer les dépendances
```bash
cd backend
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` :

```env

PORT=3000
NODE_ENV=development

MONGODB_URI=Enter_your_URI

JWT_SECRET=votre_secret_jwt_tres_securise_ici_changez_moi

CORS_ORIGIN=http://localhost:8080
FRONTEND_URL=http://localhost:8080


# Pour Mailtrap 
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=votre_mailtrap_user
MAILTRAP_PASS=votre_mailtrap_password


STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe


TWILIO_ACCOUNT_SID=votre_account_sid
TWILIO_AUTH_TOKEN=votre_auth_token
TWILIO_PHONE_NUMBER=+15551234567


```

### 3. Configurer MongoDB Atlas

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un nouveau cluster (gratuit)
3. Dans **Database Access**, créer un utilisateur avec mot de passe
4. Dans **Network Access**, autoriser `0.0.0.0/0` (ou votre IP)
5. Cliquer sur **Connect** → **Connect your application**
6. Copier l'URI de connexion et remplacer dans `.env`

### 4. Démarrer le serveur backend
```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start
```

 **Le backend sera disponible sur** : `http://localhost:3000/api`

---

##  Configuration Frontend

### 1. Installer les dépendances
```bash
cd frontend
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `frontend/` :

```env
# API Backend URL
VUE_APP_API_URL=http://localhost:3000/api

# Nom de l'application
VUE_APP_NAME=Kanope

# Stripe (clé publique)
VUE_APP_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique_stripe

# Environnement
VUE_APP_ENV=development
```

### 3. Démarrer l'application frontend
```bash
# Mode développement
npm run serve

# Build pour production
npm run build

# Preview du build
npm run preview
```

✅ **Le frontend sera disponible sur** : `http://localhost:8080`

---

##  Authentification & Sécurité

### Système d'authentification complet

- ✅ **Inscription** avec validation des données
- ✅ **Vérification d'email** par code à 6 chiffres
- ✅ **Connexion** avec JWT (token valable 7 jours)
- ✅ **Réinitialisation de mot de passe** par email
- ✅ **Protection des routes** (Frontend & Backend)
- ✅ **Rôles utilisateurs** : `user`, `moderator`, `admin`
- ✅ **Middleware de vérification** des permissions

### Pages d'erreur personnalisées

- **401** - Non authentifié
- **403** - Accès refusé (rôle insuffisant)
- **404** - Page non trouvée
- **500** - Erreur serveur

---

##  Documentation API Complète

###  Authentification (`/api/auth`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/register` | Inscription d'un nouvel utilisateur | ❌ |
| POST | `/login` | Connexion utilisateur | ❌ |
| POST | `/verify` | Vérification du code email | ❌ |
| POST | `/resend-code` | Renvoyer le code de vérification | ❌ |

###  Accueil (`/api/home`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/publicites` | Liste des publicités actives | ❌ |
| GET | `/tendances` | Produits en tendance | ❌ |
| GET | `/categories` | Toutes les catégories | ❌ |
| GET | `/nouveautes` | Nouveaux produits | ❌ |
| GET | `/thematiques` | Toutes les thématiques | ❌ |

###  Produits (`/api/products`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/` | Liste de tous les produits | ❌ |
| GET | `/:id` | Détails d'un produit | ❌ |
| GET | `/user/:id` | Produits d'un utilisateur | ❌ |
| GET | `/category/:id` | Produits par catégorie | ❌ |
| GET | `/categories` | Liste des catégories | ❌ |
| GET | `/thematiques` | Liste des thématiques | ❌ |
| POST | `/addProduct` | Ajouter un produit (+ images) | ✅ |

###  Favoris (`/api/favoris`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/produits` | Tous les produits favoris | ✅ |
| GET | `/getFavoris/:id` | Favoris d'un utilisateur | ✅ |
| GET | `/thematiques` | Thématiques disponibles | ❌ |
| GET | `/categories` | Catégories disponibles | ❌ |
| POST | `/addFavori` | Ajouter aux favoris | ✅ |
| DELETE | `/deleteFavoris/:user_Id/:produit_Id` | Retirer des favoris | ✅ |

###  Utilisateur (`/api/user`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/me/:id` | Profil utilisateur | ✅ |
| PUT | `/me` | Modifier le profil | ✅ |
| PATCH | `/me/photo` | Changer la photo de profil | ✅ |
| POST | `/addMiseEnVente` | Mettre un produit en vente | ✅ |
| GET | `/users/:userId/products` | Produits d'un utilisateur | ✅ |
| GET | `/notifications/:id` | Notifications utilisateur | ✅ |

###  Catégories (`/api/categories`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/categories` | Liste des catégories | ❌ |
| GET | `/categories/:id` | Détails d'une catégorie | ❌ |

###  Avis (`/api/avis`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/create` | Créer un avis | ✅ |
| GET | `/user/:id` | Avis d'un utilisateur | ❌ |

###  Paiements (`/api/paiement`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/create-checkout-session` | Créer une session Stripe | ✅ |
| GET | `/session-status` | Vérifier le statut de paiement | ✅ |

###  Chat (`/api/chat`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/send` | Envoyer un message | ✅ |
| GET | `/getChatListReceiver` | Liste des conversations | ✅ |
| POST | `/markAsRead` | Marquer les messages comme lus | ✅ |

###  Notifications (`/api/notifications`)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/:userId` | Notifications d'un utilisateur | ✅ |

###  Administration (`/api/admin`)

#### Gestion des utilisateurs
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/users` | Liste complète des utilisateurs | Admin |
| GET | `/users/users` | Utilisateurs actifs | Admin |
| PUT | `/users/:id` | Promouvoir/rétrograder | Admin |
| POST | `/users/:id` | Bannir/débannir | Moderator/Admin |
| DELETE | `/users/banned` | Supprimer utilisateurs bannis | Admin |
| GET | `/dashboard-stats` | Statistiques dashboard | Admin |

#### Gestion des produits
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/products` | Liste des produits | Moderator/Admin |
| PUT | `/products/:id` | Changer l'état (approuver/refuser) | Moderator/Admin |
| DELETE | `/products/:id` | Supprimer un produit | Moderator/Admin |
| POST | `/products/validate-all` | Approuver tous les produits en attente | Moderator/Admin |

#### Gestion des catégories
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/categories` | Liste des catégories | Auth |
| POST | `/categories` | Créer une catégorie | Admin |
| PUT | `/categories/:id` | Modifier une catégorie | Admin |
| DELETE | `/categories/:id` | Supprimer une catégorie | Admin |

#### Gestion des thématiques
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/thematiques` | Liste des thématiques | Auth |
| GET | `/thematiques/:id` | Détails d'une thématique | Auth |
| POST | `/thematiques` | Créer une thématique (+ image) | Admin |
| PUT | `/thematiques/:id` | Modifier une thématique | Admin |
| DELETE | `/thematiques/:id` | Supprimer une thématique | Admin |

#### Gestion des notifications
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/notifications` | Notifications envoyées | Moderator/Admin |
| POST | `/notifications` | Envoyer une notification | Moderator/Admin |

#### Gestion des publicités
| Méthode | Route | Description | Rôle requis |
|---------|-------|-------------|-------------|
| GET | `/publicites` | Liste des publicités | Auth |
| GET | `/publicites/:id` | Détails d'une publicité | Auth |
| POST | `/publicites` | Créer une publicité (+ image) | Admin |
| PUT | `/publicites/:id` | Modifier une publicité | Admin |
| DELETE | `/publicites/:id` | Supprimer une publicité | Admin |

---

##  Authentification JWT

Toutes les routes marquées ✅ nécessitent un token JWT dans le header (dans le client Axios) :

```javascript
Authorization: Bearer <votre_token_jwt>
```

### Obtenir un token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Réponse :
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

---

##  Paiements avec Stripe

### Configuration

1. Créer un compte sur [Stripe](https://stripe.com/)
2. Récupérer les clés API (mode test) dans le Dashboard
3. Mettre la clé secrète public dans la variable d'environnement du front et la privé dans le back

## Vous pouvez consulter paiementModal.vue et paiementController


### Exemple de paiement

```javascript
POST /api/paiement/create-checkout-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 2999
    }
  ],
  "successUrl": "http://localhost:8080/success",
  "cancelUrl": "http://localhost:8080/cancel"
}
```

---

##  Service d'Emails

### Fonctionnalités

- ✅ Email de **vérification de compte** avec code
- ✅ Email de **bienvenue** après inscription
- ✅ Email de **réinitialisation de mot de passe**
- ✅ Email de **confirmation de commande**

### Configuration Mailtrap (Testing)

1. Créer un compte sur [Mailtrap](https://mailtrap.io/)
2. Créer une inbox
3. Copier les credentials SMTP dans `.env`

### Configuration SMTP Production (Gmail)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=mot_de_passe_application  # Créer depuis Google Account Security
```

---

##  Système de Chat

Le chat utilise un système **asynchrone à délais différés** (polling) :

- Les messages sont stockés en base de données MongoDB
- Le frontend interroge périodiquement l'API pour récupérer les nouveaux messages(Optimisation avec WebSocket)

### Endpoints Chat

```javascript
GET  /api/chat/getChatListReceiver   // Collecter tous les messages des conversations
POST /api/chat/send               // Envoyer un message
PUT  /api/chat/markAsRead    // Marquer comme lu
```

---

##  Scripts Disponibles

### Backend
```bash
npm start          # Démarrer le serveur (production)
npm run dev        # Mode développement (nodemon)
npm test           # Lancer les tests
npm run lint       # Vérifier le code
npm run seed       # Initialiser la base de données avec des données de test
```

### Frontend
```bash
npm run serve      # Serveur de développement
npm run build      # Build pour production
npm run lint       # Vérifier le code
npm test           # Lancer les tests
```

---

##  Tests & Développement

### Comptes de test

Après avoir lancé `npm run seed` dans le backend :

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| admin@kanope.com | admin123 | admin |
| modo@kanope.com | modo123 | moderator |
| user@kanope.com | user123 | user |

---

##  Workflow Git Recommandé

```bash
# 1. Créer une nouvelle branche
git checkout -b feature/nom-fonctionnalite

# 2. Développer et commiter
git add .
git commit -m "feat: ajout de la fonctionnalité X"

# 3. Pousser la branche
git push origin feature/nom-fonctionnalite

# 4. Créer une Pull Request sur GitHub

# 5. Review et merge
```

### Convention de commits

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage (sans changement de logique)
- `refactor:` refactorisation du code
- `test:` ajout/modification de tests
- `chore:` maintenance, dépendances

---

##  Dépannage

### Erreur de connexion MongoDB Atlas
```bash
# Vérifier l'URI dans .env
# Vérifier que l'IP est autorisée dans Network Access
# Vérifier que l'utilisateur existe dans Database Access
```

### Port déjà utilisé
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Modules non trouvés
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreurs CORS
Vérifier que dans `backend/.env` :
```env
CORS_ORIGIN=http://localhost:8080
```

Et dans `frontend/.env` :
```env
VUE_APP_API_URL=http://localhost:3000/api
```

### Emails non reçus
- Vérifier les credentials Mailtrap/SMTP dans `.env`
- Vérifier les logs du backend
- Tester avec Mailtrap d'abord avant Gmail

---

## Fonctionnalités Principales

### Utilisateurs
-  Inscription / Connexion
-  Vérification d'email
-  Profil utilisateur
-  Gestion des favoris
-  Historique des commandes

### Produits
-  Catalogue de produits
-  Recherche et filtres
-  Détails produit
-  Upload d'images
-  Système de favoris

### Commandes & Paiements
-  Panier d'achat
-  Processus de checkout
-  Paiement sécurisé (Stripe)
-  Suivi de commande
-  Notifications par email

### Administration
-  Dashboard admin
-  Gestion des utilisateurs
-  Gestion des produits
-  Gestion des commandes
-  Statistiques et graphiques
-  Gestion des catégories
-  Système de notifications

### Messagerie
-  Chat entre utilisateurs
-  Chat vendeur-acheteur
-  Notifications de nouveaux messages
-  Historique des conversations

---

##  Roadmap

- [ ] WebSocket pour le chat en temps réel
- [ ] Système de notation/avis produits
- [ ] Notifications push
- [ ] Application mobile (React Native)
- [ ] Mode sombre
- [ ] Support multi-langues
- [ ] Système de coupons/réductions
- [ ] Programme de fidélité

---

##  Contribution

Les contributions sont les bienvenues !

1. **Fork** le projet
2. Créer une **branche** (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

---

##  Auteurs

- **Evrard Noumbi** - [GitHub](https://github.com/Evrard-Noumbi-3il)
- **Mbezele Evrade** 
- **JOSEPH PENLAP**
- **BRYAN Nintcheu**
- **KABREL Lemofack**

---

##  Support

Pour toute question ou problème :

-  Issues : [GitHub Issues](https://github.com/Evrard-Noumbi-3il/ecommerce-app/issues)
-  Discussions : [GitHub Discussions](https://github.com/Evrard-Noumbi-3il/ecommerce-app/discussions)

---

##  Remerciements

- [Vue.js](https://vuejs.org/) - Framework frontend
- [Express.js](https://expressjs.com/) - Framework backend
- [MongoDB](https://www.mongodb.com/) - Base de données
- [Stripe](https://stripe.com/) - Paiements sécurisés
- [Mailtrap](https://mailtrap.io/) - Tests d'emails

---

 **Happy Coding avec Vue.js + Node.js + MongoDB !** 