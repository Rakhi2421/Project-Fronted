
// import React, { useState, useEffect } from 'react';
// import { Download, Mail, CheckSquare, Square } from 'lucide-react';
// import RingChart from './charts/RingChart';
// import StatLegend from './charts/StatLegend';
// import ContactList from './contacts/ContactList';

// const SurveyResponses = () => {
//   const [selectAll, setSelectAll] = useState(false);
//   const [responseData, setResponseData] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null); // Clear any previous error
//       try {
//         // Replace this mock URL with your actual API endpoint later
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
//         // Check if the response is OK
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
        
//         // Simulated response data structure for testing
//         const data = await response.json();
//         const mockResponseData = {
//           totalSent: 100,
//           responded: 65,
//           notResponded: 30,
//           failedDelivery: 5
//         };
//         const mockContacts = data.map((user, index) => ({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           selected: false,
//           status: index % 2 === 0 ? 'not_responded' : 'failed_delivery'
//         }));

//         // Set the simulated data to state
//         setResponseData(mockResponseData);
//         setContacts(mockContacts);
//       } catch (error) {
//         console.error('Error fetching survey data:', error);
//         setError(error.message);  // Store error message in state
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll);
//     setContacts(contacts.map(contact => ({
//       ...contact,
//       selected: !selectAll
//     })));
//   };

//   const handleSelectContact = (id) => {
//     setContacts(contacts.map(contact => 
//       contact.id === id 
//         ? { ...contact, selected: !contact.selected }
//         : contact
//     ));
//     setSelectAll(contacts.every(contact => contact.selected));
//   };

//   const handleResendEmails = () => {
//     const selectedContacts = contacts.filter(contact => contact.selected);
//     console.log('Resending emails to:', selectedContacts);
//   };

//   const respondedPercentage = responseData ? (responseData.responded / responseData.totalSent) * 100 : 0;
//   const deliveredPercentage = responseData ? ((responseData.totalSent - responseData.failedDelivery) / responseData.totalSent) * 100 : 0;

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Survey Responses</h2>
//       </div>

//       {error && <div className="text-red-600">{`Error: ${error}`}</div>}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="font-semibold text-gray-800 mb-4">Response Rate</h3>
//           <RingChart
//             percentage={respondedPercentage}
//             color="#22c55e"
//             label="Responded"
//           />
//           <StatLegend
//             items={[
//               { color: 'bg-green-500', label: 'Responded', value: responseData.responded },
//               { color: 'bg-gray-200', label: 'Not Responded', value: responseData.notResponded }
//             ]}
//           />
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="font-semibold text-gray-800 mb-4">Delivery Status</h3>
//           <RingChart
//             percentage={deliveredPercentage}
//             color="#3b82f6"
//             label="Delivered"
//           />
//           <StatLegend
//             items={[
//               { color: 'bg-blue-500', label: 'Delivered', value: responseData.totalSent - responseData.failedDelivery },
//               { color: 'bg-red-500', label: 'Failed', value: responseData.failedDelivery }
//             ]}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-gray-800">Unresponded & Failed Deliveries</h3>
//             <button
//               onClick={handleResendEmails}
//               disabled={!contacts.some(c => c.selected)}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
//                 ${contacts.some(c => c.selected)
//                   ? 'bg-blue-500 hover:bg-blue-600 text-white'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//             >
//               <Mail className="w-4 h-4" />
//               <span>Resend Emails</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="p-4 border-b border-gray-200">
//           <button
//             onClick={handleSelectAll}
//             className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
//           >
//             {selectAll ? (
//               <CheckSquare className="w-5 h-5 text-blue-500" />
//             ) : (
//               <Square className="w-5 h-5" />
//             )}
//             <span>Select All</span>
//           </button>
//         </div>

//         <ContactList
//           contacts={contacts}
//           onSelectContact={handleSelectContact}
//         />
//       </div>
//     </div>
//   );
// };

// export default SurveyResponses;











// import React, { useState, useEffect } from 'react';
// import { Download, FileSpreadsheet } from 'lucide-react';
// import RingChart from './charts/RingChart';
// import StatLegend from './charts/StatLegend';
// import * as XLSX from 'xlsx';
// import axios from 'axios';

