function Card({ title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Accéder au service</p>
      <button>Ouvrir</button>
    </div>
  );
}

export default Card;