import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connexion from './connexion';
import Inscription from './inscription';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;