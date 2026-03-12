import { useState } from 'react';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PaymentModal from './components/PaymentModal';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'register', 'login', 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, feature: null });
  const [userSubscription, setUserSubscription] = useState(null); // null, 'basic', 'pro', 'enterprise'

  const handleGetStarted = () => {
    setCurrentView('register');
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
    setUserSubscription(null);
  };

  const handleGoToRegister = () => {
    setCurrentView('register');
  };

  const handleGoToLogin = () => {
    setCurrentView('login');
  };

  const openPaymentModal = (feature) => {
    setPaymentModal({ isOpen: true, feature });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, feature: null });
  };

  const handlePaymentSuccess = (plan) => {
    setUserSubscription(plan);
    closePaymentModal();
    // Show success message
    alert(`🎉 Successfully upgraded to ${plan} plan! You can now access all premium features.`);
  };

  const checkPremiumAccess = (feature) => {
    if (!userSubscription) {
      openPaymentModal(feature);
      return false;
    }
    return true;
  };

  // Render based on current view and authentication state
  if (currentView === 'landing' && !isAuthenticated) {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'register' && !isAuthenticated) {
    return <Register onBack={handleBackToLanding} onRegistrationSuccess={handleGoToLogin} />;
  }

  if (currentView === 'login' && !isAuthenticated) {
    return <Login onBack={handleBackToLanding} onLogin={handleLogin} onGoToRegister={handleGoToRegister} />;
  }

  if (isAuthenticated) {
    return (
      <>
        <Dashboard 
          onLogout={handleLogout} 
          checkPremiumAccess={checkPremiumAccess}
          userSubscription={userSubscription}
        />
        <PaymentModal
          isOpen={paymentModal.isOpen}
          feature={paymentModal.feature}
          onClose={closePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </>
    );
  }

  return <Landing onGetStarted={handleGetStarted} />;
}

export default App;