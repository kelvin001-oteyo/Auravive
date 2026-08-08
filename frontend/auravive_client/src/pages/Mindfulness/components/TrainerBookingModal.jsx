import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserIcon, StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import mindfulnessService from '../../../services/mindfulnessService';
import toast from 'react-hot-toast';

const TrainerBookingModal = ({ onClose, onBook }) => {
  const [trainers, setTrainers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionType, setSessionType] = useState('one-on-one');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const data = await mindfulnessService.getTrainers();
      setTrainers(data.results || data);
      if (data.results && data.results.length > 0) {
        setSelected(data.results[0]);
      }
    } catch (error) {
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || !date || !time) {
      toast.error('Please select a trainer, date, and time');
      return;
    }

    const bookingData = {
      trainer_id: selected.id,
      scheduled_date: `${date}T${time}:00`,
      duration_minutes: sessionType === 'one-on-one' ? 60 : 45,
      session_type: sessionType,
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
            <h2 className="text-xl font-semibold text-gray-900">Book a Trainer Session</h2>
            <p className="text-sm text-gray-500">Live one-on-one or group training sessions</p>
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
              {/* Trainer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Trainer
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {trainers.map((trainer) => (
                    <button
                      key={trainer.id}
                      type="button"
                      onClick={() => setSelected(trainer)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selected?.id === trainer.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{trainer.name}</p>
                          <p className="text-sm text-gray-500">{trainer.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">
                              {trainer.rating || 'New'}
                            </span>
                            <span className="text-sm text-gray-400">
                              ({trainer.reviews_count || 0} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessionType('one-on-one')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      sessionType === 'one-on-one'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <UserIcon className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                    <p className="text-sm font-medium">One-on-One</p>
                    <p className="text-xs text-gray-500">60 min session</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSessionType('group')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      sessionType === 'group'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <UsersIcon className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                    <p className="text-sm font-medium">Group Session</p>
                    <p className="text-xs text-gray-500">45 min session</p>
                  </button>
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
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Session Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900">
                      {sessionType === 'one-on-one' ? 'One-on-One' : 'Group Session'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">
                      {sessionType === 'one-on-one' ? '60 minutes' : '45 minutes'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Format</span>
                    <span className="font-medium text-gray-900">Live Virtual (Video/Audio)</span>
                  </div>
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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

// Add UsersIcon if not imported
const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default TrainerBookingModal;