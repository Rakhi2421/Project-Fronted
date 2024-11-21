import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ClipboardList, BarChart3, FileSpreadsheet, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'companies', label: 'Registered Companies', icon: Building2, path: '/companies' },
    { id: 'forms', label: 'Survey Forms', icon: FileSpreadsheet, path: '/forms' },
    { id: 'survey', label: 'Survey Launch', icon: ClipboardList, path: '/survey' },
    { id: 'response', label: 'Response', icon: BarChart3, path: '/response' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' }
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Cloud4C</h1>
        <p className="text-sm text-gray-400">Admin Dashboard</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-4 text-left ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;