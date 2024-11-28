import { Routes, Route } from 'react-router-dom';

import Add from '../views/Add.jsx';
import CharacterPage from '../views/CharacterPage.jsx';
import HomePage from '../views/HomePage.jsx';
import Powers from '../views/Powers.jsx';
import Team from '../views/Team.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Powers" element={<Powers />} />
      <Route path="/Team" element={<Team />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Character" element={<CharacterPage />} />
    </Routes>
  );
}

export default AppRouter;