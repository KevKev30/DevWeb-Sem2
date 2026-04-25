import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./connexion";
import Inscription from "./inscription";
import AccueilVisiteur from "./accueilVisiteur";
import AccueilPrive from "./accueilPrive";

import Profil from "./pages/Profil";
import Capteurs from "./pages/Capteurs";
import Membres from "./pages/Membres";
import Salles from "./pages/Salles";
import RestoU from "./pages/RestoU";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* pages publiques */}
        <Route path="/" element={<AccueilVisiteur />} />
        <Route path="/accueilVisiteur" element={<AccueilVisiteur />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* espace privé */}
        <Route path="/accueilPrive" element={<AccueilPrive />} />
        <Route path="/accueilPrive/salles" element={<Salles />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/accueilPrive/capteurs" element={<Capteurs />} />
        <Route path="/accueilPrive/membres" element={<Membres />} />
        <Route path="/accueilPrive/menus" element={<RestoU />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;