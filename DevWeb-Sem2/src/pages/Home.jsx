/*import Card from "../components/Card";

function Home() {
  return (
    <div className="content">
      <h1>Bienvenue sur DeltaUni</h1>

      <div className="cards-container">
        <Card title="Salles disponibles" />
        <Card title="Réserver une salle" />
        <Card title="Notifications" />
        <Card title="État des ordinateurs" />
      </div>
    </div>
  );
}

export default Home;*/

import Card from "../components/Card";
import { useOutletContext } from "react-router-dom";

function Home() {
  const user = useOutletContext();

  return (
    <div className="content">
      <h1>Bienvenue {user.prenom} 👋</h1>

      <div className="cards-container">
        <Card title="Salles disponibles" />
        <Card title="Réserver une salle" />
        <Card title="Notifications" />
        <Card title="État des ordinateurs" />
      </div>
    </div>
  );
}

export default Home;