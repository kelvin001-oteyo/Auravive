import React from 'react';
import { PlayIcon, ClockIcon, StarIcon } from '@heroicons/react/24/solid';

const ACTIVITY_ICONS = {
  breathing: '🌬️',
  meditation: '🧘',
  body_scan: '🔍',
  manifestation: '✨',
  awareness: '👁️',
  affirmations: '💫',
};

const ActivityCard = ({ activity, isPremium, onStart }) => {
  const isLocked = activity.is_premium && !isPremium;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
      isLocked ? 'opacity-75' : ''
    }`}>
      <div className="relative">
        {activity.thumbnail ? (
          <img
            src={activity.thumbnail}
            alt={activity.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-6xl">{ACTIVITY_ICONS[activity.activity_type] || '🧘'}</span>
          </div>
        )}
        {isLocked && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Premium
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <ClockIcon className="w-3 h-3 mr-1" />
          {activity.duration} min
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{activity.name}</h3>
            <p className="text-sm text-gray-500">
              {activity.activity_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
          {activity.is_premium && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{activity.description}</p>

        <button
          onClick={onStart}
          disabled={isLocked}
          className={`w-full py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
            isLocked
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <PlayIcon className="w-4 h-4" />
          <span>{isLocked ? 'Upgrade to Access' : 'Start'}</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;