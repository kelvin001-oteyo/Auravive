import React from 'react';

const GoalCard = ({ goal }) => {
  const progress = goal.progress_percentage || 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900">{goal.title}</h3>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {goal.target_date && (
        <p className="text-xs text-gray-400 mt-1">
          Target: {new Date(goal.target_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default GoalCard;