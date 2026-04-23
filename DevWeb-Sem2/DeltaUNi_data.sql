CREATE DATABASE IF NOT EXISTS DeltaUni_DB;
USE DeltaUni_DB;

-- 1. STRUCTURE DES TABLES
-- ----------------------------------------------------------

CREATE TABLE PROFIL (
    id_profil INT PRIMARY KEY,
    libelle_profil VARCHAR(50)
);

CREATE TABLE BATIMENT (
    id_bat INT PRIMARY KEY,
    nom_bat VARCHAR(50),
    specialite VARCHAR(100)
);

CREATE TABLE UTILISATEUR (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    num_etudiant VARCHAR(8) UNIQUE NULL,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(100),
    id_profil INT,
    FOREIGN KEY (id_profil) REFERENCES PROFIL(id_profil)
);

CREATE TABLE SALLE (
    id_salle INT PRIMARY KEY AUTO_INCREMENT,
    num_salle VARCHAR(10),
    type_salle VARCHAR(50),
    est_reservable BOOLEAN,
    nb_pc_total INT,
    pc_disponibles INT,
    id_bat INT,
    FOREIGN KEY (id_bat) REFERENCES BATIMENT(id_bat)
);

CREATE TABLE CAPTEUR (
    id_capteur INT PRIMARY KEY AUTO_INCREMENT,
    type_capteur ENUM('Température', 'Éclairage', 'Eau', 'Électricité'),
    valeur_actuelle FLOAT,
    unite_mesure VARCHAR(10),
    etat_fonctionnement ENUM('OK', 'Panne', 'Maintenance') DEFAULT 'OK',
    id_salle INT,
    FOREIGN KEY (id_salle) REFERENCES SALLE(id_salle)
);

CREATE TABLE COURS (
    id_cours INT PRIMARY KEY AUTO_INCREMENT,
    nom_matiere VARCHAR(100),
    date_heure_debut DATETIME,
    date_heure_fin DATETIME,
    statut_cours ENUM('Maintenu', 'Annulé') DEFAULT 'Maintenu',
    id_salle INT,
    id_prof INT,
    FOREIGN KEY (id_salle) REFERENCES SALLE(id_salle),
    FOREIGN KEY (id_prof) REFERENCES UTILISATEUR(id_user)
);

CREATE TABLE RESTO_U (
    id_menu INT PRIMARY KEY AUTO_INCREMENT,
    date_jour DATE,
    entree VARCHAR(100),
    plat_principal VARCHAR(100),
    dessert VARCHAR(100),
    stock_distributeur VARCHAR(50),
    ouvert_ferme BOOLEAN DEFAULT TRUE,
    id_bat INT,
    FOREIGN KEY (id_bat) REFERENCES BATIMENT(id_bat)
);

CREATE TABLE EVENEMENT (
    id_evt INT PRIMARY KEY AUTO_INCREMENT,
    titre_evt VARCHAR(100),
    description_longue TEXT,
    date_heure_evt DATETIME,
    lieu_precis VARCHAR(100),
    id_organisateur INT,
    FOREIGN KEY (id_organisateur) REFERENCES UTILISATEUR(id_user)
);

-- 2. INSERTION DES DONNÉES DE RÉFÉRENCE
-- ----------------------------------------------------------

INSERT INTO PROFIL VALUES (1,'Étudiant'), (2,'Enseignant'), (3,'Administrateur'), (4,'Utilisateur');
INSERT INTO BATIMENT VALUES 
(1,'Turing','Informatique'), 
(2,'Cauchy','Humanités'), 
(3,'Condorcet','Langues, Admin, Vie Etudiante');

-- 3. INSERTION DES UTILISATEURS (20 Etudiants, 5 Profs, 3 Admins, 2 Visiteurs)
-- ----------------------------------------------------------

