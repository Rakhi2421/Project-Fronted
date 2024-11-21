import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mail, CheckSquare, Square, FileSpreadsheet, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
 
const SurveyLaunch = () => {
  const [contacts, setContacts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const fileInputRef = useRef(null);
 
  useEffect(() => {
    // Get selected form from localStorage
    const savedForm = localStorage.getItem('selectedSurveyForm');
    if (savedForm) {
      setSelectedForm(JSON.parse(savedForm));
    }
  }, []);
 
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    setError('');
 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
 
          if (jsonData.length === 0) {
            setError('The Excel file is empty');
            return;
          }
 
          const firstRow = jsonData[0];
          if (!('name' in firstRow) || !('email' in firstRow)) {
            setError('Excel file must contain "name" and "email" columns');
            return;
          }
 
          const newContacts = jsonData
            .filter(row => row.name && row.email)
            .map((row, index) => ({
              id: index + 1,
              name: row.name.trim(),
              email: row.email.trim(),
              selected: false,
            }));
 
          setContacts(newContacts);
        } catch (err) {
          setError('Error reading Excel file. Please ensure it\'s a valid .xlsx file');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
 
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setContacts(contacts.map(contact => ({
      ...contact,
      selected: !selectAll
    })));
  };
 
  const handleSelectContact = (id) => {
    setContacts(contacts.map(contact =>
      contact.id === id
        ? { ...contact, selected: !contact.selected }
        : contact
    ));
    setSelectAll(contacts.every(contact => contact.selected));
  };
 
  const handleBroadcastEmail = () => {
    if (!selectedForm) {
      setError('Please select a survey form first');
      return;
    }
    const selectedContacts = contacts.filter(contact => contact.selected);
    console.log('Sending survey:', selectedForm.title);
    console.log('To contacts:', selectedContacts);
    // api for sending email
  };
 
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
 
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Survey Launch</h2>
        <div className="flex space-x-4">
          <button
            onClick={triggerFileInput}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import Excel</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx,.xls"
            className="hidden"
          />
          <button
            onClick={handleBroadcastEmail}
            disabled={!contacts.some(c => c.selected) || !selectedForm}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${contacts.some(c => c.selected) && selectedForm
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            <Mail className="w-4 h-4" />
            <span>Send Broadcast</span>
          </button>
        </div>
      </div>
 
      {selectedForm && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileSpreadsheet className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Selected Survey: <span className="font-medium">{selectedForm.title}</span>
              </p>
            </div>
          </div>
        </div>
      )}
 
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
 
      {/* Rest of the component remains the same */}
      {contacts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                {selectAll ? (
                  <CheckSquare className="w-5 h-5 text-blue-500" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span>Select All</span>
              </button>
              <span className="text-sm text-gray-500">
                {contacts.filter(c => c.selected).length} of {contacts.length} selected
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-4 hover:bg-gray-50"
              >
                <button
                  onClick={() => handleSelectContact(contact.id)}
                  className="flex items-center space-x-2"
                >
                  {contact.selected ? (
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div className="ml-4 flex-1 flex items-center">
                  <span className="w-8 text-gray-500">{contact.id}.</span>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <span className="text-gray-900">{contact.name}</span>
                    <span className="text-gray-600">{contact.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {contacts.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Contacts Imported</h3>
          <p className="text-gray-500 mb-4">Import an Excel file with name and email columns to get started</p>
          <button
            onClick={triggerFileInput}
            className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <Upload className="w-4 h-4" />
            <span>Import Excel File</span>
          </button>
        </div>
      )}
    </div>
  );
};
 
export default SurveyLaunch;