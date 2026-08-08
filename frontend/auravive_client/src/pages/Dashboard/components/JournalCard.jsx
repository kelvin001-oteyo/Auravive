import React from 'react';

const JournalCard = ({ entry }) => {
  const categoryLabels = {
    daily: 'Daily',
    pain: 'Pain Memory',
    growth: 'Growth Memory',
    victory: 'Victory',
    gratitude: 'Gratitude',
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

  const categoryName = entry.category_name || categoryLabels[entry.category] || 'Journal';

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[entry.category] || 'bg-gray-100 text-gray-700'}`}>
              {categoryName}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(entry.entry_date).toLocaleDateString()}
            </span>
          </div>
          <h4 className="font-medium text-gray-900">{entry.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
        </div>
        {entry.image && (
          <img
            src={entry.image}
            alt="Journal"
            className="w-12 h-12 rounded-lg object-cover ml-3"
          />
        )}
      </div>
    </div>
  );
};

export default JournalCard;