import React from 'react';

const RingChart = ({ percentage, color, label, value, total }) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="20"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={`${percentage * 2.51327} ${251.327 - percentage * 2.51327}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-gray-800">{Math.round(percentage)}%</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default RingChart;