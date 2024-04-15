import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage.jsx'; 
import OverpassPage from './pages/overpass.jsx';
import MiragePage from './pages/mirage.jsx';
import Dust2Page from './pages/dust2.jsx';
import InfernoPage from './pages/inferno.jsx';
import NukePage from './pages/nuke.jsx';
import TrainPage from './pages/train.jsx';
import Signup from './pages/signup.jsx';
import Maps from './pages/maps.jsx';
import SubsectionPage from './pages/tactics.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overpass" element={<OverpassPage />} />
        <Route path="/mirage" element={<MiragePage />} />
        <Route path="/dust2" element={<Dust2Page />} />
        <Route path="/inferno" element={<InfernoPage />} />
        <Route path="/nuke" element={<NukePage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/:mapName/:subsectionName" element={<SubsectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
