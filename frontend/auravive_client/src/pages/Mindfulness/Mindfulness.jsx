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
  TrophyIcon,
  MeditationIcon,
  BrainIcon,
} from '@heroicons/react/24/outline';
import ActivityCard from './components/ActivityCard';
import ActivityPlayer from './components/ActivityPlayer';
import TrainerBookingModal from './components/TrainerBookingModal';

const ACTIVITY_TYPES = [
  { id: 'breathing', label: 'Deep Breathing', icon: '🌬️', color: 'from-blue-400 to-blue-500', description: 'Calm your mind with deep breathing' },
  { id: 'meditation', label: 'Guided Meditation', icon: '🧘', color: 'from-purple-400 to-purple-500', description: 'Find peace through guided sessions' },
  { id: 'body_scan', label: 'Body Scan', icon: '🔍', color: 'from-green-400 to-green-500', description: 'Connect with your body' },
  { id: 'manifestation', label: 'Manifestation', icon: '✨', color: 'from-yellow-400 to-yellow-500', description: 'Visualize your best self' },
  { id: 'awareness', label: 'Mindfulness Awareness', icon: '👁️', color: 'from-indigo-400 to-indigo-500', description: 'Cultivate present moment awareness' },
  { id: 'affirmations', label: 'Daily Affirmations', icon: '💫', color: 'from-pink-400 to-pink-500', description: 'Empower yourself with positive words' },
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
    favoriteActivity: '--',
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

      const activitiesData = activitiesRes.results || activitiesRes;
      const sessionsData = sessionsRes.results || sessionsRes;
      
      setActivities(activitiesData);
      setSessions(sessionsData);
      calculateStats(sessionsData, activitiesData);
    } catch (error) {
      toast.error('Failed to load mindfulness activities');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sessionsData, activitiesData) => {
    const completed = sessionsData.filter(s => s.is_completed);
    const totalMinutes = completed.reduce((sum, s) => sum + s.duration_completed, 0);
    
    // Find favorite activity
    const activityCounts = {};
    completed.forEach(s => {
      const activity = activitiesData.find(a => a.id === s.activity);
      if (activity) {
        activityCounts[activity.name] = (activityCounts[activity.name] || 0) + 1;
      }
    });
    let favorite = '--';
    let maxCount = 0;
    Object.entries(activityCounts).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favorite = name;
      }
    });

    setStats({
      totalSessions: completed.length,
      totalMinutes: totalMinutes,
      streak: calculateStreak(sessionsData),
      favoriteActivity: favorite,
    });
  };

  const calculateStreak = (sessionsData) => {
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
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading mindfulness activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Mindfulness</h1>
            <p className="text-green-100">Activities to relax & build healthy habits</p>
          </div>
          <button
            onClick={() => setShowTrainerBooking(true)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2 text-sm border border-white/20"
          >
            <UserIcon className="w-4 h-4" />
            <span>Book a Trainer</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
          <div>
            <p className="text-green-100 text-sm">Total Sessions</p>
            <p className="text-2xl font-bold">{stats.totalSessions}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Minutes Practiced</p>
            <p className="text-2xl font-bold">{stats.totalMinutes}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Current Streak</p>
            <p className="text-2xl font-bold">🔥 {stats.streak} days</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Favorite Activity</p>
            <p className="text-2xl font-bold truncate">{stats.favoriteActivity}</p>
          </div>
        </div>
      </div>

      {/* Activity Type Filters */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            selectedType === 'all'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✨ All Activities
        </button>
        {ACTIVITY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedType === type.id
                ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      {activities.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities available</h3>
            <p className="text-gray-500">Check back later for new mindfulness activities</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const typeInfo = ACTIVITY_TYPES.find(t => t.id === activity.activity_type);
            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                typeInfo={typeInfo}
                isPremium={isPremium}
                onStart={() => handleStartActivity(activity)}
              />
            );
          })}
        </div>
      )}

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
