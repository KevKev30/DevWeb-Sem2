import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8080/php/connexion.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.status === "success") {
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/accueilPrive');
    } else {
      alert(result.message);
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