
import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';

const SurveyForms = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  // Dummy survey forms data
  const surveyForms = [
    {
      id: 1,
      title: 'Form 1',
      description: 'KYC FORM',
      url: 'https://example.com/forms/customer-satisfaction',
      category: 'Customer Feedback',
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      title: 'Form 2',
      description: 'NA',
      url: 'https://example.com/forms/employee-engagement',
      category: 'HR',
      lastUpdated: '2024-03-14'
    },
    {
      id: 3,
      title: 'Form 3',
      description: 'NA',
      url: 'https://example.com/forms/product-feedback',
      category: 'Product',
      lastUpdated: '2024-03-13'
    }
  ];

  const handleFormSelect = (formId) => {
    setSelectedForm(formId);
    // Store selected form in localStorage for SurveyLaunch component
    localStorage.setItem('selectedSurveyForm', JSON.stringify(
      surveyForms.find(form => form.id === formId)
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Survey Forms</h2>
          <p className="text-gray-600 mt-1">Select a form for survey </p>
        </div>
        <button className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Create New Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveyForms.map((form) => (
          <div
            key={form.id}
            onClick={() => handleFormSelect(form.id)}
            className={`relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedForm === form.id ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            {selectedForm === form.id && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{form.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{form.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="text-gray-500">{form.questions} Questions</span> */}
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {form.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  {/* <span className="text-gray-500">Last updated: {form.lastUpdated}</span> */}
                  <a 
                    href={form.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {surveyForms.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Survey Forms</h3>
          <p className="text-gray-500">Create your first survey form to get started</p>
        </div>
      )}
    </div>
  );
};

export default SurveyForms;