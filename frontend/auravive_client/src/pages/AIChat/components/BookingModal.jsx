import React, { useState, useEffect } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon, UserIcon, StarIcon, PhoneIcon, VideoCameraIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import aiService from '../../../services/aiService';
import toast from 'react-hot-toast';

const BookingModal = ({ onClose, onBook, context }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('select'); // 'select' | 'details' | 'confirm'

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const fetchPsychologists = async () => {
    try {
      const data = await aiService.getPsychologists();
      setPsychologists(data.results || data);
      if (data.results && data.results.length > 0) {
        setSelected(data.results[0]);
      }
    } catch (error) {
      toast.error('Failed to load psychologists');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selected) {
      toast.error('Please select a psychologist');
      return;
    }
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    if (!time) {
      toast.error('Please select a time');
      return;
    }
    setStep('confirm');
  };

  const handleBack = () => {
    setStep('select');
  };

  const handleSubmit = () => {
    const bookingData = {
      psychologist_id: selected.id,
      scheduled_date: `${date}T${time}:00`,
      duration_minutes: 60,
      session_type: sessionType,
      booking_type: 'psychologist',
      notes: context || '',
    };

    onBook(bookingData);
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const renderSelectStep = () => (
    <div className="space-y-6">
      {/* Context Banner */}
      {context && (
        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
          <p className="text-sm text-indigo-800">
            <span className="font-medium">💡 Based on your conversation:</span> {context}
          </p>
        </div>
      )}

      {/* Session Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSessionType('video')}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              sessionType === 'video'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <VideoCameraIcon className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
            <p className="text-sm font-medium">Video Call</p>
            <p className="text-xs text-gray-500">Face to face</p>
          </button>
          <button
            type="button"
            onClick={() => setSessionType('audio')}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              sessionType === 'audio'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <PhoneIcon className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
            <p className="text-sm font-medium">Phone Call</p>
            <p className="text-xs text-gray-500">Audio only</p>
          </button>
        </div>
      </div>

      {/* Psychologist Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Psychologist
        </label>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {psychologists.map((psych) => (
            <button
              key={psych.id}
              type="button"
              onClick={() => setSelected(psych)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selected?.id === psych.id
                  ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{psych.name}</p>
                  <p className="text-sm text-gray-500">{psych.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {psych.rating || 'New'}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({psych.reviews_count || 0} reviews)
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {psych.experience_years}+ years
                    </span>
                  </div>
                </div>
                {selected?.id === psych.id && (
                  <CheckCircleIcon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getToday()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ClockIcon className="w-4 h-4 inline mr-1" />
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Quick Date Selection */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Quick pick:</p>
        <div className="flex gap-2 flex-wrap">
          {getAvailableDates().slice(0, 3).map((d) => (
            <button
              key={d.toISOString()}
              onClick={() => setDate(d.toISOString().split('T')[0])}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                date === d.toISOString().split('T')[0]
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
        <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900">Ready to Book!</h3>
        <p className="text-sm text-gray-600">Please confirm your session details below</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Psychologist</span>
          <span className="font-medium text-gray-900">{selected?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Specialty</span>
          <span className="font-medium text-gray-900">{selected?.specialty}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="font-medium text-gray-900">
            {new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Time</span>
          <span className="font-medium text-gray-900">
            {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Session Type</span>
          <span className="font-medium text-gray-900 capitalize">{sessionType} Call</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium text-gray-900">60 minutes</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="text-gray-500">Price</span>
          <span className="font-bold text-indigo-600">${selected?.consultation_fee || '0.00'}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-sm text-blue-800 flex items-start">
          <ShieldCheckIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Your session is confidential and secure. All psychologists are licensed professionals.</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 'select' ? 'Book a Psychologist Session' : 'Confirm Booking'}
            </h2>
            <p className="text-sm text-gray-500">
              {step === 'select' ? 'Connect with a licensed professional' : 'Review your session details'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'select' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-0.5 ${step === 'confirm' ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'confirm' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              {step === 'select' ? renderSelectStep() : renderConfirmStep()}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                {step === 'confirm' && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={step === 'select' ? handleNext : handleSubmit}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    step === 'select'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {step === 'select' ? 'Continue' : 'Confirm Booking'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Add CheckCircleIcon if not imported
const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default BookingModal;
