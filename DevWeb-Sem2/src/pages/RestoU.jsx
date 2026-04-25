import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestoU = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);

    fetch('http://127.0.0.1:8000/api/menus')
      .then(r => r.json())
      .then(data => {
        setMenus(data);
        setLoading(false);
      })
      .catch(() => {
        setErreur("Impossible de charger les menus.");
        setLoading(false);
      });
  }, [navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <button onClick={() => navigate('/accueilPrive')}>← Retour</button>
      <h1>🍽️ Menus du Resto U</h1>

      {erreur && <p style={{ color: 'red' }}>❌ {erreur}</p>}

      {loading ? (
        <p>Chargement des menus...</p>
      ) : menus.length === 0 ? (
        <p>Aucun menu disponible pour le moment.</p>
      ) : (
        menus.map(menu => (
          <div key={menu.id_menu} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
            <h2 style={{ marginTop: 0 }}>📅 {formatDate(menu.date_jour)}</h2>

            <p>🥗 <strong>Entrée :</strong> {menu.entree}</p>
            <p>🍲 <strong>Plat principal :</strong> {menu.plat_principal}</p>
            <p>🍮 <strong>Dessert :</strong> {menu.dessert}</p>

            {menu.stock_distributeur && (
              <p>🥪 <strong>Distributeur :</strong> {menu.stock_distributeur}</p>
            )}

            <p>
              🔓 <strong>Ouverture :</strong>{' '}
              {menu.ouvert_ferme ? (
                <span style={{ color: 'green' }}>Ouvert</span>
              ) : (
                <span style={{ color: 'red' }}>Fermé</span>
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RestoU;
