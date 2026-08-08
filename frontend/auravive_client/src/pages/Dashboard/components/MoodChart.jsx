import React from 'react';

const MoodChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No mood data available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.slice(0, 7).map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm">
            {item.mood_type?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${Math.min((item.count || 1) * 10, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600 capitalize">{item.mood_type}</span>
        </div>
      ))}
    </div>
  );
};

export default MoodChart;
