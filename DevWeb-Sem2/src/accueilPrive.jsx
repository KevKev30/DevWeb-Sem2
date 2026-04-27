import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccueilPrive() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    if (Number(storedUser.id_profil) === 4) {
      navigate("/accueilVisiteur");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  if (!user) return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>;

  // Sécurité pour les initiales (au cas où le nom/prénom serait vide)
  const initiales = `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase();

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* 1. BARRE DE NAVIGATION SUPÉRIEURE (Inspirée de l'image) */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        padding: '0 20px',
        height: '60px'
      }}>
        {/* Onglet Actif "Tableau de bord" */}
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ 
            padding: '0 15px', 
            display: 'flex', 
            alignItems: 'center', 
            borderBottom: '3px solid var(--cy-blue)', 
            color: 'var(--cy-text)',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Tableau de bord
          </div>
        </div>

        {/* Zone Profil Droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '10px' }}>
          {/* Icônes fictives pour l'esthétique (Recherche, Notifs, Messages) */}
          <span style={{ cursor: 'pointer', color: 'var(--cy-gray)', fontSize: '1.2rem', position: 'relative' }}></span>
          
          {/* Avatar Initiales */}
          <div 
            onClick={() => navigate('/profil')}
            style={{ 
              width: '35px', 
              height: '35px', 
              borderRadius: '50%', 
              backgroundColor: '#e5e7eb', // Gris très clair
              color: 'var(--cy-text)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: '1px solid #d1d5db',
              marginLeft: '10px'
            }}
            title="Mon Profil"
          >
            {initiales}
          </div>
        </div>
      </header>

      {/* 2. CONTENU PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        
        {/* En-tête de page avec infos de niveau */}
        <div className="cy-card" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>Mes services</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, color: 'var(--cy-gray)' }}>
              Niveau <strong>{user.niveau || 'Débutant'}</strong>
            </p>
            <p style={{ margin: 0, color: 'var(--cy-blue)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {user.points || 0} points
            </p>
          </div>
        </div>

        {/* SECTION 1 : INFRASTRUCTURES */}
        <div style={{ 
          backgroundColor: '#888888', color: 'white', padding: '6px 15px', 
          fontWeight: 'bold', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem' 
        }}>
          GESTION DES INFRASTRUCTURES
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <CardService 
            titre="Tableau de bord des Salles" 
            onClick={() => navigate('/accueilPrive/salles')} 
            icone="🏫"
          />
          <CardService 
            titre="Appareils Connectés" 
            onClick={() => navigate('/accueilPrive/capteurs')} 
            icone="💻"
          />
        </div>

        {/* SECTION 2 : VIE DE CAMPUS */}
        <div style={{ 
          backgroundColor: '#888888', color: 'white', padding: '6px 15px', 
          fontWeight: 'bold', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem' 
        }}>
          VIE DE CAMPUS & COMMUNAUTÉ
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <CardService 
            titre="Annuaire des Membres" 
            onClick={() => navigate('/accueilPrive/membres')} 
            icone="👥"
          />
          <CardService 
            titre="Menus Resto U" 
            onClick={() => navigate('/accueilPrive/menus')} 
            icone="🍽️"
          />
        </div>

        {/* SECTION DÉCONNEXION */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button 
            className="cy-button-outline" 
            style={{ color: '#dc2626', borderColor: '#dc2626' }}
            onClick={() => { localStorage.clear(); navigate('/'); }}
          >
            Me déconnecter
          </button>
        </div>

      </main>
    </div>
  );
}

// -------------------------------------------------------------------
// Composant Carte (Design inspiré de l'image avec filigrane en fond)
// -------------------------------------------------------------------
const CardService = ({ titre, onClick, icone }) => {
  return (
    <div 
      onClick={onClick}
      className="cy-card"
      style={{ 
        cursor: 'pointer', 
        minHeight: '140px', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        overflow: 'hidden',
        marginBottom: '0', // Écrase le margin-bottom par défaut de .cy-card
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <h3 style={{ color: 'var(--cy-blue)', margin: 0, fontSize: '1.3rem', zIndex: 2 }}>
        {titre}
      </h3>
      
      {/* Élément graphique de fond (simule le logo transparent de la capture) */}
      <div style={{
        position: 'absolute',
        right: '-10px',
        bottom: '-25px',
        fontSize: '8rem',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 1,
        userSelect: 'none'
      }}>
        {icone}
      </div>
    </div>
  );
};