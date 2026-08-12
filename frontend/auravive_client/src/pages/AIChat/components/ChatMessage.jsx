import React from 'react';
import { SparklesIcon, UserCircleIcon, ChatBubbleLeftIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

const ChatMessage = ({ message, user, onBookPsychologist }) => {
  const isUser = message.role === 'user';
  const isWelcome = message.isWelcome;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return '';
    }
  };

  // Check if message contains booking-related keywords
  const hasBookingIntent = !isUser && (
    message.content?.toLowerCase().includes('book') ||
    message.content?.toLowerCase().includes('session') ||
    message.content?.toLowerCase().includes('counsel') ||
    message.content?.toLowerCase().includes('therapist') ||
    message.content?.toLowerCase().includes('psychologist')
  );

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
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        {/* Sender Name */}
        {!isUser && (
          <p className="text-xs font-medium text-gray-500 mb-1 ml-1">
            AI Companion
          </p>
        )}
        
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
            : isWelcome
            ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-gray-900 border border-purple-200'
            : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>

        {/* Booking CTA for relevant messages */}
        {!isUser && hasBookingIntent && (
          <div className="mt-2">
            <button
              onClick={onBookPsychologist}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book a Session</span>
            </button>
          </div>
        )}

        {/* Suggestions */}
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs rounded-full hover:border-indigo-300 hover:bg-indigo-50 transition-colors shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
