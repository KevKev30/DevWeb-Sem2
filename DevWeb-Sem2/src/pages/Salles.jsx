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
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) { navigate('/'); return; }
    setUser(userData);

    fetch('http://127.0.0.1:8000/api/salles')
      .then(r => r.json())
      .then(data => setSalles(data))
      .catch(err => console.error(err));

    // Points de consultation
    fetch(`http://127.0.0.1:8000/api/points/${userData.id_user}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'consultation' })
    }).then(r => r.json()).then(data => {
      const updated = { ...userData, points: data.points, niveau: data.niveau };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
    });
  }, [navigate]);

  const sallesFiltrees = salles.filter(s => {
    const matchType = filtreType === '' || s.type_salle === filtreType;
    const matchBat = filtreBat === '' || s.nom_bat === filtreBat;
    return matchType && matchBat;
  });

  const batiments = [...new Set(salles.map(s => s.nom_bat))];
  const types = [...new Set(salles.map(s => s.type_salle))];

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <button onClick={() => navigate('/accueilPrive')}>← Retour</button>
      <h1>Salles de DeltaUni</h1>
      <p>Niveau : <strong>{user.niveau}</strong> — {user.points} pts</p>
      {!peutModifier && <p><em>💡 Atteignez le niveau Avancé pour modifier les PC disponibles.</em></p>}

      {/* FILTRES */}
      <div>
        <label>Type : </label>
        <select value={filtreType} onChange={e => setFiltreType(e.target.value)}>
          <option value="">Tous</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <label> Bâtiment : </label>
        <select value={filtreBat} onChange={e => setFiltreBat(e.target.value)}>
          <option value="">Tous</option>
          {batiments.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <p>{sallesFiltrees.length} salle(s) trouvée(s)</p>

      {/* LISTE */}
      {sallesFiltrees.map(s => (
        <div key={s.id_salle} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
          <strong>{s.num_salle}</strong> — {s.type_salle} — {s.nom_bat}<br />
          {s.nb_pc_total > 0 && (
            <>PC disponibles : <strong>{s.pc_disponibles} / {s.nb_pc_total}</strong><br /></>
          )}
          Réservable : {s.est_reservable ? '✅ Oui' : '❌ Non'}<br />

          {peutModifier && s.nb_pc_total > 0 && (
            <PcForm salle={s} onUpdate={(id, val) => {
              setSalles(salles.map(x => x.id_salle === id ? { ...x, pc_disponibles: val } : x));
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

const PcForm = ({ salle, onUpdate }) => {
  const [val, setVal] = useState(salle.pc_disponibles);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/salles/${salle.id_salle}/pc`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pc_disponibles: val })
    });
    const result = await response.json();
    if (result.status === 'success') {
      setMsg('✅ Mis à jour');
      onUpdate(salle.id_salle, val);
    } else {
      setMsg('❌ Erreur');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '6px' }}>
      <label>Modifier PC disponibles : </label>
      <input
        type="number"
        min="0"
        max={salle.nb_pc_total}
        value={val}
        onChange={e => setVal(Number(e.target.value))}
        style={{ width: '60px' }}
      />
      <button type="submit">Mettre à jour</button>
      {msg && <span> {msg}</span>}
    </form>
  );
};

export default Salles;
