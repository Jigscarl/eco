import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EnhancedDashboardPanel from '../components/EnhancedDashboardPanel';
import DataEntryDashboard from '../components/DataEntryDashboard';
import PDFReportGenerator from '../components/PDFReportGenerator';
import ReportsPanel from '../components/ReportsPanel';
import CompanyProfile from './CompanyProfile';
import { LogOut, Menu, X } from 'lucide-react';

function Dashboard({ onLogout, checkPremiumAccess, userSubscription }) {
  const [activePanel, setActivePanel] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPanel = () => {
    switch(activePanel) {
      case 'dashboard':
        return <EnhancedDashboardPanel checkPremiumAccess={checkPremiumAccess} userSubscription={userSubscription} />;
      case 'company-profile':
        return <CompanyProfile />;
      case 'data-entry':
        return <DataEntryDashboard />;
      case 'reports':
        return <PDFReportGenerator checkPremiumAccess={checkPremiumAccess} userSubscription={userSubscription} />;
      default:
        return <EnhancedDashboardPanel checkPremiumAccess={checkPremiumAccess} userSubscription={userSubscription} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
      </button>

      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:block w-64 h-full transition-transform duration-300 ease-in-out z-50 lg:z-auto`}>
        <Sidebar 
          activePanel={activePanel} 
          setActivePanel={setActivePanel}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header with logout */}
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">EcoTrack Dashboard</h1>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>
        
        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          {renderPanel()}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;