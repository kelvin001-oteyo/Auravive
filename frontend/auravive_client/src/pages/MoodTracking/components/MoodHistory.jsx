import React from 'react';

const MOOD_EMOJIS = {
  amazing: '😊',
  good: '🙂',
  okay: '😐',
  bad: '🙁',
  awful: '😢',
};

const MOOD_COLORS = {
  amazing: 'bg-green-500',
  good: 'bg-blue-500',
  okay: 'bg-yellow-500',
  bad: 'bg-orange-500',
  awful: 'bg-red-500',
};

const MoodHistory = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No mood entries yet. Start tracking your mood today!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {moods.map((mood) => (
        <div key={mood.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{MOOD_EMOJIS[mood.mood_type]}</div>
            <div>
              <p className="font-medium text-gray-900 capitalize">{mood.mood_type}</p>
              {mood.note && <p className="text-sm text-gray-500">{mood.note}</p>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date(mood.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(`1970-01-01T${mood.time}`).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodHistory;