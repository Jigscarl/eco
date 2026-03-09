import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardPanel from '../components/DashboardPanel';
import DataEntryPanel from '../components/DataEntryPanel';
import ReportsPanel from '../components/ReportsPanel';
import { LogOut } from 'lucide-react';

function Dashboard({ onLogout }) {
  const [activePanel, setActivePanel] = useState('dashboard');

  const renderPanel = () => {
    switch(activePanel) {
      case 'dashboard':
        return <DashboardPanel />;
      case 'data-entry':
        return <DataEntryPanel />;
      case 'reports':
        return <ReportsPanel />;
      default:
        return <DashboardPanel />;
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