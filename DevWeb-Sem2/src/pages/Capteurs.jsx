import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Capteurs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [capteurs, setCapteurs] = useState([]);
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
  }, [navigate]);

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/capteurs?';
    if (filtreType) url += `type=${filtreType}&`;
    if (filtreEtat) url += `etat=${filtreEtat}`;

    fetch(url)
      .then(r => r.json())
      .then(data => setCapteurs(data))
      .catch(err => console.error(err));

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      fetch(`http://127.0.0.1:8000/api/points/${userData.id_user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'consultation' })
      }).then(r => r.json()).then(data => {
        const updated = { ...userData, points: data.points, niveau: data.niveau };
        localStorage.setItem('user', JSON.stringify(updated));
        setUser(updated);
      });
    }
  }, [filtreType, filtreEtat]);

  // ── EDIT ──────────────────────────────────────────────
  const handleEdit = (capteur) => {
    setEditing(capteur.id_capteur);
    setFormData({
      type_capteur: capteur.type_capteur,
      valeur_actuelle: capteur.valeur_actuelle,
      unite_mesure: capteur.unite_mesure,
      etat_fonctionnement: capteur.etat_fonctionnement,
    });
    setMessage(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setFormData({});
    setMessage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/capteurs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        setMessage({ type: 'success', text: '✅ Capteur mis à jour !' });
        setEditing(null);
        setCapteurs(capteurs.map(c => c.id_capteur === id ? { ...c, ...formData } : c));
      } else {
        setMessage({ type: 'error', text: '❌ Erreur : ' + result.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Erreur réseau : ' + err.message });
    }
  };

  // ── DELETE ────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce capteur ?')) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/capteurs/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === 'success') {
        setCapteurs(capteurs.filter(c => c.id_capteur !== id));
        setMessage({ type: 'success', text: '✅ Capteur supprimé.' });
      } else {
        setMessage({ type: 'error', text: '❌ Erreur : ' + result.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Erreur réseau : ' + err.message });
    }
  };

  // ── AJOUT ─────────────────────────────────────────────
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
        setAjoutData({
          type_capteur: 'Température',
          valeur_actuelle: '',
          unite_mesure: '',
          etat_fonctionnement: 'OK',
          id_salle: '',
        });
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
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--cy-blue)', margin: 0 }}>Appareils Connectés</h1>
          {peutModifier && (
            <button className="cy-button" onClick={() => setShowAjout(!showAjout)}>
              {showAjout ? 'Fermer' : '+ Ajouter un capteur'}
            </button>
          )}
       </div>

      {/* Grid de Capteurs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {capteurs.map(capteur => (
          <div key={capteur.id_capteur} className="cy-card" style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', top: '15px', right: '15px', 
              padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold',
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

            {peutModifier && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                <button className="cy-button-outline" style={{ padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => handleEdit(capteur)}>Modifier</button>
                <button className="cy-button-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleDelete(capteur.id_capteur)}>Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Capteurs;
