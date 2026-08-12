import React from 'react';
import { ChatBubbleLeftIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

const SessionList = ({ sessions, currentSession, onSelect, onDelete }) => {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <ChatBubbleLeftIcon className="w-8 h-8 text-indigo-400" />
        </div>
        <p className="text-sm font-medium text-gray-900">No chats yet</p>
        <p className="text-xs text-gray-400 mt-1">Start a new conversation</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
            currentSession?.id === session.id
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-sm'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(session)}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              currentSession?.id === session.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                : 'bg-gray-200'
            }`}>
              <ChatBubbleLeftIcon className={`w-4 h-4 ${
                currentSession?.id === session.id ? 'text-white' : 'text-gray-500'
              }`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-gray-900">
                {session.title || `Chat ${new Date(session.created_at).toLocaleDateString()}`}
              </p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Delete this chat?')) {
                onDelete(session.id);
              }
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
          >
            <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
