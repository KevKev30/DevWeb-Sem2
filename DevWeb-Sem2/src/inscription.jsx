import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Inscription = () => {
  const [type, setType] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    num_etudiant: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:8000/api/inscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, type: type })
    });

    const result = await response.json();
    
    if (result.status === "success") {
      alert("Inscription réussie !");
      navigate('/accueilPrive');
    } else {
      alert("Erreur : " + result.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="cy-card" style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'var(--cy-blue)' }}>Rejoindre DeltaUni</h2>
          <p style={{ color: 'var(--cy-gray)' }}>Créez votre compte en quelques instants</p>
        </div>

        {!type ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ textAlign: 'center' }}>Quel est votre statut ?</p>
            <button className="cy-button" onClick={() => setType('etudiant')}>Je suis Étudiant</button>
            <button className="cy-button-outline" onClick={() => setType('visiteur')}>Je suis Visiteur</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ borderBottom: '2px solid var(--cy-light-blue)', paddingBottom: '10px' }}>
              Inscription {type === 'etudiant' ? 'Étudiant' : 'Visiteur'}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Nom</label>
                <input name="nom" className="cy-input" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Prénom</label>
                <input name="prenom" className="cy-input" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} onChange={handleChange} required />
              </div>
            </div>

            {type === 'etudiant' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Numéro Étudiant</label>
                <input name="num_etudiant" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} onChange={handleChange} required />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Email institutionnel</label>
              <input type="email" name="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} onChange={handleChange} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>Mot de passe</label>
              <input type="password" name="password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }} onChange={handleChange} required />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" className="cy-button" style={{ flex: 2 }}>S'inscrire</button>
              <button type="button" className="cy-button-outline" style={{ flex: 1 }} onClick={() => setType(null)}>Retour</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Inscription;