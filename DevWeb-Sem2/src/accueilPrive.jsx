import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccueilPrive = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!userData || userData.id_profil !== 1) {
      navigate('/accueil'); 
    } else {
      setUser(userData);
    }
  }, [navigate]);

  if (!user) return <p>Chargement...</p>;

  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/utilisateurs')
          .then(response => response.json())
          .then(data => setUtilisateurs(data))
          .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div>
      <h1>Bienvenue sur votre espace, {user.prenom} !</h1>
      <h2>Liste des utilisateurs enregistrés :</h2>
      <ul>
        {utilisateurs.map(u => (
          <li key={u.id_user}>{u.prenom} {u.nom}</li>
        ))}
      </ul>
      <p>Voici les fonctionnalités disponibles :</p>
      
      <div style={{ display: 'grid', gap: '10px' }}>
        <button onClick={() => navigate('/visualisation')}>Visualisation des objets</button>
        <button onClick={() => navigate('/salles')}>Disponibilité des salles</button>
        <button onClick={() => navigate('/electricite')}>Consommation Électrique</button>
        <button onClick={() => navigate('/mon-profil')}>Modifier mon profil</button>
      </div>
    </div>
  );
};

export default AccueilPrive;