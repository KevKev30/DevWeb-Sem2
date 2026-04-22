import React from 'react';
import { Link } from 'react-router-dom';

const Connexion = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion...");
  };

  return (
    <fieldset>
      <p>Connectez-vous</p>
      <form onSubmit={handleLogin}>
        <div className="entete">
          Identifiez-vous pour accéder à votre espace personnel.
        </div>
        <br />
        
        <div className="caption">Adresse mail</div>
        <div className="zone">
          <input type="email" name="email" placeholder="Saisissez votre email" required />
        </div>
        <br />
        
        <div className="caption">Mot de passe</div>
        <div className="zone">
          <input type="password" name="password" className="champ" placeholder="Saisissez votre mot de passe" required />
        </div>
        <br />
        
        <div className="cliquer">
          <input type="submit" value="Se Connecter" />
        </div>
        <br />
        
        {/* Le lien React Router vers la page inscription */}
        <em>Pas encore de compte ? <Link to="/inscription">Inscription</Link></em>
      </form>
    </fieldset>
  );
};

export default Connexion;