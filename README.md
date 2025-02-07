### 🚀 **README - Système de Gestion d’Inventaire et de Commandes**

---

## 📌 **Introduction**

Ce projet est une application **full-stack** permettant la gestion des produits, commandes et utilisateurs, avec un **tableau de bord statistique**. Il est développé en :

- **Backend** : NestJS avec TypeORM & PostgreSQL
- **Frontend** : Angular
- **Base de données** : PostgreSQL
- **Dockerisation** : `Dockerfile` & `docker-compose.yml`

---

## 📦 **Installation & Lancement du Projet**

### 🔹 **Prérequis**

- **Docker & Docker Compose** installés sur votre machine
- **Node.js** (version 16+ recommandée)
- **Angular CLI** installé globalement (`npm install -g @angular/cli`)

### 🔹 **1. Cloner le projet**

```
git clone https://github.com/UgoRastell/partiel-fevrier2025.git
cd partiel-fevrier2025
```

### 🔹 **2. Lancer avec Docker Compose**

```jsx
docker-compose up --build
```

Cela démarre **NestJS, Angular et PostgreSQL** dans des conteneurs distincts.

### 🔹 **3. Accéder à l’application**

- **Frontend (Angular)** : `http://localhost:4200`
- **Backend (NestJS API)** : `http://localhost:3000`
- **Base de données (PostgreSQL)** : `localhost:5432` (`partiel_db` par défaut)

## 🔐 **Authentification & Rôles**

L’application utilise **JWT** pour l’authentification.

Deux rôles sont disponibles :

1️⃣ **Admin** : Gestion complète des produits, commandes et utilisateurs.

2️⃣ **Client** : Peut passer des commandes et consulter ses achats.

### ➡️ **Routes d’authentification (`/auth`)**

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Inscription utilisateur |
| `POST` | `/auth/login` | Connexion et récupération du JWT |
| `GET` | `/auth/profile` | Récupérer les infos de l’utilisateur connecté |

---

## 📦 **Gestion des Produits** (`/products`)

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/products` | **Créer** un produit (Admin uniquement) |
| `GET` | `/products` | **Lister** tous les produits |
| `GET` | `/products/:id` | **Afficher** un produit spécifique |
| `PUT` | `/products/:id` | **Mettre à jour** un produit (Admin uniquement) |
| `DELETE` | `/products/:id` | **Supprimer** un produit (Admin uniquement) |

---

## 🛒 **Gestion des Commandes** (`/orders`)

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/orders` | **Créer** une commande |
| `GET` | `/orders` | **Lister** toutes les commandes (Admin uniquement) |
| `GET` | `/orders/:id` | **Afficher** une commande spécifique |
| `PUT` | `/orders/:id` | **Mettre à jour** le statut d’une commande (Admin) |
| `DELETE` | `/orders/:id` | **Annuler** une commande |

**🎯 Fonctionnalité clé :** Mise à jour automatique du **stock des produits** lorsqu’une commande est validée.

---

## 📊 **Tableau de Bord & Statistiques** (`/dashboard`)

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/dashboard` | Retourne le **nombre de commandes**, **les produits les plus vendus** et **les stocks restants** |

📌 **Améliorations possibles** : Ajouter des **graphiques interactifs avec NGX Charts** dans le frontend.

---

## 🏗 **Architecture du Projet**

📂 **backend/** *(NestJS - API REST)*

- 📁 `src/auth/` → Authentification JWT & rôles
- 📁 `src/products/` → Gestion des produits
- 📁 `src/orders/` → Gestion des commandes
- 📁 `src/dashboard/` → Statistiques du tableau de bord
- 📄 `main.ts` → Point d’entrée du backend

📂 **frontend/** *(Angular - Interface utilisateur)*

- 📁 `src/app/pages/auth/` → Login & Inscription
- 📁 `src/app/pages/products/` → Liste & gestion des produits
- 📁 `src/app/pages/orders/` → Interface de gestion des commandes
- 📁 `src/app/pages/dashboard/` → Tableau de bord

📂 **docker/** *(Déploiement & Conteneurisation)*

- 🐳 `Dockerfile` (Backend & Frontend)
- 🐳 `docker-compose.yml`

---

## 🛠 **Commandes Utiles**

### 🔹 **Démarrer manuellement**

**Backend :**

```
cd backend
npm install
npm run start
```

**Frontend :**

```
cd frontend
npm install
ng serve
```

### 🔹 **Exécuter les tests**

```
cd backend
npm run test
```

### 🔹 **Arrêter les conteneurs Docker**

```
docker-compose down
```

---

## 📜 **Conclusion**

Ce projet répond aux critères du partiel avec :

✅ **Une API NestJS sécurisée et bien organisée**

✅ **Une base de données PostgreSQL bien structurée**

✅ **Une conteneurisation complète avec Docker**
