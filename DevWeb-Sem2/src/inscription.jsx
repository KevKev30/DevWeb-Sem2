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
    <fieldset>
      <legend>Inscription à DeltaUni</legend>

      {!type ? (
        <div>
          <p>Quel est votre statut ?</p>
          <button onClick={() => setType('etudiant')}>Je suis Étudiant</button>
          <button onClick={() => setType('visiteur')}>Je suis Visiteur</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Inscription {type === 'etudiant' ? 'Étudiant' : 'Visiteur'}</h3>
          
          <div>
            <label>Nom : </label>
            <input name="nom" onChange={handleChange} required />
          </div>
          
          <div>
            <label>Prénom : </label>
            <input name="prenom" onChange={handleChange} required />
          </div>
          
          {type === 'etudiant' && (
            <div>
              <label>Numéro Étudiant : </label>
              <input name="num_etudiant" onChange={handleChange} required />
            </div>
          )}

          <div>
            <label>Email : </label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div>
            <label>Mot de passe : </label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          
          <br />
          <button type="submit">S'inscrire</button>
          <button type="button" onClick={() => setType(null)}>Retour</button>
        </form>
      )}
      
      <br />
      <em>Déjà un compte ? <Link to="/connexion">Connectez-vous ici</Link></em>
    </fieldset>
  );
};

export default Inscription;