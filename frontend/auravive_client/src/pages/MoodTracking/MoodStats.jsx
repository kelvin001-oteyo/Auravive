import React from 'react';
import { ChartBarIcon, CalendarIcon, FaceSmileIcon } from '@heroicons/react/24/solid';

const MoodStats = ({ stats }) => {
  if (!stats) return null;

  const statsCards = [
    {
      label: 'Total Moods Tracked',
      value: stats.total || 0,
      icon: ChartBarIcon,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
    },
    {
      label: 'Average Mood',
      value: stats.avg_mood ? `${stats.avg_mood.toFixed(1)}/5` : '--',
      icon: FaceSmileIcon,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Current Streak',
      value: stats.streak || 0,
      icon: CalendarIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodStats;