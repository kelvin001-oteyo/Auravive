import React from 'react';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

const SessionList = ({ sessions, currentSession, onSelect, onDelete }) => {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No chats yet</p>
        <p className="text-xs">Start a new conversation</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
            currentSession?.id === session.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(session)}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <ChatBubbleLeftIcon className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {session.title || `Chat ${new Date(session.created_at).toLocaleDateString()}`}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(session.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
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