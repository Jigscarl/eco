import { Leaf, Home, FileText, Database, Building } from 'lucide-react';

function Sidebar({ activePanel, setActivePanel }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'company-profile', label: 'Company Profile', icon: Building },
    { id: 'data-entry', label: 'Data Entry', icon: Database },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-800">EcoTrack</span>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                activePanel === item.id
                  ? 'bg-green-50 text-green-600 border-r-4 border-green-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
