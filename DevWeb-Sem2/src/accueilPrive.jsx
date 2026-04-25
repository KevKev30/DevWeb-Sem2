import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccueilPrive() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    if (Number(storedUser.id_profil) === 4) {
      navigate("/accueilVisiteur");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  if (!user) return <p>Chargement...</p>;

  const btnStyle = {
    padding: "20px 40px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "10px",
    border: "2px solid #1f2937",
    background: "white",
    width: "100%"
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>

      <h1>Bonjour {user.prenom} 👋</h1>
      <p>Bienvenue sur votre espace DeltaUni.</p>
      <p>🏅 Niveau : <strong>{user.niveau || 'Débutant'}</strong> — <strong>{user.points || 0} points</strong></p>

      <hr style={{ margin: "30px 0" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <button style={btnStyle} onClick={() => navigate('/accueilPrive/salles')}>🏫 Salles</button>
        <button style={btnStyle} onClick={() => navigate('/accueilPrive/capteurs')}>💻 Ordinateurs</button>
        <button style={btnStyle} onClick={() => navigate('/accueilPrive/membres')}>👥 Liste des membres</button>
        <button style={btnStyle} onClick={() => navigate('/profil')}>👤 Mon profil</button>
        <button style={{ ...btnStyle, background: "#fee2e2", borderColor: "#ef4444", color: "#ef4444" }}
          onClick={() => { localStorage.clear(); navigate('/'); }}>
          🚪 Déconnexion
        </button>
      </div>

    </div>
  );
}