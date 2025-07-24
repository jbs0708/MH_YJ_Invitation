// src/App.js
import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WeddingPage from './pages/WeddingPage';
import GalleryPage from './pages/GalleryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
