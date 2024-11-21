import React from 'react';

const StatLegend = ({ items }) => {
  return (
    <div className="mt-4 flex justify-center space-x-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-3 h-3 ${item.color} rounded-full mr-2`}></div>
          <span className="text-sm text-gray-600">{item.label} ({item.value})</span>
        </div>
      ))}
    </div>
  );
};

export default StatLegend;