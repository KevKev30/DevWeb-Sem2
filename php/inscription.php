<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'], $data['nom'], $data['prenom'], $data['type'])) {
    echo json_encode(["status" => "error", "message" => "Données manquantes"]);
    exit;
}

$id_profil = ($data['type'] === 'etudiant') ? 1 : 4;

try {
    if ($data['type'] === 'etudiant') {
        $sql = "INSERT INTO UTILISATEUR (num_etudiant, nom, prenom, email, mot_de_passe, id_profil) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['num_etudiant'], $data['nom'], $data['prenom'], $data['email'], $data['password'], $id_profil]);
    } else {
        $sql = "INSERT INTO UTILISATEUR (nom, prenom, email, mot_de_passe, id_profil) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['nom'], $data['prenom'], $data['email'], $data['password'], $id_profil]);
    }

    echo json_encode(["status" => "success", "message" => "Compte créé avec succès"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erreur lors de l'inscription : " . $e->getMessage()]);
}
?>