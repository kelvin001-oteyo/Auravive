import React, { useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const LiveChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah M.',
      message: "Welcome to the live chat! How is everyone doing today? 💬",
      time: 'Just now',
      isUser: false,
    },
    {
      id: 2,
      user: 'James K.',
      message: "Feeling much better after joining this community. Thanks everyone! 🙏",
      time: '2 min ago',
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: 'You',
        message: newMessage.trim(),
        time: 'Just now',
        isUser: true,
      },
    ]);
    setNewMessage('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        user: 'AI Moderator',
        message: "Thank you for sharing! 🌟 Your voice matters in this community.",
        time: 'Just now',
        isUser: false,
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ChatBubbleLeftIcon className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h4 className="font-semibold">Live Chat</h4>
              <p className="text-xs text-indigo-200">{isOnline ? '🟢 Online' : '⚪ Offline'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.isUser ? 'order-2' : ''}`}>
              {!msg.isUser && (
                <p className="text-xs font-medium text-gray-600 mb-1">{msg.user}</p>
              )}
              <div className={`rounded-2xl px-4 py-2 ${
                msg.isUser
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100'
              }`}>
                <p className="text-sm">{msg.message}</p>
              </div>
              <p className={`text-xs text-gray-400 mt-1 ${msg.isUser ? 'text-right' : ''}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          {messages.length} messages • {isOnline ? 'Live' : 'Offline'}
        </p>
      </form>
    </div>
  );
};

export default LiveChatWidget;
