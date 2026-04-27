import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', num_etudiant: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);
    setFormData({ nom: userData.nom, prenom: userData.prenom, email: userData.email, num_etudiant: userData.num_etudiant || '', password: '' });
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCancel = () => {
    setFormData({ nom: user.nom, prenom: user.prenom, email: user.email, num_etudiant: user.num_etudiant || '', password: '' });
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
      setMessage({ type: 'success', text: '✅ Profil mis à jour avec succès !' });
    } else {
      setMessage({ type: 'error', text: '❌ Erreur : ' + result.message });
    }
  };

  if (!user) return <p>Chargement...</p>;
  const profilLabels = { 1: 'Étudiant', 2: 'Enseignant', 3: 'Administrateur', 4: 'Visiteur' };

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
      <button className="cy-button-outline" onClick={() => navigate('/accueilPrive')} style={{ marginBottom: '20px' }}>
        ← Retour
      </button>

      <div className="cy-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--cy-blue)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            {user.prenom[0]}{user.nom[0]}
          </div>
          <div>
            <h1 style={{ margin: '0', color: 'var(--cy-blue)' }}>{user.prenom} {user.nom}</h1>
            <span style={{ backgroundColor: 'var(--cy-light-blue)', color: 'var(--cy-blue)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
              {profilLabels[user.id_profil]}
            </span>
          </div>
        </div>

        {message && (
          <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '6px', backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#166534' : '#991b1b' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Prénom</label>
              <input name="prenom" value={formData.prenom || ''} onChange={handleChange} disabled={!editing} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: !editing ? 'var(--bg-app)' : 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Nom</label>
              <input name="nom" value={formData.nom || ''} onChange={handleChange} disabled={!editing} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: !editing ? 'var(--bg-app)' : 'white' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} disabled={!editing} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: !editing ? 'var(--bg-app)' : 'white' }} />
          </div>

          {user.id_profil === 1 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Numéro étudiant</label>
              <input name="num_etudiant" value={formData.num_etudiant || ''} disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-app)' }} />
            </div>
          )}

          {editing && (
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Nouveau mot de passe (optionnel)</label>
              <input type="password" name="password" value={formData.password || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {!editing ? (
              <button type="button" className="cy-button" onClick={() => { setEditing(true); setMessage(null); }}>Modifier mes informations</button>
            ) : (
              <>
                <button type="button" className="cy-button-outline" onClick={handleCancel}>Annuler</button>
                <button type="submit" className="cy-button">Enregistrer les modifications</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profil;