// const SurveyResponses = () => {
//   const [selectedFormId, setSelectedFormId] = useState('');
//   const [responseData, setResponseData] = useState({
//     totalSent: 0,
//     responded: 0,
//     notResponded: 0,
//     failedDelivery: 0,
//   });

//   // Fetch data from backend when component mounts
//   useEffect(() => {
//     // Replace this with your actual API endpoint
//     axios.get('http://127.0.0.1:8000/api/survey-responses')
//       .then((response) => {
//         // Update the state with the response data
//         setResponseData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching survey data:', error);
//       });
//   }, []); // Empty dependency array means this runs once on mount

//   // Sample forms data - In a real app, fetch from backend
//   const forms = [
//     {
//       id: 'customer-satisfaction',
//       title: 'Customer Satisfaction Survey',
//       responses: [
//         { name: 'John Doe', email: 'john@example.com', satisfaction: 'very-satisfied', feedback: 'Great service!' },
//         { name: 'Jane Smith', email: 'jane@example.com', satisfaction: 'satisfied', feedback: 'Good experience overall' }
//       ]
//     },
//     // {
//     //   id: 'employee-engagement',
//     //   title: 'Employee Engagement Survey',
//     //   responses: [
//     //     { name: 'Mike Johnson', email: 'mike@example.com', engagement: 'high', suggestions: 'More team events' },
//     //     { name: 'Sarah Williams', email: 'sarah@example.com', engagement: 'medium', suggestions: 'Better communication' }
//     //   ]
//     // },
//     // {
//     //   id: 'product-feedback',
//     //   title: 'Product Feedback Survey',
//     //   responses: [
//     //     { name: 'Alex Brown', email: 'alex@example.com', rating: '4', feedback: 'User-friendly interface' },
//     //     { name: 'Emma Davis', email: 'emma@example.com', rating: '5', feedback: 'Love the new features' }
//     //   ]
//     // }
//   ];

//   const handleExportToExcel = () => {
//     if (!selectedFormId) {
//       alert('Please select a form to export');
//       return;
//     }

//     const form = forms.find(f => f.id === selectedFormId);
//     if (!form || !form.responses.length) return;

//     // Convert the responses to worksheet data
//     const ws = XLSX.utils.json_to_sheet(form.responses);
//     // Create a workbook and add the worksheet
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Responses');
//     // Generate Excel file and trigger download
//     XLSX.writeFile(wb, `${form.title}-responses.xlsx`);
//   };

//   // Calculate the response and delivery percentages
//   const respondedPercentage = (responseData.responded / responseData.totalSent) * 100;
//   const deliveredPercentage = ((responseData.totalSent - responseData.failedDelivery) / responseData.totalSent) * 100;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Survey Responses</h2>
//       </div>

//       {/* Response Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Response Rate Chart */}
//         <div className="bg-grey-200 rounded-lg shadow-md p-6">
//           <h3 className="font-semibold text-gray-800 mb-4">Response Rate</h3>
//           <RingChart
//             percentage={respondedPercentage}
//             color="#22c55e"
//             label="Responded"
//             value={responseData.responded}
//             total={responseData.totalSent}
//           />
//           <StatLegend
//             items={[
//               { label: 'Responded', value: responseData.responded, color: 'bg-green-500' },
//               { label: 'Not Responded', value: responseData.notResponded, color: 'bg-gray-200' }
//             ]}
//           />
//         </div>

//         {/* Delivery Status Chart */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="font-semibold text-gray-800 mb-4">Delivery Status</h3>
//           <RingChart
//             percentage={deliveredPercentage}
//             color="#3b82f6"
//             label="Delivered"
//             value={responseData.totalSent - responseData.failedDelivery}
//             total={responseData.totalSent}
//           />
//           <StatLegend
//             items={[
//               { label: 'Delivered', value: responseData.totalSent - responseData.failedDelivery, color: 'bg-blue-500' },
//               { label: 'Failed', value: responseData.failedDelivery, color: 'bg-red-500' }
//             ]}
//           />
//         </div>
//       </div>