INSERT INTO UTILISATEUR (num_etudiant, nom, prenom, email, mot_de_passe, id_profil) VALUES 
('20260001', 'Martin', 'Lucas', 'lucas.martin@deltauni.fr', 'pass01', 1),
('20260002', 'Bernard', 'Emma', 'emma.bernard@deltauni.fr', 'pass02', 1),
('20260003', 'Thomas', 'Hugo', 'hugo.thomas@deltauni.fr', 'pass03', 1),
('20260004', 'Petit', 'Alice', 'alice.petit@deltauni.fr', 'pass04', 1),
('20260005', 'Robert', 'Nathan', 'nathan.robert@deltauni.fr', 'pass05', 1),
('20260006', 'Richard', 'Chloé', 'chloe.richard@deltauni.fr', 'pass06', 1),
('20260007', 'Durand', 'Enzo', 'enzo.durand@deltauni.fr', 'pass07', 1),
('20260008', 'Dubois', 'Léa', 'lea.dubois@deltauni.fr', 'pass08', 1),
('20260009', 'Moreau', 'Louis', 'louis.moreau@deltauni.fr', 'pass09', 1),
('20260010', 'Laurent', 'Jade', 'jade.laurent@deltauni.fr', 'pass10', 1),
('20260011', 'Simon', 'Gabriel', 'gabriel.simon@deltauni.fr', 'pass11', 1),
('20260012', 'Michel', 'Manon', 'manon.michel@deltauni.fr', 'pass12', 1),
('20260013', 'Lefebvre', 'Arthur', 'arthur.lefebvre@deltauni.fr', 'pass13', 1),
('20260014', 'Leroy', 'Zoe', 'zoe.leroy@deltauni.fr', 'pass14', 1),
('20260015', 'Roux', 'Adam', 'adam.roux@deltauni.fr', 'pass15', 1),
('20260016', 'David', 'Camille', 'camille.david@deltauni.fr', 'pass16', 1),
('20260017', 'Bertrand', 'Tom', 'tom.bertrand@deltauni.fr', 'pass17', 1),
('20260018', 'Morel', 'Lola', 'lola.morel@deltauni.fr', 'pass18', 1),
('20260019', 'Fournier', 'Timéo', 'timeo.fournier@deltauni.fr', 'pass19', 1),
('20260020', 'Girard', 'Mila', 'mila.girard@deltauni.fr', 'pass20', 1),
(NULL, 'Techer', 'Paul', 'paul.techer@deltauni.fr', 'prof01', 2),
(NULL, 'Vasseur', 'Marie', 'marie.vasseur@deltauni.fr', 'prof02', 2),
(NULL, 'Lemaire', 'Pierre', 'pierre.lemaire@deltauni.fr', 'prof03', 2),
(NULL, 'Fontaine', 'Julie', 'julie.fontaine@deltauni.fr', 'prof04', 2),
(NULL, 'Guerin', 'Marc', 'marc.guerin@deltauni.fr', 'prof05', 2),
(NULL, 'Admin', 'Delta', 'admin1@deltauni.fr', 'root01', 3),
(NULL, 'Staff', 'Technique', 'admin2@deltauni.fr', 'root02', 3),
(NULL, 'DSI', 'Reseau', 'admin3@deltauni.fr', 'root03', 3),
(NULL, 'Durand', 'Visit1', 'visiteur.externe@gmail.com', 'visit01', 4),
(NULL, 'Dupont', 'Visit2', 'pro.test@outlook.fr', 'visit02', 4);

-- 4. INSERTION DES SALLES
-- ----------------------------------------------------------

INSERT INTO SALLE (num_salle, type_salle, est_reservable, nb_pc_total, pc_disponibles, id_bat) VALUES 
('T101', 'Labo', 1, 30, 12, 1),
('T102', 'Labo', 1, 30, 28, 1),
('T-Amphi', 'Cours', 1, 0, 0, 1),
('T-Cafet', 'Cafet', 0, 5, 2, 1),
('C201', 'Cours', 1, 0, 0, 2),
('C-AmphiA', 'Cours', 1, 0, 0, 2),
('C-AmphiB', 'Cours', 1, 0, 0, 2),
('Cantine', 'Cafet', 0, 0, 0, 3),
('L-Lang1', 'Labo', 1, 15, 10, 3),
('BDE', 'Asso', 0, 2, 1, 3),
('DeltaJun', 'Asso', 0, 4, 4, 3);

-- 5. INSERTION DES CAPTEURS (Incluant des pannes)
-- ----------------------------------------------------------

INSERT INTO CAPTEUR (type_capteur, valeur_actuelle, unite_mesure, etat_fonctionnement, id_salle) VALUES 
('Température', 21.5, '°C', 'OK', 1),
('Éclairage', 1, 'bool', 'OK', 1),
('Température', 19.0, '°C', 'Panne', 2), -- Capteur en panne à Turing
('Éclairage', 0, 'bool', 'OK', 6),
('Électricité', 450.2, 'kWh', 'OK', 8),
('Eau', 12.5, 'm3', 'Maintenance', 8); -- Cantine en maintenance

-- 6. INSERTION DES COURS (Un annulé)
-- ----------------------------------------------------------

INSERT INTO COURS (nom_matiere, date_heure_debut, date_heure_fin, statut_cours, id_salle, id_prof) VALUES 
('Développement Web', '2026-05-10 08:30:00', '2026-05-10 11:30:00', 'Maintenu', 1, 21),
('Algorithmique', '2026-05-10 14:00:00', '2026-05-10 16:00:00', 'Annulé', 3, 22),
('Sociologie', '2026-05-11 10:00:00', '2026-05-11 12:00:00', 'Maintenu', 6, 23);

-- 7. INSERTION RESTO_U (Menu Cantine)
-- ----------------------------------------------------------

INSERT INTO RESTO_U (date_jour, entree, plat_principal, dessert, stock_distributeur, id_bat) VALUES 
('2026-05-10', 'Salade de tomates', 'Lasagnes boeuf', 'Yaourt fruit', 'Sandwichs: 15', 3),
('2026-05-11', 'Oeuf mayo', 'Poulet rôti frites', 'Pomme', 'Sandwichs: 8', 3);

-- 8. INSERTION DES ÉVÉNEMENTS
-- ----------------------------------------------------------

INSERT INTO EVENEMENT (titre_evt, description_longue, date_heure_evt, lieu_precis, id_organisateur) VALUES 
('Soirée BDE', 'Grande soirée de fin de semestre pour tous.', '2026-05-15 21:00:00', 'Hall Condorcet', 26),
('Hackathon DeltaJunior', '24h de code non-stop.', '2026-06-10 09:00:00', 'Salles T101/T102', 1),
('Conférence IA', 'L impact de l IA sur le métier d ingénieur.', '2026-05-20 14:00:00', 'Amphi Turing', 21),
('Éthique Ingénieur', 'Conférence obligatoire sur la responsabilité.', '2026-05-22 10:00:00', 'Amphi A Cauchy', 27);