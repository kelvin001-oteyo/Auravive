import React, { useState, useEffect } from 'react';
import { XMarkIcon, CalendarIcon, ClockIcon, UserIcon, StarIcon } from '@heroicons/react/24/outline';
import aiService from '../../../services/aiService';
import toast from 'react-hot-toast';

const BookingModal = ({ onClose, onBook }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || !date || !time) {
      toast.error('Please select a psychologist, date, and time');
      return;
    }

    const bookingData = {
      psychologist_id: selected.id,
      scheduled_date: `${date}T${time}:00`,
      duration_minutes: 60,
      booking_type: 'psychologist',
      notes: '',
    };

    onBook(bookingData);
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Book a Psychologist Session</h2>
            <p className="text-sm text-gray-500">Connect with a licensed professional</p>
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
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Psychologist Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Psychologist
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {psychologists.map((psych) => (
                    <button
                      key={psych.id}
                      type="button"
                      onClick={() => setSelected(psych)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selected?.id === psych.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">{psych.name}</p>
                          <p className="text-sm text-gray-500">{psych.specialty}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">
                              {psych.rating || 'New'}
                            </span>
                            <span className="text-sm text-gray-400">
                              ({psych.reviews_count || 0} reviews)
                            </span>
                          </div>
                        </div>
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

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Details
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">60 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900">Virtual (Video/Audio)</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium text-gray-900">
                      ${selected?.consultation_fee || '0.00'}
                    </span>
                  </div>
                  {selected?.is_available === false && (
                    <p className="text-red-600 text-sm mt-2">This psychologist is not available</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Book Session
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;