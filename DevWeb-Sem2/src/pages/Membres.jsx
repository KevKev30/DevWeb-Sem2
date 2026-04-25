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
    <div>
      <button onClick={() => navigate('/accueilPrive')}>← Retour</button>
      <h1>Membres de DeltaUni</h1>

      {/* FILTRES */}
      <div>
        <input
          placeholder="Rechercher par nom, prénom ou email..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          style={{ width: '300px' }}
        />
        <label> Rôle : </label>
        <select value={filtreRole} onChange={e => setFiltreRole(e.target.value)}>
          <option value="">Tous</option>
          <option value="1">Étudiants</option>
          <option value="2">Enseignants</option>
        </select>
      </div>

      <p>{membresFiltres.length} membre(s) trouvé(s)</p>

      {/* LISTE */}
      {membresFiltres.map(m => (
        <div key={m.id_user} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{m.prenom} {m.nom}</strong> — {profilLabels[m.id_profil]}<br />
            <small>{m.email}</small>
            {m.num_etudiant && <><br /><small>N° étudiant : {m.num_etudiant}</small></>}
          </div>
          <div>
            {m.id_user !== user.id_user && (
              <button onClick={() => navigate(`/chat/${m.id_user}`)}>✉️</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Membres;
