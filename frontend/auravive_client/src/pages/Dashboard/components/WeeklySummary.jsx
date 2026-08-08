import React from 'react';
import { ChartBarIcon, CheckCircleIcon, SparklesIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const WeeklySummary = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-400 text-sm">No data available</p>
      </div>
    );
  }

  const items = [
    {
      label: 'Moods Tracked',
      value: data.totalMoods || 0,
      icon: ChartBarIcon,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      label: 'Average Mood',
      value: data.averageMood ? `${data.averageMood}/5` : '--',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Most Common Mood',
      value: data.mostCommonMood || '--',
      icon: SparklesIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklySummary;