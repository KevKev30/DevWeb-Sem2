import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Salles = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [salles, setSalles] = useState([]);
  const [filtreType, setFiltreType] = useState('');
  const [filtreBat, setFiltreBat] = useState('');

  const peutModifier = user && ['Avancé', 'Expert'].includes(user.niveau);

  useEffect(() => {
    // ... Logique Fetch identique ...
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);

    fetch('http://127.0.0.1:8000/api/salles')
      .then(r => r.json())
      .then(data => setSalles(data))
      .catch(err => console.error(err));

    fetch(`http://127.0.0.1:8000/api/points/${userData.id_user}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'consultation' })
    }).then(r => r.json()).then(data => {
      const updated = { ...userData, points: data.points, niveau: data.niveau };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
    });
  }, [navigate]);

  const sallesFiltrees = salles.filter(s => (filtreType === '' || s.type_salle === filtreType) && (filtreBat === '' || s.nom_bat === filtreBat));
  const batiments = [...new Set(salles.map(s => s.nom_bat))];
  const types = [...new Set(salles.map(s => s.type_salle))];

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <button className="cy-button-outline" onClick={() => navigate('/accueilPrive')} style={{ marginBottom: '20px' }}>← Retour</button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ color: 'var(--cy-blue)', margin: '0 0 10px 0' }}>Salles de DeltaUni</h1>
          <p style={{ margin: 0, color: 'var(--cy-gray)' }}>Niveau : <strong style={{ color: 'var(--cy-text)' }}>{user.niveau}</strong> — {user.points} pts</p>
          {!peutModifier && <p style={{ fontSize: '0.85rem', color: '#d97706', margin: '5px 0 0 0' }}><em>💡 Atteignez le niveau Avancé pour modifier les PC.</em></p>}
        </div>

        <div className="cy-card" style={{ display: 'flex', gap: '15px', padding: '15px', marginBottom: 0 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Type de salle</label>
            <select value={filtreType} onChange={e => setFiltreType(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <option value="">Tous</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Bâtiment</label>
            <select value={filtreBat} onChange={e => setFiltreBat(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <option value="">Tous</option>
              {batiments.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--cy-gray)', margin: '20px 0' }}>{sallesFiltrees.length} salle(s) trouvée(s)</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {sallesFiltrees.map(s => (
          <div key={s.id_salle} className="cy-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--cy-blue)' }}>{s.num_salle}</h2>
              <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', backgroundColor: s.est_reservable ? '#dbeafe' : '#f1f5f9', color: s.est_reservable ? '#1e3a8a' : '#64748b' }}>
                {s.est_reservable ? 'Réservable' : 'Non réservable'}
              </span>
            </div>
            
            <p style={{ color: 'var(--cy-gray)', margin: '10px 0' }}>{s.type_salle} — Bât. {s.nom_bat}</p>

            {s.nb_pc_total > 0 && (
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'var(--bg-app)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span>PC disponibles</span>
                  <strong>{s.pc_disponibles} / {s.nb_pc_total}</strong>
                </div>
                {peutModifier && (
                  <PcForm salle={s} onUpdate={(id, val) => setSalles(salles.map(x => x.id_salle === id ? { ...x, pc_disponibles: val } : x))} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PcForm = ({ salle, onUpdate }) => {
  const [val, setVal] = useState(salle.pc_disponibles);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/salles/${salle.id_salle}/pc`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pc_disponibles: val })
    });
    const result = await response.json();
    if (result.status === 'success') {
      setMsg('✅');
      onUpdate(salle.id_salle, val);
      setTimeout(() => setMsg(null), 2000);
    } else setMsg('❌');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
      <input type="number" min="0" max={salle.nb_pc_total} value={val} onChange={e => setVal(Number(e.target.value))} style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid var(--border)' }} />
      <button type="submit" className="cy-button" style={{ padding: '5px 10px', fontSize: '0.85rem' }}>Mettre à jour</button>
      {msg && <span style={{ fontSize: '0.9rem' }}>{msg}</span>}
    </form>
  );
};

export default Salles;