import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import Connexion from "./connexion";
import AccueilPrive from "./accueilPrive";
import Inscription from "./inscription";
import AccueilVisiteur from "./accueilVisiteur";
import Profil from "./Profil";
=======
import Connexion from "./Connexion";
import AccueilPrive from "./AccueilPrive";
//import PrivateLayout from "./layouts/PrivateLayout";
>>>>>>> 48db589 (Amélioration ENT : layout + sidebar + routing corrigé)

import Home from "./pages/Home";
import Salles from "./pages/Salles";
import Reservations from "./pages/Reservations";
import Notifications from "./pages/Notifications";
import Ordinateurs from "./pages/Ordinateurs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

<<<<<<< HEAD
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
=======
        
       <Route path="/" element={<Connexion />}/>

        
        <Route path="/accueilPrive" element={<AccueilPrive />}>
          <Route path="home" element={<Home />} />
          <Route path="salles" element={<Salles />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="ordinateurs" element={<Ordinateurs />} />
        </Route>
>>>>>>> 48db589 (Amélioration ENT : layout + sidebar + routing corrigé)

      </Routes>
    </BrowserRouter>
  );
}

export default App;

