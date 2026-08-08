import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import mindfulnessService from '../../services/mindfulnessService';
import toast from 'react-hot-toast';
import {
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  CalendarIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  HeartIcon,
  MoonIcon,
  SunIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import ActivityCard from './components/ActivityCard';
import ActivityPlayer from './components/ActivityPlayer';
import TrainerBookingModal from './components/TrainerBookingModal';

const ACTIVITY_TYPES = [
  { id: 'breathing', label: 'Deep Breathing', icon: '🌬️', color: 'bg-blue-100 text-blue-700' },
  { id: 'meditation', label: 'Guided Meditation', icon: '🧘', color: 'bg-purple-100 text-purple-700' },
  { id: 'body_scan', label: 'Body Scan', icon: '🔍', color: 'bg-green-100 text-green-700' },
  { id: 'manifestation', label: 'Manifestation', icon: '✨', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'awareness', label: 'Mindfulness Awareness', icon: '👁️', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'affirmations', label: 'Daily Affirmations', icon: '💫', color: 'bg-pink-100 text-pink-700' },
];

const Mindfulness = () => {
  const { user, isPremium } = useAuth();
  const [activities, setActivities] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [showTrainerBooking, setShowTrainerBooking] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
  });

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [activitiesRes, sessionsRes] = await Promise.all([
        mindfulnessService.getActivities({
          activity_type: selectedType === 'all' ? undefined : selectedType,
        }),
        mindfulnessService.getSessions(),
      ]);

      setActivities(activitiesRes.results || activitiesRes);
      setSessions(sessionsRes.results || sessionsRes);
      calculateStats(sessionsRes.results || sessionsRes);
    } catch (error) {
      toast.error('Failed to load mindfulness activities');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sessionsData) => {
    const completed = sessionsData.filter(s => s.is_completed);
    const totalMinutes = completed.reduce((sum, s) => sum + s.duration_completed, 0);
    setStats({
      totalSessions: completed.length,
      totalMinutes: totalMinutes,
      streak: calculateStreak(sessionsData),
    });
  };

  const calculateStreak = (sessionsData) => {
    // Simple streak calculation
    if (!sessionsData || sessionsData.length === 0) return 0;
    const dates = sessionsData
      .filter(s => s.is_completed)
      .map(s => new Date(s.completed_at).toDateString());
    const uniqueDates = [...new Set(dates)].sort();
    let streak = 0;
    let currentDate = new Date();
    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const date = new Date(uniqueDates[i]);
      const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const handleStartActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCompleteSession = async (duration) => {
    try {
      await mindfulnessService.completeSession(selectedActivity.id, {
        duration_completed: duration,
        is_completed: true,
        completed_at: new Date().toISOString(),
      });
      toast.success('Great job! Session completed! 🎉');
      setSelectedActivity(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to complete session');
    }
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mindfulness</h1>
          <p className="text-gray-500">Activities to relax & build healthy habits</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTrainerBooking(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <UserIcon className="w-5 h-5" />
            <span>Book a Trainer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Minutes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMinutes}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.streak} days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FireIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Type Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedType === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Activities
        </button>
        {ACTIVITY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities available</h3>
            <p className="text-gray-500">Check back later for new mindfulness activities</p>
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isPremium={isPremium}
              onStart={() => handleStartActivity(activity)}
            />
          ))
        )}
      </div>

      {/* Activity Player Modal */}
      {selectedActivity && (
        <ActivityPlayer
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onComplete={handleCompleteSession}
        />
      )}

      {/* Trainer Booking Modal */}
      {showTrainerBooking && (
        <TrainerBookingModal
          onClose={() => setShowTrainerBooking(false)}
          onBook={async (data) => {
            try {
              await mindfulnessService.bookTrainer(data);
              toast.success('Trainer session booked successfully! 🎉');
              setShowTrainerBooking(false);
            } catch (error) {
              toast.error('Failed to book trainer session');
            }
          }}
        />
      )}
    </div>
  );
};

export default Mindfulness;