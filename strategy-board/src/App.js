import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './view/Homepage.jsx'; 
import OverpassPage from './view/overpass.jsx';
import Signup from './view/signup.jsx';
import Maps from './view/maps.jsx';
import SubsectionPage from './view/tactics.jsx';
import AdminPage from './view/admin.jsx';

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
