import React, { useState, useEffect } from 'react';
import { Building2, Cloud, Server } from 'lucide-react';

// StatCard component remains the same
const StatCard = ({ title, count, icon: Icon, color }) => (
  <div className={`flex-1 bg-white rounded-xl shadow-xl p-8 min-w-[300px] min-h-[180px] transform hover:scale-105 transition-transform duration-300 ${color}`}>
    <div className="flex flex-col h-full justify-between">
      <div className={`p-4 rounded-full w-fit ${color.replace('border-l-4', 'bg-opacity-10')}`}>
        <Icon className="w-10 h-10" />
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-bold mb-2">{count}</h3>
        <p className="text-gray-500 text-lg font-medium">{title}</p>
      </div>
    </div>
  </div>
);

const CompanyStats = () => {
  // State for holding the data fetched from the API
  const [stats, setStats] = useState([
    { title: 'Total Companies', count: 2700, icon: Building2, color: 'border-l-4 border-blue-500' },
    { title: 'Cloud4C Companies', count: 1700, icon: Cloud, color: 'border-l-4 border-purple-500' },
    { title: 'CtrlS Companies', count: 1000, icon: Server, color: 'border-l-4 border-green-500' },
  ]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Make an API call to get the stats data (replace with your actual API endpoint)
        const response = await fetch('https://api.example.com/stats');
        const data = await response.json();

        // Assuming the API returns an object with `totalCompanies`, `cloud4CCompanies`, and `ctrlSCompanies`
        setStats([
          { title: 'Total Companies', count: data.totalCompanies, icon: Building2, color: 'border-l-4 border-blue-500' },
          { title: 'Cloud4C Companies', count: data.cloud4CCompanies, icon: Cloud, color: 'border-l-4 border-purple-500' },
          { title: 'CtrlS Companies', count: data.ctrlSCompanies, icon: Server, color: 'border-l-4 border-green-500' },
        ]);
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };

    fetchStats();
  }, []); // Empty dependency array means this will run only once when the component mounts

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default CompanyStats;
