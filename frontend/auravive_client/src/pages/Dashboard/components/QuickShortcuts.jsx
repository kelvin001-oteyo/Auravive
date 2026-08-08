import React from 'react';
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
} from '@heroicons/react/24/outline';

const shortcuts = [
  { name: 'AI Companion', path: '/ai-companion', icon: ChatBubbleLeftIcon, color: 'bg-blue-100 text-blue-600' },
  { name: 'Mood Tracking', path: '/mood-tracking', icon: ChartBarIcon, color: 'bg-green-100 text-green-600' },
  { name: 'Mindfulness', path: '/mindfulness', icon: SparklesIcon, color: 'bg-purple-100 text-purple-600' },
  { name: 'My Journey', path: '/journey', icon: BookOpenIcon, color: 'bg-orange-100 text-orange-600' },
  { name: 'Community', path: '/community', icon: UsersIcon, color: 'bg-pink-100 text-pink-600' },
  { name: 'Resources', path: '/resources', icon: HeartIcon, color: 'bg-red-100 text-red-600' },
  { name: 'Courses', path: '/courses', icon: AcademicCapIcon, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Get Help', path: '/get-help', icon: LifebuoyIcon, color: 'bg-indigo-100 text-indigo-600' },
];

const QuickShortcuts = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {shortcuts.map((shortcut) => (
        <Link
          key={shortcut.name}
          to={shortcut.path}
          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className={`w-12 h-12 rounded-full ${shortcut.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
            <shortcut.icon className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-600 text-center leading-tight">{shortcut.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickShortcuts;