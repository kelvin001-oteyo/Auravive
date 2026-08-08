import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowPathIcon, PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import moodService from './services/moodService';
import MoodHistory from './components/MoodHistory';
import MoodStats from './MoodStats';

const MOOD_OPTIONS = [
  { value: 'amazing', label: 'Amazing 😊', emoji: '😊', color: 'bg-green-500' },
  { value: 'good', label: 'Good 🙂', emoji: '🙂', color: 'bg-blue-500' },
  { value: 'okay', label: 'Okay 😐', emoji: '😐', color: 'bg-yellow-500' },
  { value: 'bad', label: 'Bad 🙁', emoji: '🙁', color: 'bg-orange-500' },
  { value: 'awful', label: 'Awful 😢', emoji: '😢', color: 'bg-red-500' },
];

const MoodTracking = () => {
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchMoods();
    fetchStats();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await moodService.getMoods();
      setMoods(response.results || response);
    } catch (error) {
      toast.error('Failed to load moods');
    }
  };

  const fetchStats = async () => {
    try {
      const data = await moodService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await moodService.createMood(data);
      toast.success('Mood tracked successfully! 🎉');
      reset();
      setSelectedMood(null);
      setShowForm(false);
      fetchMoods();
      fetchStats();
    } catch (error) {
      toast.error('Failed to track mood');
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setValue('mood_type', mood.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mood Tracking</h1>
          <p className="text-gray-500">Track, analyze & understand your moods</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Track Mood</span>
        </button>
      </div>

      {/* Stats */}
      <MoodStats stats={stats} />

      {/* Mood Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling?</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your mood
              </label>
              <div className="grid grid-cols-5 gap-2">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedMood?.value === mood.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl">{mood.emoji}</div>
                    <span className="text-xs text-gray-600">{mood.label}</span>
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('mood_type')} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                {...register('note')}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="How are you feeling today? Any specific reasons?"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={!selectedMood}
              >
                Save Mood
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Calendar View */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar View</h2>
        <MoodHistory moods={moods} />
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Mood History</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
        </div>
        <MoodHistory moods={moods.slice(0, 10)} />
      </div>
    </div>
  );
};

export default MoodTracking;