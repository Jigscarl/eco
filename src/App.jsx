import { useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'auth', 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  // Render based on current view and authentication state
  if (currentView === 'landing' && !isAuthenticated) {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'auth' && !isAuthenticated) {
    return <Auth onBack={handleBackToLanding} onLogin={handleLogin} />;
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return <Landing onGetStarted={handleGetStarted} />;
}

export default App;