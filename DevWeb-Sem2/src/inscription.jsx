import React from 'react';
import { Link } from 'react-router-dom';

const Inscription = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription envoyée !");
  };

  return (
    <fieldset>
      <p>Inscrivez-vous</p>
      <form onSubmit={handleSubmit}>
        <div className="caption">Civilité</div>
        <div className="zone">
          <select name="civilite">
            <option value="Femme">Mme</option>
            <option value="Homme">M</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <br />

        <div className="caption">Nom</div>
        <div className="zone">
          <input type="text" name="nom" required />
        </div>
        <br />

        <div className="caption">Prénom</div>
        <div className="zone">
          <input type="text" name="prenom" required />
        </div>
        <br />

        <div className="caption">Numéro étudiant</div>
        <div className="zone">
          <input type="number" name="numero-etudiant" required />
        </div>
        <br />

        <div className="caption">Email</div>
        <div className="zone">
          <input type="email" name="email" required />
        </div>
        <br />

        <div className="caption">Mot de passe</div>
        <div className="zone">
          <input type="password" name="password" className="champ" required />
        </div>
        <br />
        
        <div className="cliquer">
          <input type="submit" value="Créer mon compte" />
        </div>
        <br />
        
        {/* Le lien React Router vers la page connexion */}
        <em>Vous avez déjà un compte ? <Link to="/">Connexion</Link></em>
      </form>
    </fieldset>
  );
};

export default Inscription;