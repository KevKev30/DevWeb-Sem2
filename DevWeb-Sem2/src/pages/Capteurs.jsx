import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Capteurs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [capteurs, setCapteurs] = useState([]);
  const [salles, setSalles] = useState([]); // Ajout état salles
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [filtreType, setFiltreType] = useState('');
  const [filtreEtat, setFiltreEtat] = useState('');
  const [showAjout, setShowAjout] = useState(false);
  const [ajoutData, setAjoutData] = useState({
    type_capteur: 'Température',
    valeur_actuelle: '',
    unite_mesure: '',
    etat_fonctionnement: 'OK',
    id_salle: '',
  });

  const peutModifier = user && ['Avancé', 'Expert'].includes(user.niveau);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);

    // Chargement des salles pour le select
    fetch('http://127.0.0.1:8000/api/salles')
      .then(r => r.json())
      .then(data => setSalles(data))
      .catch(err => console.error("Erreur chargement salles", err));
  }, [navigate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      fetch(`http://127.0.0.1:8000/api/points/${userData.id_user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'consultation' })
      })
        .then(r => r.json())
        .then(data => {
          const updated = { ...userData, points: data.points, niveau: data.niveau };
          localStorage.setItem('user', JSON.stringify(updated));
          setUser(updated);
        });
    }
  }, []);

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/capteurs?';
    if (filtreType) url += `type=${filtreType}&`;
    if (filtreEtat) url += `etat=${filtreEtat}`;

    fetch(url)
      .then(r => r.json())
      .then(data => setCapteurs(data))
      .catch(err => console.error(err));
  }, [filtreType, filtreEtat]);

  const handleAjoutChange = (e) => {
    setAjoutData({ ...ajoutData, [e.target.name]: e.target.value });
  };

  const handleAjoutSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/capteurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ajoutData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        setCapteurs([...capteurs, result.capteur]);
        setMessage({ type: 'success', text: '✅ Capteur ajouté !' });
        setShowAjout(false);
        setAjoutData({ type_capteur: 'Température', valeur_actuelle: '', unite_mesure: '', etat_fonctionnement: 'OK', id_salle: '' });
      } else {
        setMessage({ type: 'error', text: '❌ Erreur : ' + result.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Erreur réseau : ' + err.message });
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '30px' }}>
      <button className="cy-button-outline" onClick={() => navigate('/accueilPrive')} style={{ marginBottom: '20px' }}>
        ← Retour au tableau de bord
      </button>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--cy-blue)', margin: 0 }}>Appareils Connectés</h1>
          {peutModifier && (
            <button className="cy-button" onClick={() => setShowAjout(!showAjout)}>
              {showAjout ? 'Fermer' : '+ Ajouter un capteur'}
            </button>
          )}
       </div>

       {/* Formulaire d'ajout intégré avec le style existant */}
       {showAjout && (
         <div className="cy-card" style={{ marginBottom: '30px', padding: '20px' }}>
            <form onSubmit={handleAjoutSubmit}>
               <h3 style={{ marginTop: 0 }}>Nouveau Capteur</h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <select name="type_capteur" onChange={handleAjoutChange} className="zone" required>
                    <option value="Température">Température</option>
                    <option value="Éclairage">Éclairage</option>
                    <option value="Eau">Eau</option>
                    <option value="Électricité">Électricité</option>
                  </select>
                  <input type="number" step="0.1" name="valeur_actuelle" placeholder="Valeur" onChange={handleAjoutChange} className="zone" required />
                  <input type="text" name="unite_mesure" placeholder="Unité (ex: °C)" onChange={handleAjoutChange} className="zone" required />
                  <select name="etat_fonctionnement" onChange={handleAjoutChange} className="zone" required>
                    <option value="OK">OK</option>
                    <option value="Panne">Panne</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  <select name="id_salle" onChange={handleAjoutChange} className="zone" required>
                    <option value="">-- Choisir une salle --</option>
                    {salles.map(s => (
                      <option key={s.id_salle} value={s.id_salle}>{s.num_salle} ({s.batiment?.nom_batiment})</option>
                    ))}
                  </select>
               </div>
               <button type="submit" className="cy-button" style={{ marginTop: '15px' }}>Valider l'ajout</button>
            </form>
         </div>
       )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {capteurs.map(capteur => (
          <div key={capteur.id_capteur} className="cy-card" style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', top: '15px', right: '15px', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold',
              backgroundColor: capteur.etat_fonctionnement === 'OK' ? '#dcfce7' : '#fee2e2',
              color: capteur.etat_fonctionnement === 'OK' ? '#166534' : '#991b1b'
            }}>
              {capteur.etat_fonctionnement}
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{capteur.type_capteur}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--cy-blue)', marginBottom: '10px' }}>
              {capteur.valeur_actuelle} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>{capteur.unite_mesure}</span>
            </div>
            <p style={{ color: 'var(--cy-gray)', fontSize: '0.9rem' }}>
              📍 Salle : <strong>{capteur.salle?.num_salle ?? 'N/A'}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Capteurs;