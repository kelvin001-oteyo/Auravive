import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  BookOpenIcon, 
  PlusIcon, 
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  XMarkIcon,
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  SparklesIcon,
  CalendarIcon,
  ChartBarIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import journeyService from '../../services/journeyService';
import EntryCard from './components/EntryCard';
import EntryForm from './components/EntryForm';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';

const CATEGORIES = [
  { id: 'daily', label: 'Daily Journal', icon: '📝', color: 'from-blue-400 to-blue-500' },
  { id: 'pain', label: 'Pain Memories', icon: '💔', color: 'from-red-400 to-red-500' },
  { id: 'growth', label: 'Growth Memories', icon: '🌱', color: 'from-green-400 to-green-500' },
  { id: 'victory', label: 'Victory Memories', icon: '🏆', color: 'from-yellow-400 to-yellow-500' },
  { id: 'gratitude', label: 'Gratitude Memories', icon: '🙏', color: 'from-purple-400 to-purple-500' },
  { id: 'future', label: 'Future Letters', icon: '✉️', color: 'from-pink-400 to-pink-500' },
];

// Custom Target Icon since it doesn't exist in Heroicons
const TargetIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const Journey = () => {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState('entries');
  const [stats, setStats] = useState({
    totalEntries: 0,
    totalGoals: 0,
    completedGoals: 0,
    streak: 0,
  });

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [entriesRes, goalsRes, completedRes] = await Promise.all([
        journeyService.getEntries({ category: selectedCategory === 'all' ? undefined : selectedCategory }),
        journeyService.getGoals({ status: 'active' }),
        journeyService.getGoals({ status: 'completed' }),
      ]);
      
      const entriesData = entriesRes.results || entriesRes;
      const goalsData = goalsRes.results || goalsRes;
      const completedData = completedRes.results || completedRes;
      
      setEntries(entriesData);
      setGoals(goalsData);
      setCompletedGoals(completedData);
      
      // Calculate stats
      setStats({
        totalEntries: entriesData.length,
        totalGoals: goalsData.length + completedData.length,
        completedGoals: completedData.length,
        streak: calculateStreak(entriesData),
      });
    } catch (error) {
      toast.error('Failed to load journey data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (entries) => {
    if (!entries || entries.length === 0) return 0;
    const dates = entries.map(e => new Date(e.entry_date || e.created_at).toDateString());
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

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await journeyService.deleteEntry(id);
      setEntries(entries.filter(e => e.id !== id));
      toast.success('Entry deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      await journeyService.deleteGoal(id);
      setGoals(goals.filter(g => g.id !== id));
      toast.success('Goal deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  const handleMarkGoalComplete = async (id) => {
    try {
      await journeyService.markGoalComplete(id);
      const completed = goals.find(g => g.id === id);
      setGoals(goals.filter(g => g.id !== id));
      setCompletedGoals([{ ...completed, status: 'completed' }, ...completedGoals]);
      toast.success('Goal completed! 🎉');
      fetchData();
    } catch (error) {
      toast.error('Failed to mark goal as complete');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Journey & Experiences</h1>
            <p className="text-indigo-100">Personal journal & memories</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setView('entries')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                view === 'entries'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <BookOpenIcon className="w-4 h-4 inline mr-2" />
              Journal
            </button>
            <button
              onClick={() => setView('goals')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                view === 'goals'
                  ? 'bg-white text-indigo-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <CheckCircleIcon className="w-4 h-4 inline mr-2" />
              Goals
            </button>
            {view === 'entries' ? (
              <button
                onClick={() => {
                  setEditingEntry(null);
                  setShowEntryForm(true);
                }}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Entry
              </button>
            ) : (
              <button
                onClick={() => setShowGoalForm(true)}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Goal
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
          <div>
            <p className="text-indigo-100 text-sm">Total Entries</p>
            <p className="text-2xl font-bold">{stats.totalEntries}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Active Goals</p>
            <p className="text-2xl font-bold">{goals.length}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Completed Goals</p>
            <p className="text-2xl font-bold">{stats.completedGoals}</p>
          </div>
          <div>
            <p className="text-indigo-100 text-sm">Journal Streak</p>
            <p className="text-2xl font-bold">🔥 {stats.streak} days</p>
          </div>
        </div>
      </div>

      {/* Category Filter - Journal View */}
      {view === 'entries' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {view === 'entries' ? (
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpenIcon className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No entries yet</h3>
                <p className="text-gray-500">Start writing your first journal entry today</p>
                <button
                  onClick={() => {
                    setEditingEntry(null);
                    setShowEntryForm(true);
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  Write your first entry ✍️
                </button>
              </div>
            </div>
          ) : (
            entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                categories={CATEGORIES}
                onEdit={() => {
                  setEditingEntry(entry);
                  setShowEntryForm(true);
                }}
                onDelete={() => handleDeleteEntry(entry.id)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Goals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TargetIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Active Goals
              </h2>
              <span className="text-sm text-indigo-600">{goals.length} goals</span>
            </div>
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No active goals</p>
                <button
                  onClick={() => setShowGoalForm(true)}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Create your first goal →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onComplete={() => handleMarkGoalComplete(goal.id)}
                    onDelete={() => handleDeleteGoal(goal.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Completed Goals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                Completed Goals
              </h2>
              <span className="text-sm text-green-600">🎉 {completedGoals.length}</span>
            </div>
            {completedGoals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No completed goals yet</p>
                <p className="text-xs text-gray-400 mt-1">Keep going, you've got this! 💪</p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    completed
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Entry Form Modal */}
      {showEntryForm && (
        <EntryForm
          entry={editingEntry}
          categories={CATEGORIES}
          onClose={() => {
            setShowEntryForm(false);
            setEditingEntry(null);
          }}
          onSave={() => {
            setShowEntryForm(false);
            setEditingEntry(null);
            fetchData();
          }}
        />
      )}

      {/* Goal Form Modal */}
      {showGoalForm && (
        <GoalForm
          onClose={() => setShowGoalForm(false)}
          onSave={() => {
            setShowGoalForm(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default Journey;
