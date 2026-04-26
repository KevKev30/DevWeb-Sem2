# DeltaUni — Guide d'installation

## Prérequis à installer

### 1. Node.js & npm
```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# Vérifier
node -v
npm -v
```

### 2. PHP & Composer
```bash
# PHP (Laravel nécessite PHP 8.1+)
sudo apt install php php-mbstring php-xml php-curl php-mysql

# Composer
composer install

# Vérifier
composer -v
```

### 3. MySQL Server
```bash
sudo apt install mysql-server

# Démarrer le service
sudo service mysql start
```

---

## Installation du projet


### Étape 1 — Créer le fichier .env

Créer le fichier .env à la main et le placer dans le dossier deltauni.


Puis ouvrez `.env` et mettez ces lignes :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=DeltaUni_DB
DB_USERNAME=delta_user
DB_PASSWORD=password123
```

### Étape 2 — Générer la clé Laravel
```bash
php artisan key:generate
```

### Étape 3 — Créer l'utilisateur MySQL et la base de données
Connectez-vous en root :
```bash
sudo mysql -u root
```

Puis exécutez :
```sql
CREATE DATABASE IF NOT EXISTS DeltaUni_DB;
CREATE USER 'delta_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON DeltaUni_DB.* TO 'delta_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Étape 7 — Importer la base de données
```bash
mysql -u delta_user -p DeltaUni_DB < DeltaUni_data.sql
```
*(tapez `password123` quand il demande le mot de passe)*

---

## Lancer le projet

Ouvrez **deux terminaux** :

**Terminal 1 — Backend Laravel : lancer cette commande dans le dossier deltauni : **
```bash
php artisan serve
```
→ Accessible sur `http://127.0.0.1:8000`

**Terminal 2 — Frontend React : Lancer cette commande dans le dossier DevWeb-Sem2 (le dossier enfant pas le dossier parent) : **
```bash
npm run dev
```
→ Accessible sur `http://localhost:5173` (ou le port affiché)

---

## Vous n'avez plus qu'à taper http://localhost:5173 sur votre barre de recherhce et vous avez à présent accès au site ! 
