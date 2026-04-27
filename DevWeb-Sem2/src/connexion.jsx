import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem('user', JSON.stringify(result.user));

        // Ajouter points de connexion
        await fetch(`http://127.0.0.1:8000/api/points/${result.user.id_user}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'connexion' })
        });

        if (result.user.id_profil === 4) {
          navigate('/accueilVisiteur');
        } else {
          navigate('/accueilPrive');
        }
      } else {
        // Mauvais email ou mot de passe → message + reset
        setErreur(result.message || "Email ou mot de passe incorrect.");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      setErreur("Impossible de contacter le serveur. Réessayez plus tard.");
      setEmail("");
      setPassword("");
    }
  };

// ... imports identiques
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="cy-card" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'var(--cy-blue)' }}>Espace DeltaUni</h2>
          <p style={{ color: 'var(--cy-gray)' }}>Identifiez-vous pour accéder à vos services</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {erreur && <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px', fontSize: '0.9rem' }}>{erreur}</div>}
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Adresse mail</label>
            <input 
              type="email" 
              className="cy-input" // Ajoute ce style dans ton CSS pour des inputs propres
              style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Mot de passe</label>
            <input 
              type="password" 
              style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="cy-button" style={{ marginTop: '10px' }}>Se connecter</button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Pas encore de compte ? <Link to="/inscription" style={{ color: 'var(--cy-blue)', fontWeight: 'bold' }}>S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
