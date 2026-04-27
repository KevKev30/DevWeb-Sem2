import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const profilLabels = { 1: 'Étudiant', 2: 'Enseignant', 3: 'Administrateur' };

const Membres = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [membres, setMembres] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [filtreRole, setFiltreRole] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);

    fetch('http://127.0.0.1:8000/api/membres')
      .then(r => r.json())
      .then(data => setMembres(data))
      .catch(err => console.error(err));

    // Points de consultation
    fetch(`http://127.0.0.1:8000/api/points/${userData.id_user}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'consultation' })
    }).then(r => r.json()).then(data => {
      const updated = { ...userData, points: data.points, niveau: data.niveau };
      localStorage.setItem('user', JSON.stringify(updated));
    });
  }, [navigate]);

  const membresFiltres = membres.filter(m => {
    const matchRecherche = recherche === '' ||
      m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.prenom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.email.toLowerCase().includes(recherche.toLowerCase());

    const matchRole = filtreRole === '' || String(m.id_profil) === filtreRole;

    return matchRecherche && matchRole;
  });

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <button className="cy-button-outline" onClick={() => navigate('/accueilPrive')} style={{ marginBottom: '20px' }}>
        ← Retour au tableau de bord
      </button>

      <div className="cy-card" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--cy-blue)', marginTop: 0 }}>Annuaire DeltaUni</h1>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Rechercher un membre</label>
            <input
              placeholder="Nom, prénom ou email..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Rôle</label>
            <select value={filtreRole} onChange={e => setFiltreRole(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <option value="">Tous les rôles</option>
              <option value="1">Étudiants</option>
              <option value="2">Enseignants</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
        {membresFiltres.map(m => (
          <div key={m.id_user} className="cy-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--cy-light-blue)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--cy-blue)', fontWeight: 'bold' }}>
              {m.prenom[0]}{m.nom[0]}
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>{m.prenom} {m.nom}</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--cy-blue)', fontWeight: '600', textTransform: 'uppercase' }}>
                {profilLabels[m.id_profil]}
              </span>
              <div style={{ fontSize: '0.8rem', color: 'var(--cy-gray)' }}>{m.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membres;
