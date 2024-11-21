// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import { utils, writeFile } from 'xlsx';
// import { FunnelIcon } from '@heroicons/react/24/outline';
// import ColumnFilter from './ColumnFilter';

// const Reports = () => {
//   const [data, setData] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [showColumnSelector, setShowColumnSelector] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState({
//     id: true,
//     name: true,
//     email: true,
//     subdepartment: true,
//     status: true,
//     organisation: true,
//   });

//   useEffect(() => {
//     // Fetch data from the FastAPI backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/reports'); // Replace with your FastAPI URL
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = useMemo(
//     () => [
//       { header: 'ID', accessorKey: 'id' },
//       { header: 'Name', accessorKey: 'name' },
//       { header: 'Email', accessorKey: 'email' },
//       { header: 'SubDepartment', accessorKey: 'subdepartment' },
//       { header: 'Status', accessorKey: 'status' },
//       { header: 'Organisation', accessorKey: 'organisation' },
//     ],
//     []
//   );

//   const visibleColumnsList = useMemo(
//     () => columns.filter(col => visibleColumns[col.accessorKey]),
//     [visibleColumns]
//   );

//   const table = useReactTable({
//     data,
//     columns: visibleColumnsList,
//     state: { columnFilters },
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   const exportToExcel = () => {
//     const visibleData = data.map(row => {
//       const newRow = {};
//       Object.keys(visibleColumns).forEach(key => {
//         if (visibleColumns[key]) {
//           newRow[key] = row[key];
//         }
//       });
//       return newRow;
//     });

//     const ws = utils.json_to_sheet(visibleData);
//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, ws, 'Reports');
//     writeFile(wb, 'reports.xlsx');
//   };

//   const toggleColumn = (columnId) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [columnId]: !prev[columnId],
//     }));
//   };

//   return (
//     <div className="w-full">
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Reports</h1>
//         <div className="space-x-4">
//           <div className="relative inline-block">
//             <button
//               onClick={() => setShowColumnSelector(!showColumnSelector)}
//               className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2 hover:bg-gray-200"
//             >
//               <FunnelIcon className="h-5 w-5" />
//               Show/Hide Columns
//             </button>
//             {showColumnSelector && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2 border border-gray-200">
//                 {columns.map(column => (
//                   <label key={column.accessorKey} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={visibleColumns[column.accessorKey]}
//                       onChange={() => toggleColumn(column.accessorKey)}
//                       className="mr-2"
//                     />
//                     {column.header}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={exportToExcel}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             Export to Excel
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <th
//                     key={header.id}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(header.column.columnDef.header, header.getContext())}
//                         <ColumnFilter column={header.column} />
//                       </div>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map(cell => (
//                   <td
//                     key={cell.id}
//                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;




import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { utils, writeFile } from 'xlsx';
import { FunnelIcon } from '@heroicons/react/24/outline';
import ColumnFilter from './ColumnFilter';

const Reports = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    subdepartment: true,
    status: true,
    organisation: true,
  });

  useEffect(() => {
    // Fetch data from the FastAPI backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reports'); // Replace with your FastAPI URL
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { header: 'ID', accessorKey: 'id' },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'SubDepartment', accessorKey: 'subdepartment' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'Organisation', accessorKey: 'organisation' },
    ],
    []
  );

  const visibleColumnsList = useMemo(
    () => columns.filter(col => visibleColumns[col.accessorKey]),
    [visibleColumns]
  );

  const table = useReactTable({
    data,
    columns: visibleColumnsList,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const exportToExcel = () => {
    const visibleData = data.map(row => {
      const newRow = {};
      Object.keys(visibleColumns).forEach(key => {
        if (visibleColumns[key]) {
          newRow[key] = row[key];
        }
      });
      return newRow;
    });

    const ws = utils.json_to_sheet(visibleData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Reports');
    writeFile(wb, 'reports.xlsx');
  };

  const toggleColumn = (columnId) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const toggleAllColumns = (checked) => {
    const updatedColumns = Object.keys(visibleColumns).reduce((acc, column) => {
      acc[column] = checked;
      return acc;
    }, {});
    setVisibleColumns(updatedColumns);
  };

  const areAllColumnsChecked = useMemo(
    () => Object.values(visibleColumns).every(value => value),
    [visibleColumns]
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="space-x-4">
          <div className="relative inline-block">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2 hover:bg-gray-200"
            >
              <FunnelIcon className="h-5 w-5" />
              Show/Hide Columns
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2 border border-gray-200 overflow-y-auto max-h-64">
                <label className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areAllColumnsChecked}
                    onChange={(e) => toggleAllColumns(e.target.checked)}
                    className="mr-2"
                  />
                  Select All
                </label>
                {columns.map(column => (
                  <label key={column.accessorKey} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns[column.accessorKey]}
                      onChange={() => toggleColumn(column.accessorKey)}
                      className="mr-2"
                    />
                    {column.header}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ColumnFilter column={header.column} />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;








