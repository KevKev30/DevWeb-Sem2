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
    if (userData && Number(userData.id_profil) !== 4) {
      navigate('/accueilPrive');
      return;
    }
    setUser(userData);
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: 'var(--cy-blue)', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setActiveSection('accueil')}>
          DeltaUni
        </h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ color: 'white', fontSize: '0.9rem' }}>👤 {user.prenom} {user.nom}</span>
              <button className="cy-button-outline" style={{ color: 'white', borderColor: 'white', padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => { localStorage.clear(); setUser(null); navigate('/'); }}>Déconnexion</button>
            </>
          ) : (
            <>
              <button className="cy-button-outline" style={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/connexion')}>Se connecter</button>
              <button className="cy-button" style={{ backgroundColor: 'white', color: 'var(--cy-blue)' }} onClick={() => navigate('/inscription')}>S'inscrire</button>
            </>
          )}
        </div>
      </header>

      {/* NAVIGATION SECONDAIRE */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: '40px', padding: '0' }}>
        {['accueil', 'formations', 'événements'].map(sec => (
          <button 
            key={sec}
            onClick={() => setActiveSection(sec)}
            style={{ 
              background: 'none', border: 'none', padding: '15px 10px', cursor: 'pointer', fontSize: '1rem',
              fontWeight: activeSection === sec ? '600' : 'normal',
              borderBottom: activeSection === sec ? '3px solid var(--cy-blue)' : '3px solid transparent',
              color: activeSection === sec ? 'var(--cy-blue)' : 'var(--cy-gray)',
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}
          >
            {sec}
          </button>
        ))}
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* === SECTION ACCUEIL === */}
        {activeSection === 'accueil' && (
          <div className="animate-fade-in">
            <h1 style={{ textAlign: 'center', color: 'var(--cy-blue)', fontSize: '2.2rem', marginBottom: '10px' }}>
              Bienvenue à DeltaUni{user ? `, ${user.prenom}` : ''}
            </h1>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--cy-gray)', marginBottom: '40px' }}>
              Une école d'ingénieurs tournée vers l'innovation, le numérique et l'humain.
            </p>
            
            {/* Chiffres clés */}
            <div className="cy-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', textAlign: 'center', marginBottom: '50px' }}>
              <div><h2 style={{ color: 'var(--cy-blue)', margin: '0 0 5px 0' }}>1 200+</h2><p style={{ margin: 0, color: 'var(--cy-gray)' }}>Étudiants</p></div>
              <div><h2 style={{ color: 'var(--cy-blue)', margin: '0 0 5px 0' }}>40+</h2><p style={{ margin: 0, color: 'var(--cy-gray)' }}>Enseignants</p></div>
              <div><h2 style={{ color: 'var(--cy-blue)', margin: '0 0 5px 0' }}>3</h2><p style={{ margin: 0, color: 'var(--cy-gray)' }}>Bâtiments</p></div>
              <div><h2 style={{ color: 'var(--cy-blue)', margin: '0 0 5px 0' }}>95%</h2><p style={{ margin: 0, color: 'var(--cy-gray)' }}>Insertion pro</p></div>
            </div>

            {/* Aperçu événements */}
            <h3 style={{ color: 'var(--cy-blue)', textAlign: 'center', marginBottom: '20px' }}>Prochains événements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {evenements.slice(0, 3).map(e => (
                <div key={e.id} className="cy-card" style={{ borderTop: '4px solid var(--cy-blue)' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{e.titre}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--cy-gray)', fontWeight: 'bold' }}>📅 {e.date} à {e.heure}</p>
                  <p style={{ margin: '5px 0 10px 0', fontSize: '0.85rem', color: 'var(--cy-gray)' }}>📍 {e.lieu}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{e.description}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="cy-button-outline" onClick={() => setActiveSection('événements')}>Voir tout l'agenda</button>
            </div>
          </div>
        )}

        {/* === SECTION FORMATIONS === */}
        {activeSection === 'formations' && (
          <div className="animate-fade-in">
            <h2 style={{ textAlign: 'center', color: 'var(--cy-blue)', marginBottom: '40px' }}>Nos Formations</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {formations.map((f, i) => (
                <div key={i} className="cy-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '4px solid var(--cy-blue)' }}>
                  <h3 style={{ margin: 0, color: 'var(--cy-text)', fontSize: '1.2rem' }}>{f.nom}</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ backgroundColor: 'var(--cy-light-blue)', color: 'var(--cy-blue)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      🎓 {f.niveau}
                    </span>
                    <span style={{ backgroundColor: '#f1f5f9', color: 'var(--cy-gray)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                      ⏳ {f.duree}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === SECTION ÉVÉNEMENTS === */}
        {activeSection === 'événements' && (
          <div className="animate-fade-in">
            <h2 style={{ textAlign: 'center', color: 'var(--cy-blue)', marginBottom: '40px' }}>Agenda du Campus</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '70px' }}>
              {evenements.map(e => (
                <div key={e.id} className="cy-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ backgroundColor: 'var(--cy-light-blue)', color: 'var(--cy-blue)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', alignSelf: 'flex-start', marginBottom: '15px' }}>
                    📅 {e.date}
                  </div>
                  
                  <h3 style={{ margin: '0 0 10px 0', color: 'var(--cy-blue)', fontSize: '1.2rem' }}>{e.titre}</h3>
                  <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', flexGrow: 1 }}>{e.description}</p>
                  
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px', fontSize: '0.85rem', color: 'var(--cy-gray)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span>🕒 <strong>Heure :</strong> {e.heure}</span>
                    <span>📍 <strong>Lieu :</strong> {e.lieu}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AccueilVisiteur;