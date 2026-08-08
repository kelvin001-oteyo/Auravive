import React from 'react';
import { CheckCircleIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const GoalCard = ({ goal, onComplete, onDelete, completed = false }) => {
  const progress = goal.progress_percentage || 0;
  const isComplete = goal.status === 'completed' || completed;

  return (
    <div className={`p-4 rounded-lg border ${isComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className={`font-medium ${isComplete ? 'text-gray-700 line-through' : 'text-gray-900'}`}>
              {goal.title}
            </h4>
            {isComplete && (
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
            )}
          </div>
          {goal.description && (
            <p className="text-sm text-gray-500">{goal.description}</p>
          )}
          {goal.target_date && !isComplete && (
            <p className="text-xs text-gray-400 mt-1">
              Target: {new Date(goal.target_date).toLocaleDateString()}
            </p>
          )}
          {isComplete && goal.completed_date && (
            <p className="text-xs text-green-600 mt-1">
              Completed: {new Date(goal.completed_date).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {!isComplete && (
            <>
              <button
                onClick={onComplete}
                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                title="Mark as complete"
              >
                <CheckCircleIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete goal"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      {!isComplete && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;