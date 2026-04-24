import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);
    setFormData({
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      num_etudiant: userData.num_etudiant || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      num_etudiant: user.num_etudiant || ''
    });
    setEditing(false);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/profil/${user.id_user}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    if (result.status === 'success') {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
    } else {
      setMessage({ type: 'error', text: 'Erreur : ' + result.message });
    }
  };

  if (!user) return <p>Chargement...</p>;

  const profilLabels = { 1: 'Étudiant', 2: 'Enseignant', 3: 'Administrateur', 4: 'Visiteur' };

  return (
    <div>
      <h1>Mon profil — {user.prenom} {user.nom}</h1>
      <p>Rôle : {profilLabels[user.id_profil]}</p>

      {message && <p>{message.text}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom : </label>
          <input name="prenom" value={formData.prenom || ''} onChange={handleChange} disabled={!editing} />
        </div>
        <div>
          <label>Nom : </label>
          <input name="nom" value={formData.nom || ''} onChange={handleChange} disabled={!editing} />
        </div>
        <div>
          <label>Email : </label>
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} disabled={!editing} />
        </div>
        {user.id_profil === 1 && (
          <div>
            <label>Numéro étudiant : </label>
            <input name="num_etudiant" value={formData.num_etudiant || ''} disabled />
          </div>
        )}

        <br />
        {!editing ? (
          <button type="button" onClick={() => { setEditing(true); setMessage(null); }}>Modifier</button>
        ) : (
          <>
            <button type="button" onClick={handleCancel}>Annuler</button>
            <button type="submit">Enregistrer</button>
          </>
        )}
      </form>

      <br />
      <button onClick={() => navigate('/accueilPrive')}>← Retour</button>
    </div>
  );
};

export default Profil;