import { Outlet, useNavigate } from "react-router-dom";
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

    setUser(storedUser);
  }, [navigate]);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

<<<<<<< HEAD
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Bienvenue {user.prenom} 👋</h1>
        <button onClick={() => { localStorage.clear(); navigate('/'); }}>
          Se déconnecter
        </button>
        <button onClick={() => navigate('/Profil')}>
          Modifier mon profil
        </button>
=======
      {/* SIDEBAR */}
      <aside
        style={{
          width: "240px",
          background: "#1f2937",
          color: "white",
          padding: "20px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🎓 ENT</h2>
>>>>>>> 48db589 (Amélioration ENT : layout + sidebar + routing corrigé)

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a href="/accueilPrive/home" style={{ color: "white" }}>🏠 Home</a>
          <a href="/accueilPrive/salles" style={{ color: "white" }}>🏫 Salles</a>
          <a href="/accueilPrive/reservations" style={{ color: "white" }}>📅 Réservations</a>
          <a href="/accueilPrive/notifications" style={{ color: "white" }}>🔔 Notifications</a>
          <a href="/accueilPrive/ordinateurs" style={{ color: "white" }}>💻 Ordinateurs</a>
        </nav>
      </aside>

      {/* CONTENU */}
      <main style={{ flex: 1, padding: "25px", background: "#f3f4f6" }}>
        <h1>ENT Université</h1>

        {/* ici les pages enfants */}
        <Outlet context={user} />
      </main>

    </div>
  );
}