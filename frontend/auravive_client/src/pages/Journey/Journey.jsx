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
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import journeyService from '../../services/journeyService';
import EntryCard from './components/EntryCard';
import EntryForm from './components/EntryForm';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';

const CATEGORIES = [
  { id: 'daily', label: 'Daily Journal', icon: '📝' },
  { id: 'pain', label: 'Pain Memories', icon: '💔' },
  { id: 'growth', label: 'Growth Memories', icon: '🌱' },
  { id: 'victory', label: 'Victory Memories', icon: '🏆' },
  { id: 'gratitude', label: 'Gratitude Memories', icon: '🙏' },
  { id: 'future', label: 'Future Letters', icon: '✉️' },
];

const Journey = () => {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState('entries'); // 'entries' | 'goals'

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
      setEntries(entriesRes.results || entriesRes);
      setGoals(goalsRes.results || goalsRes);
      setCompletedGoals(completedRes.results || completedRes);
    } catch (error) {
      toast.error('Failed to load journey data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await journeyService.deleteEntry(id);
      setEntries(entries.filter(e => e.id !== id));
      toast.success('Entry deleted');
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
    } catch (error) {
      toast.error('Failed to mark goal as complete');
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
          <h1 className="text-2xl font-bold text-gray-900">My Journey & Experiences</h1>
          <p className="text-gray-500">Personal journal & memories</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setView('entries')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'entries'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BookOpenIcon className="w-4 h-4 inline mr-2" />
            Journal
          </button>
          <button
            onClick={() => setView('goals')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'goals'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          ) : (
            <button
              onClick={() => setShowGoalForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Goal</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter (Journal View) */}
      {view === 'entries' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
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
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
              <p className="text-gray-500">Start writing your first journal entry today</p>
              <button
                onClick={() => {
                  setEditingEntry(null);
                  setShowEntryForm(true);
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Write your first entry
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Goals</h2>
            {goals.length === 0 ? (
              <p className="text-gray-500 text-sm">No active goals</p>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Goals</h2>
            {completedGoals.length === 0 ? (
              <p className="text-gray-500 text-sm">No completed goals yet</p>
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
          onClose={() => {
            setShowEntryForm(false);
            setEditingEntry(null);
          }}
          onSave={() => {
            setShowEntryForm(false);
            setEditingEntry(null);
            fetchData();
          }}
          categories={CATEGORIES}
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