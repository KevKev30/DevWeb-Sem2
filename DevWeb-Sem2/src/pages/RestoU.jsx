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
      .then(data => { setMenus(data); setLoading(false); })
      .catch(() => { setErreur("Impossible de charger les menus."); setLoading(false); });
  }, [navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <button className="cy-button-outline" onClick={() => navigate('/accueilPrive')} style={{ marginBottom: '20px' }}>
        ← Retour
      </button>
      <h1 style={{ color: 'var(--cy-blue)' }}>🍽️ Menus du Resto U</h1>

      {erreur && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>❌ {erreur}</div>}

      {loading ? (
        <p style={{ color: 'var(--cy-gray)' }}>Chargement des menus...</p>
      ) : menus.length === 0 ? (
        <p style={{ color: 'var(--cy-gray)' }}>Aucun menu disponible pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {menus.map(menu => (
            <div key={menu.id_menu} className="cy-card" style={{ position: 'relative', borderTop: '4px solid var(--cy-blue)' }}>
              <div style={{ 
                position: 'absolute', top: '15px', right: '15px', 
                padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold',
                backgroundColor: menu.ouvert_ferme ? '#dcfce7' : '#fee2e2',
                color: menu.ouvert_ferme ? '#166534' : '#991b1b'
              }}>
                {menu.ouvert_ferme ? 'OUVERT' : 'FERMÉ'}
              </div>

              <h2 style={{ marginTop: 0, fontSize: '1.2rem', textTransform: 'capitalize', color: 'var(--cy-text)' }}>
                {formatDate(menu.date_jour)}
              </h2>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '15px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div><span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🥗</span> <strong>Entrée :</strong> <span style={{ color: 'var(--cy-gray)' }}>{menu.entree}</span></div>
                <div><span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🍲</span> <strong>Plat :</strong> <span style={{ color: 'var(--cy-gray)' }}>{menu.plat_principal}</span></div>
                <div><span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🍮</span> <strong>Dessert :</strong> <span style={{ color: 'var(--cy-gray)' }}>{menu.dessert}</span></div>
                
                {menu.stock_distributeur && (
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'var(--bg-app)', borderRadius: '6px', fontSize: '0.9rem' }}>
                    🥪 <strong>Distributeur :</strong> {menu.stock_distributeur}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestoU;