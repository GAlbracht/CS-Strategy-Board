import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage.jsx'; 
import OverpassPage from './pages/overpass.jsx';
import Signup from './pages/signup.jsx';
import Maps from './pages/maps.jsx';
import SubsectionPage from './pages/tactics.jsx';
import AdminPage from './pages/admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:mapName" element={<OverpassPage />} />
        <Route path="" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:mapName/:subsectionName" element={<SubsectionPage />} />
        <Route path="/admin-upload" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
