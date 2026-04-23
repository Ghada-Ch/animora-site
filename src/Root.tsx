import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import BuildingPage from './pages/BuildingPage';

const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/start-building" element={<BuildingPage />} />
      </Routes>
    </Router>
  );
};

export default Root;
