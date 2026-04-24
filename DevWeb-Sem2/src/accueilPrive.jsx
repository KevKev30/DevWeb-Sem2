import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

const AccueilPrive = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");

    if (!u) {
      navigate("/");
      return;
    }

    setUser(u);
  }, [navigate]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Bienvenue {user.prenom} 👋</h1>

        {/* ici s'affichent les pages */}
        <Outlet />
      </div>

    </div>
  );
};

export default AccueilPrive;