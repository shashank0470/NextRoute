import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SelectTechPage from './pages/SelectTechPage';
import RoadmapPage from './pages/RoadmapPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select" element={<SelectTechPage />} />
          <Route path="/roadmap/:id" element={<RoadmapPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;