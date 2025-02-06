# 🛒 Système de Gestion d’Inventaire et de Commandes

Ce projet est une application de gestion d’inventaire et de commandes construite avec **NestJS (Backend)**, **Angular (Frontend)**, et **PostgreSQL (Base de données)**.

---

## 🚀 Fonctionnalités

✅ Gestion des produits (CRUD)

✅ Gestion des commandes avec mise à jour automatique du stock

✅ Authentification (JWT) avec rôles (Admin / Client)

✅ Tableau de bord avec statistiques

✅ Dockerisation complète

---

## 📦 Installation et Exécution

### **1️⃣ Cloner le projet**

```
git clone https://github.com/UgoRastell/partiel-fevrier2025.git
cd ton-projet
```

### 2️⃣ Lancer l’application avec Docker

```jsx
docker-compose up --build -d
```

### **3️⃣ Accéder à l’application**

- **Frontend (UI) :** [http://localhost:4200](http://localhost:4200/)
- **Backend (API) :** [http://localhost:3000](http://localhost:3000/)

### **4️⃣ Arrêter l’application**

```
docker-compose down
```

---

## ⚙️ Endpoints API

### 🔐 **Auth - Authentification**

- `POST /auth/register` → Inscription
- `POST /auth/login` → Connexion

### 📦 **Produits**

- `GET /products` → Liste des produits
- `POST /products` → Ajouter un produit (admin)

### 📦 **Commandes**

- `GET /orders` → Liste des commandes (admin)
- `POST /orders` → Passer une commande

---

## 🛠️ Technologies utilisées

- **NestJS** (Backend API)
- **Angular** (Frontend)
- **PostgreSQL** (Base de données)
- **Docker & Docker Compose** (Déploiement)

---

## 🎯 Améliorations possibles

- ✅ Ajouter des tests unitaires 🧪
- ✅ Implémenter CI/CD (GitHub Actions) 🚀
- ✅ Support multi-langues 🌍

---

## 🤝 Contributeurs

👤 Ugo Rastell - Développeur Full-Stack

 📧 **Email :** [urastell@normandiewebschool.fr](mailto:urastell@normandiewebschool.fr)
