import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const evenements = [
  { id: 1, titre: 'Soirée BDE', description: 'Grande soirée de fin de semestre ouverte à tous.', date: '15 Mai 2026', heure: '21h00', lieu: 'Hall Condorcet' },
  { id: 2, titre: 'Hackathon DeltaJunior', description: '24h de code non-stop pour résoudre des défis réels.', date: '10 Juin 2026', heure: '09h00', lieu: 'Salles T101 / T102 — Bâtiment Turing' },
  { id: 3, titre: 'Conférence IA & Ingénierie', description: "L'impact de l'IA sur le métier d'ingénieur.", date: '20 Mai 2026', heure: '14h00', lieu: 'Amphi Turing' },
  { id: 4, titre: 'Éthique & Responsabilité', description: "Conférence sur la responsabilité de l'ingénieur.", date: '22 Mai 2026', heure: '10h00', lieu: 'Amphi A — Bâtiment Cauchy' },
  { id: 5, titre: 'Journée Portes Ouvertes', description: 'Découvrez nos formations et visitez les laboratoires.', date: '7 Juin 2026', heure: '10h00 – 17h00', lieu: 'Campus DeltaUni' },
  { id: 6, titre: 'Forum des Entreprises', description: 'Plus de 40 entreprises pour des stages et emplois.', date: '3 Juin 2026', heure: '09h00 – 18h00', lieu: 'Hall Condorcet' },
];

const batiments = [
  { nom: 'Turing', specialite: 'Informatique & Numérique', salles: ['T101 — Labo (30 PC)', 'T102 — Labo (30 PC)', 'T-Amphi', 'T-Cafet'] },
  { nom: 'Cauchy', specialite: 'Humanités & Sciences Sociales', salles: ['C201 — Cours', 'C-AmphiA', 'C-AmphiB'] },
  { nom: 'Condorcet', specialite: 'Langues, Administration & Vie Étudiante', salles: ['L-Lang1 — Labo Langues', 'Cantine', 'BDE', 'DeltaJunior'] },
];

const formations = [
  { nom: 'BUT Informatique', duree: '3 ans', niveau: 'Bac+3' },
  { nom: 'Licence Humanités Numériques', duree: '3 ans', niveau: 'Bac+3' },
  { nom: 'Master Cybersécurité', duree: '2 ans', niveau: 'Bac+5' },
  { nom: 'Licence Pro Langues & Commerce', duree: '1 an', niveau: 'Bac+3' },
];

const AccueilVisiteur = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData) {
    setUser(null);
    return; // on s'arrête là, pas de redirection
  }
  if (Number(userData.id_profil) !== 4) {
    navigate('/accueilPrive');
    return;
  }
  setUser(userData);
}, [navigate]);

  return (
    <div>
      {user ? (
        <>
          <p>Connecté en tant que : {user.prenom} {user.nom}</p>
          <button onClick={() => { 
            localStorage.clear(); 
            setUser(null);
            navigate('/'); 
          }}>Déconnexion</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/connexion')}>Se connecter</button>
          <button onClick={() => navigate('/inscription')}>S'inscrire</button>
        </>
      )}

      <hr />

      <nav>
        <button onClick={() => setActiveSection('accueil')}>Accueil</button>
        <button onClick={() => setActiveSection('formations')}>Formations</button>
        <button onClick={() => setActiveSection('événements')}>Événements</button>
      </nav>

      <hr />

      {activeSection === 'accueil' && (
        <div>
          <h1>Bienvenue à DeltaUni{user ? `, ${user.prenom}` : ''} !</h1>
          <p>Une école d'ingénieurs tournée vers l'innovation, le numérique et l'humain.</p>
          <ul>
            <li>1 200+ étudiants</li>
            <li>3 bâtiments</li>
            <li>40+ enseignants</li>
            <li>95% de taux d'insertion pro</li>
          </ul>
          <h2>Prochains événements</h2>
          {evenements.slice(0, 3).map(e => (
            <div key={e.id}>
              <strong>{e.titre}</strong> — {e.date} à {e.heure} — {e.lieu}
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'formations' && (
        <div>
          <h1>Nos formations</h1>
          {formations.map((f, i) => (
            <div key={i}>
              <strong>{f.nom}</strong> — {f.niveau} — {f.duree}
            </div>
          ))}
        </div>
      )}

      {activeSection === 'événements' && (
        <div>
          <h1>Tous les événements</h1>
          {evenements.map(e => (
            <div key={e.id}>
              <strong>{e.titre}</strong> — {e.date} à {e.heure} — {e.lieu}
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccueilVisiteur;