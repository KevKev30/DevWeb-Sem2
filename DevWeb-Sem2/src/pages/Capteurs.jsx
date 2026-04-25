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

    // Points de consultation
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
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <button onClick={() => navigate('/accueilPrive')}>← Retour</button>
      <h1>Appareils connectés</h1>
      <p>Niveau : <strong>{user.niveau}</strong> — {user.points} pts</p>
      {!peutModifier && <p><em>💡 Atteignez le niveau Avancé pour modifier les capteurs.</em></p>}

      {message && <p>{message.text}</p>}

      {/* FILTRES */}
      <div>
        <label>Type : </label>
        <select value={filtreType} onChange={e => setFiltreType(e.target.value)}>
          <option value="">Tous</option>
          <option value="Température">Température</option>
          <option value="Éclairage">Éclairage</option>
          <option value="Eau">Eau</option>
          <option value="Électricité">Électricité</option>
        </select>

        <label> État : </label>
        <select value={filtreEtat} onChange={e => setFiltreEtat(e.target.value)}>
          <option value="">Tous</option>
          <option value="OK">OK</option>
          <option value="Panne">Panne</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <br />

      {/* LISTE */}
      {capteurs.map(capteur => (
        <div key={capteur.id_capteur} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          {editing === capteur.id_capteur ? (
            <form onSubmit={e => handleSubmit(e, capteur.id_capteur)}>
              <div>
                <label>Type : </label>
                <select name="type_capteur" value={formData.type_capteur} onChange={handleChange}>
                  <option value="Température">Température</option>
                  <option value="Éclairage">Éclairage</option>
                  <option value="Eau">Eau</option>
                  <option value="Électricité">Électricité</option>
                </select>
              </div>
              <div>
                <label>Valeur actuelle : </label>
                <input name="valeur_actuelle" type="number" step="0.1" value={formData.valeur_actuelle} onChange={handleChange} />
              </div>
              <div>
                <label>Unité : </label>
                <input name="unite_mesure" value={formData.unite_mesure} onChange={handleChange} />
              </div>
              <div>
                <label>État : </label>
                <select name="etat_fonctionnement" value={formData.etat_fonctionnement} onChange={handleChange}>
                  <option value="OK">OK</option>
                  <option value="Panne">Panne</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <br />
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={handleCancel}>Annuler</button>
            </form>
          ) : (
            <div>
              <strong>{capteur.type_capteur}</strong> — {capteur.valeur_actuelle} {capteur.unite_mesure}<br />
              État : {capteur.etat_fonctionnement}<br />
              Salle : {capteur.salle?.num_salle ?? capteur.id_salle}
              {peutModifier && (
                <> <button onClick={() => handleEdit(capteur)}>✏️ Modifier</button></>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Capteurs;
