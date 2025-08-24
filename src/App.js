import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Proprietaire from "./proprietaire/proprietaire";

function Navigation() {
  const location = useLocation();
  // Masquer la nav sur /proprietaire
  if (location.pathname === "/proprietaire") return null;
  return (
    <nav>
      <Link to="/proprietaire">Propriétaire</Link> |{" "}
      <Link to="/pageOgbgte">Ogbgte</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/proprietaire" element={<Proprietaire />} />
        {/* Ajoutez d'autres routes ici si besoin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;