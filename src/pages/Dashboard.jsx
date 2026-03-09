import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EnhancedDashboardPanel from '../components/EnhancedDashboardPanel';
import DataEntryDashboard from '../components/DataEntryDashboard';
import PDFReportGenerator from '../components/PDFReportGenerator';
import ReportsPanel from '../components/ReportsPanel';
import CompanyProfile from './CompanyProfile';
import { LogOut } from 'lucide-react';

function Dashboard({ onLogout }) {
  const [activePanel, setActivePanel] = useState('dashboard');

  const renderPanel = () => {
    switch(activePanel) {
      case 'dashboard':
        return <EnhancedDashboardPanel />;
      case 'company-profile':
        return <CompanyProfile />;
      case 'data-entry':
        return <DataEntryDashboard />;
      case 'reports':
        return <PDFReportGenerator />;
      default:
        return <EnhancedDashboardPanel />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <div className="flex-1 flex flex-col">
        {/* Header with logout */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">EcoTrack Dashboard</h1>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>
        
        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderPanel()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;