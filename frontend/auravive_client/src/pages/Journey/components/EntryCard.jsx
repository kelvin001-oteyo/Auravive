import React from 'react';
import { PencilIcon, TrashIcon, PhotoIcon, VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

const EntryCard = ({ entry, onEdit, onDelete }) => {
  const categoryIcons = {
    daily: '📝',
    pain: '💔',
    growth: '🌱',
    victory: '🏆',
    gratitude: '🙏',
    future: '✉️',
  };

  const categoryLabels = {
    daily: 'Daily Journal',
    pain: 'Pain Memory',
    growth: 'Growth Memory',
    victory: 'Victory Memory',
    gratitude: 'Gratitude Memory',
    future: 'Future Letter',
  };

  const categoryColors = {
    daily: 'bg-blue-100 text-blue-700',
    pain: 'bg-red-100 text-red-700',
    growth: 'bg-green-100 text-green-700',
    victory: 'bg-yellow-100 text-yellow-700',
    gratitude: 'bg-purple-100 text-purple-700',
    future: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[entry.category] || 'bg-gray-100 text-gray-700'}`}>
              <span className="mr-1">{categoryIcons[entry.category]}</span>
              {categoryLabels[entry.category] || entry.category_name}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(entry.entry_date || entry.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{entry.title}</h3>
          <p className="text-gray-600 whitespace-pre-wrap line-clamp-3">{entry.content}</p>
          
          {/* Media Attachments */}
          {(entry.image || entry.video || entry.audio) && (
            <div className="flex items-center space-x-3 mt-3">
              {entry.image && (
                <span className="flex items-center text-xs text-gray-500">
                  <PhotoIcon className="w-4 h-4 mr-1" />
                  Photo
                </span>
              )}
              {entry.video && (
                <span className="flex items-center text-xs text-gray-500">
                  <VideoCameraIcon className="w-4 h-4 mr-1" />
                  Video
                </span>
              )}
              {entry.audio && (
                <span className="flex items-center text-xs text-gray-500">
                  <MicrophoneIcon className="w-4 h-4 mr-1" />
                  Audio
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;