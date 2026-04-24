import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("LOGIN CLICKED");
    console.log(email, password);
    
    try{
      const response = await fetch('http://127.0.0.1:8000/api/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok){
        throw new Error("Erreur serveur");
      }

      const result = await response.json();

      console.log("LOGIN RESULT:", result);

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
      }
    }catch (error){
      console.error(error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <fieldset>
      <p>Connectez-vous</p>
      <form onSubmit={handleLogin}>
        <div className="entete">Identifiez-vous...</div>
        
        <div className="caption">Adresse mail</div>
        <div className="zone">
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        
        <div className="caption">Mot de passe</div>
        <div className="zone">
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        <div className="cliquer">
          <input type="submit" value="Se Connecter" />
        </div>
        
        <em>Pas encore de compte ? <Link to="/inscription">Inscription</Link></em>
      </form>
    </fieldset>
  );
};

export default Connexion;