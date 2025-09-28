// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOTP';
import Dashboard from './components/Dashboard';
import AuthLayout from './components/AuthLayout';

function App() {
  // Add 'login' to our possible views
  const [view, setView] = useState('signup'); 
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handlers for switching views
  const switchToLogin = () => setView('login');
  const switchToSignup = () => setView('signup');

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    setView('verify');
  };
  
  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('signup');
  };

  // Render based on token
  if (token) {
    return (
      <div className="App">
        <Dashboard onLogout={handleLogout} />
      </div>
    );
  }

  // Conditional rendering for auth flow
  const renderAuthView = () => {
    switch (view) {
      case 'signup':
        return <Signup onSignupSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />;
      case 'login':
        return <Login onAuthSubmit={handleAuthSuccess} onSwitchToSignup={switchToSignup} />;
      case 'verify':
        return <VerifyOTP email={userEmail} onLoginSuccess={handleLoginSuccess} />;
      default:
        return <Signup onSignupSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />;
    }
  };

    return (
    <div className="App">
      {/* Wrap the rendered auth view with the new layout */}
      <AuthLayout>
        {renderAuthView()}
      </AuthLayout>
    </div>
  );
}

export default App;