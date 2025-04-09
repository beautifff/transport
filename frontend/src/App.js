import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import PriceComparison from './components/PriceComparison';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfileIcon from './components/ProfileIcon';

function Header() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="App-header">
      <h1 onClick={handleTitleClick}>Preis Reise</h1>
      <ProfileIcon />
    </header>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PriceComparison />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
