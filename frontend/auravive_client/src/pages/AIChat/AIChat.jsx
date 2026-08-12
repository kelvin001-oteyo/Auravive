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
  StarIcon,
  HeartIcon,
  PhoneIcon,
  VideoCameraIcon,
  ShieldCheckIcon,
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
  const [isTyping, setIsTyping] = useState(false);
  const [bookingContext, setBookingContext] = useState(null);
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
          isWelcome: true,
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
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage(
        input.trim(),
        currentSession?.id
      );

      setIsTyping(false);

      const assistantMessage = {
        id: response.id || Date.now() + 1,
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions,
        needs_psychologist: response.needs_psychologist,
        booking_context: response.booking_context,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if psychologist recommendation is needed
      if (response.needs_psychologist) {
        setBookingContext(response.booking_context);
        setShowPsychologistSuggestion(true);
      }
    } catch (error) {
      setIsTyping(false);
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

  const handleQuickAction = (action) => {
    const quickMessages = {
      'How are you feeling?': "I'm feeling a bit anxious today. Can you help me?",
      'I need support': "I've been feeling overwhelmed lately and need someone to talk to.",
      'Track my mood': "I want to track how I'm feeling today.",
      'Find resources': "Can you recommend some resources for anxiety?",
      'Book counseling': "I think I need professional counseling. Can you help me book a session?",
    };
    
    const message = quickMessages[action] || action;
    setInput(message);
    inputRef.current?.focus();
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    return (
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl px-4 py-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">AI Companion</h2>
                <p className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                  Online • Emotional wellness assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <PhoneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <ArrowPathIcon className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                  <SparklesIcon className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How can I help you today?
                </h3>
                <p className="text-gray-500 max-w-md">
                  Share your thoughts, feelings, or any concerns. I'm here to listen and support you.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => handleQuickAction('How are you feeling?')}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    😊 How are you?
                  </button>
                  <button 
                    onClick={() => handleQuickAction('I need support')}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    🤗 I need support
                  </button>
                  <button 
                    onClick={() => handleQuickAction('Track my mood')}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    📊 Track my mood
                  </button>
                  <button 
                    onClick={() => handleQuickAction('Find resources')}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    📚 Find resources
                  </button>
                  <button 
                    onClick={() => handleQuickAction('Book counseling')}
                    className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full text-sm hover:border-indigo-400 hover:bg-indigo-100 transition-colors text-indigo-700"
                  >
                    🎯 Book counseling
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    user={user}
                    onBookPsychologist={handleBookPsychologist}
                  />
                ))}
                {renderTypingIndicator()}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Psychologist Suggestion Banner */}
          {showPsychologistSuggestion && (
            <div className="mx-4 mb-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-2 border-purple-200 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      Professional Support Available
                      <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Recommended</span>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on our conversation, you might benefit from speaking with a licensed psychologist.
                      They can provide professional guidance and support.
                    </p>
                    {bookingContext && (
                      <div className="mt-2 text-xs text-gray-500 bg-white/50 rounded p-2">
                        <p>💡 {bookingContext}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowPsychologistSuggestion(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={handleBookPsychologist}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center space-x-2 shadow-md"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book a Session Now</span>
                </button>
                <button
                  onClick={() => setShowPsychologistSuggestion(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
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
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {input.length > 0 && `${input.length} characters`}
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center">
              <span className="inline-flex items-center">
                <SparklesIcon className="w-3 h-3 mr-1 text-indigo-500" />
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
              // Add confirmation message to chat
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now() + 2,
                  role: 'assistant',
                  content: "✅ I've booked your session with a licensed psychologist. You'll receive a confirmation email with the details. \n\nRemember: Seeking professional help is a sign of strength. You're taking an important step in your wellness journey. 💪",
                  timestamp: new Date().toISOString(),
                }
              ]);
            } catch (error) {
              toast.error('Failed to book session');
            }
          }}
          context={bookingContext}
        />
      )}
    </div>
  );
};

export default AIChat;
