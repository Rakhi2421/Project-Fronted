import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RegisteredCompanies from './components/RegisteredCompanies';
import SurveyLaunch from './components/SurveyLaunch';
import Response from './components/SurveyResponses';
import SurveyForms from './components/SurveyForms';
import CompanyList from './components/CompanyList';
import Reports from './components/Reports';

const App = () => {
  const [activeTab, setActiveTab] = useState('companies'); // No type declaration for useState

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <div className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/" element={<RegisteredCompanies />} />
            <Route path="/companies" element={<RegisteredCompanies />} />
            <Route path="/survey" element={<SurveyLaunch />} />
            <Route path="/response" element={<Response />} />
            <Route path="/forms" element={<SurveyForms />} />
            <Route path="/CompanyList" element={<CompanyList />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;



