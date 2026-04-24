import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./connexion";
import AccueilPrive from "./accueilPrive";
import Inscription from "./inscription";
import AccueilVisiteur from "./accueilVisiteur";
import Profil from "./Profil";

import Salles from "./pages/Salles";
import Reservations from "./pages/Reservations";
import Notifications from "./pages/Notifications";
import Ordinateurs from "./pages/Ordinateurs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* page publique */}
        <Route path="/" element={<AccueilVisiteur />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/accueilVisiteur" element={<AccueilVisiteur />} />

        {/* espace privé */}
        <Route path="/accueilPrive" element={<AccueilPrive />} />

        {/* pages secondaires (option simple) */}
        <Route path="/salles" element={<Salles />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ordinateurs" element={<Ordinateurs />} />
        <Route path="/profil" element={<Profil />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;