import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import aiService from '../../services/aiService';
import toast from 'react-hot-toast';
import { 
  PaperAirplaneIcon, 
  SparklesIcon, 
  UserCircleIcon,
  ArrowPathIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import ChatMessage from './components/ChatMessage';
import SessionList from './components/SessionList';
import BookingModal from './components/BookingModal';

const AIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPsychologistSuggestion, setShowPsychologistSuggestion] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (currentSession) {
      fetchMessages(currentSession.id);
    }
  }, [currentSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const data = await aiService.getSessions();
      setSessions(data.results || data);
      if (data.results && data.results.length > 0) {
        setCurrentSession(data.results[0]);
      } else {
        createNewSession();
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const fetchMessages = async (sessionId) => {
    setLoading(true);
    try {
      const data = await aiService.getSessionMessages(sessionId);
      setMessages(data.results || data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewSession = async () => {
    try {
      const data = await aiService.createSession();
      setSessions([data, ...sessions]);
      setCurrentSession(data);
      setMessages([]);
      // Add welcome message
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hello! I'm your Auravive AI Companion. 🌟\n\nI'm here to listen, support, and help you on your wellness journey. Feel free to share whatever's on your mind. How are you feeling today?",
          timestamp: new Date().toISOString(),
        }
      ]);
    } catch (error) {
      toast.error('Failed to create new session');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const response = await aiService.sendMessage(
        input.trim(),
        currentSession?.id
      );

      const assistantMessage = {
        id: response.id || Date.now() + 1,
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions,
        needs_psychologist: response.needs_psychologist,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if psychologist recommendation is needed
      if (response.needs_psychologist) {
        setShowPsychologistSuggestion(true);
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      // Remove the user message if failed
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookPsychologist = () => {
    setShowBookingModal(true);
    setShowPsychologistSuggestion(false);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex overflow-hidden">
        {/* Session Sidebar */}
        <div className="w-72 border-r border-gray-200 flex flex-col bg-gray-50">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={createNewSession}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircleIcon className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SessionList
              sessions={sessions}
              currentSession={currentSession}
              onSelect={setCurrentSession}
              onDelete={async (id) => {
                try {
                  await aiService.deleteSession(id);
                  setSessions(sessions.filter(s => s.id !== id));
                  if (currentSession?.id === id) {
                    const remaining = sessions.filter(s => s.id !== id);
                    setCurrentSession(remaining[0] || null);
                    if (!remaining[0]) createNewSession();
                  }
                  toast.success('Chat deleted');
                } catch (error) {
                  toast.error('Failed to delete chat');
                }
              }}
            />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white rounded-tr-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">AI Companion</h2>
                <p className="text-xs text-gray-500">Emotional wellness assistant</p>
              </div>
            </div>
            {currentSession && (
              <span className="text-xs text-gray-400">
                {new Date(currentSession.created_at).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <ArrowPathIcon className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <SparklesIcon className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How can I help you today?
                </h3>
                <p className="text-gray-500 max-w-md">
                  Share your thoughts, feelings, or any concerns. I'm here to listen and support you.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  user={user}
                  onBookPsychologist={handleBookPsychologist}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Psychologist Suggestion Banner */}
          {showPsychologistSuggestion && (
            <div className="mx-4 mb-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Professional Support Available</h4>
                    <p className="text-sm text-gray-600">
                      Based on our conversation, you might benefit from speaking with a licensed psychologist.
                      Would you like to book a virtual session?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPsychologistSuggestion(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={handleBookPsychologist}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                >
                  Book a Session
                </button>
                <button
                  onClick={() => setShowPsychologistSuggestion(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  style={{ minHeight: '52px', maxHeight: '150px' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              <span className="inline-flex items-center">
                <SparklesIcon className="w-3 h-3 mr-1" />
                AI Companion is here to support you with empathy and understanding
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onBook={async (data) => {
            try {
              await aiService.bookPsychologist(data);
              toast.success('Session booked successfully! 🎉');
              setShowBookingModal(false);
            } catch (error) {
              toast.error('Failed to book session');
            }
          }}
        />
      )}
    </div>
  );
};

export default AIChat;