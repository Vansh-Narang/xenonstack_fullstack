// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './pages/Navbar';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import PropertyListing from "./pages/PropertyListing";
import Register from "./pages/Register";
import RecommendedProperties from './pages/RecommendedProperties';
import UnderConstruction from './pages/UnderConstruction';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear the token
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Check if user is already authenticated
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/properties" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/properties" /> : <Login onLogin={handleLogin} />} />
        <Route path="/properties" element={isAuthenticated ? <PropertyListing /> : <Navigate to="/login" />} />
        {/* <Route path="/recommendations" element={isAuthenticated ? <RecommendedProperties /> : <Navigate to="/login" />} /> */}
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Router>
  );
}

export default App;
