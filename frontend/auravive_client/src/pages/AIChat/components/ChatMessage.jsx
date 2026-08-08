import React from 'react';
import { SparklesIcon, UserCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const ChatMessage = ({ message, user, onBookPsychologist }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-6 h-6 text-indigo-600" />
            )}
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-purple-600" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>

        {/* Suggestions */}
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full hover:bg-indigo-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }) : ''}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;