//       {/* Export Section
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-gray-800">Export Survey Responses</h3>
//           <button
//             onClick={handleExportToExcel}
//             disabled={!selectedFormId}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
//               selectedFormId
//                 ? 'bg-green-500 hover:bg-green-600 text-white'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             <Download className="w-4 h-4" />
//             <span>Export Selected Form</span>
//           </button>
//         </div>

//         <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
//           {forms.map((form) => (
//             <div
//               key={form.id}
//               onClick={() => setSelectedFormId(form.id)}
//               className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
//                 selectedFormId === form.id ? 'bg-blue-50' : 'hover:bg-gray-50'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className={`p-2 rounded-lg ${
//                   selectedFormId === form.id ? 'bg-blue-100' : 'bg-gray-100'
//                 }`}>
//                   <FileSpreadsheet className={`w-5 h-5 ${
//                     selectedFormId === form.id ? 'text-blue-600' : 'text-gray-600'
//                   }`} />
//                 </div>
//                 <div>
//                   <h4 className={`font-medium ${
//                     selectedFormId === form.id ? 'text-blue-900' : 'text-gray-900'
//                   }`}>
//                     {form.title}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {form.responses.length} responses received
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {forms.length === 0 && (
//         <div className="text-center py-12">
//           <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Responses Yet</h3>
//           <p className="text-gray-500">Responses will appear here once surveys are completed</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveyResponses;







import React, { useState, useEffect } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import RingChart from './charts/RingChart';
import StatLegend from './charts/StatLegend';
import * as XLSX from 'xlsx';
import axios from 'axios';

const SurveyResponses = () => {
  const [responseData, setResponseData] = useState({
    totalSent: 0,
    responded: 0,
    notResponded: [],
    failedDelivery: [],
  });

  useEffect(() => {
    // Fetch data from backend
    axios
      .get('http://127.0.0.1:8000/api/survey-responses')
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching survey data:', error);
      });
  }, []);

  const exportToExcel = (data, filename) => {
    if (!data || !data.length) {
      alert('No data available for export');
      return;
    }

    // Prepare data for export
    const exportData = data.map(({ name, email, organisation }) => ({
      Name: name,
      Email: email,
      Organisation: organisation,
    }));

    // Convert the responses to worksheet data
    const ws = XLSX.utils.json_to_sheet(exportData);
    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const respondedPercentage =
    (responseData.responded / responseData.totalSent) * 100;
  const deliveredPercentage =
    ((responseData.totalSent - responseData.failedDelivery.length) /
      responseData.totalSent) *
    100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Survey Responses</h2>
      </div>

      {/* Response Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Response Rate Chart */}
        <div className="bg-grey-200 rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Response Rate</h3>
          <RingChart
            percentage={respondedPercentage}
            color="#22c55e"
            label="Responded"
            value={responseData.responded}
            total={responseData.totalSent}
          />
          <StatLegend
            items={[
              {
                label: 'Responded',
                value: responseData.responded,
                color: 'bg-green-500',
              },
              {
                label: 'Not Responded',
                value: responseData.notResponded.length,
                color: 'bg-gray-200',
              },
            ]}
          />
        </div>

        {/* Delivery Status Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Delivery Status</h3>
          <RingChart
            percentage={deliveredPercentage}
            color="#3b82f6"
            label="Delivered"
            value={responseData.totalSent - responseData.failedDelivery.length}
            total={responseData.totalSent}
          />
          <StatLegend
            items={[
              {
                label: 'Delivered',
                value:
                  responseData.totalSent - responseData.failedDelivery.length,
                color: 'bg-blue-500',
              },
              {
                label: 'Failed',
                value: responseData.failedDelivery.length,
                color: 'bg-red-500',
              },
            ]}
          />
        </div>
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">Export Data</h3>
        <div className="flex space-x-4">
          <button
            onClick={() =>
              exportToExcel(
                responseData.notResponded,
                'Non-Responded-Responses'
              )
            }
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Download className="w-4 h-4" />
            <span>Export Non-Responded</span>
          </button>
          <button
            onClick={() =>
              exportToExcel(
                responseData.failedDelivery,
                'Undelivered-Responses'
              )
            }
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            <Download className="w-4 h-4" />
            <span>Export Undelivered</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponses;
