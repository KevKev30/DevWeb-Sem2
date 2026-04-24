import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./Connexion";
import AccueilPrive from "./AccueilPrive";

import Salles from "./pages/Salles";
import Reservations from "./pages/Reservations";
import Notifications from "./pages/Notifications";
import Ordinateurs from "./pages/Ordinateurs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* page publique */}
        <Route path="/" element={<Connexion />} />

        {/* espace privé */}
        <Route path="/accueilPrive" element={<AccueilPrive />} />

        {/* pages secondaires (option simple) */}
        <Route path="/salles" element={<Salles />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ordinateurs" element={<Ordinateurs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;