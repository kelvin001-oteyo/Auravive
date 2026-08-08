import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftIcon, 
  ChartBarIcon, 
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
  AcademicCapIcon,
  LifebuoyIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
import dashboardService from '../../../services/dashboard';
import toast from 'react-hot-toast';
import MoodChart from './MoodChart';
import GoalCard from './GoalCard';
import JournalCard from './JournalCard';
import QuickShortcuts from './QuickShortcuts';
import CommunityActivity from './CommunityActivity';
import WeeklySummary from './WeeklySummary';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    moodStats: null,
    recentJournals: [],
    goals: [],
    completedGoals: [],
    mindfulnessSessions: [],
    communityActivity: [],
    reminders: [],
    weeklySummary: null,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [moodStats, recentJournals, goals, completedGoals, mindfulnessSessions, communityActivity] = 
        await Promise.all([
          dashboardService.getMoodStats(),
          dashboardService.getRecentJournals(),
          dashboardService.getGoals(),
          dashboardService.getCompletedGoals(),
          dashboardService.getMindfulnessSessions(),
          dashboardService.getCommunityActivity(),
        ]);

      setDashboardData({
        moodStats,
        recentJournals: recentJournals.results || recentJournals,
        goals: goals.results || goals,
        completedGoals: completedGoals.results || completedGoals,
        mindfulnessSessions: mindfulnessSessions.results || mindfulnessSessions,
        communityActivity: communityActivity.results || communityActivity,
        weeklySummary: generateWeeklySummary(moodStats),
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const generateWeeklySummary = (moodStats) => {
    if (!moodStats) return null;
    return {
      totalMoods: moodStats.total || 0,
      averageMood: moodStats.avg_mood || 0,
      mostCommonMood: moodStats.most_common || 'Good',
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.full_name || user?.username || 'User'}! 👋
            </h1>
            <p className="text-indigo-100 mt-1">
              How are you feeling today? Let's continue your wellness journey.
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              to="/mood-tracking"
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Track Your Mood
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mood Streak</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.moodStats?.streak || 0}</p>
              <p className="text-xs text-green-600">days</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Goals</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.goals.length}</p>
              <p className="text-xs text-indigo-600">Active</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Meditation</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.mindfulnessSessions?.length || 0}
              </p>
              <p className="text-xs text-purple-600">Sessions</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Journal</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.recentJournals?.length || 0}
              </p>
              <p className="text-xs text-orange-600">Recent entries</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Goals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Mood Overview</h2>
              <Link to="/mood-tracking" className="text-sm text-indigo-600 hover:text-indigo-700">
                View all →
              </Link>
            </div>
            <MoodChart data={dashboardData.moodStats?.recent || []} />
          </div>

          {/* Goals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
              <Link to="/journey" className="text-sm text-indigo-600 hover:text-indigo-700">
                Manage goals →
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.goals.length > 0 ? (
                dashboardData.goals.slice(0, 3).map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No active goals. Set your first goal!</p>
              )}
            </div>
          </div>

          {/* Recent Journal Entries */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Journal</h2>
              <Link to="/journey" className="text-sm text-indigo-600 hover:text-indigo-700">
                Write new →
              </Link>
            </div>
            <div className="space-y-3">
              {dashboardData.recentJournals.length > 0 ? (
                dashboardData.recentJournals.slice(0, 3).map((entry) => (
                  <JournalCard key={entry.id} entry={entry} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No journal entries yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Community & Quick Access */}
        <div className="space-y-6">
          {/* Quick Shortcuts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Shortcuts</h2>
            <QuickShortcuts />
          </div>

          {/* Weekly Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h2>
            <WeeklySummary data={dashboardData.weeklySummary} />
          </div>

          {/* Community Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Community Activity</h2>
              <Link to="/community" className="text-sm text-indigo-600 hover:text-indigo-700">
                Join →
              </Link>
            </div>
            <CommunityActivity posts={dashboardData.communityActivity.slice(0, 2)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;