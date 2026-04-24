<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; }

require 'db.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM UTILISATEUR WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $password === $user['mot_de_passe']) {
        echo json_encode([
            "status" => "success",
            "message" => "Connexion réussie",
            "user" => [
                "nom" => $user['nom'],
                "prenom" => $user['prenom'],
                "id_profil" => $user['id_profil']
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Email ou mot de passe incorrect"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Données manquantes"]);
}
?>