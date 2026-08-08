import React, { useState } from 'react';
import { UsersIcon, UserPlusIcon, UserMinusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CIRCLE_CATEGORIES = [
  { id: 'anxiety', label: 'Anxiety Support', icon: '😰' },
  { id: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
  { id: 'healing', label: 'Healing Journey', icon: '💝' },
  { id: 'heartbreak', label: 'Heartbreak Recovery', icon: '💔' },
  { id: 'marriage', label: 'Marriage Support', icon: '💑' },
  { id: 'relationship', label: 'Relationship Advice', icon: '❤️' },
  { id: 'career', label: 'Career Stress', icon: '💼' },
  { id: 'grief', label: 'Grief & Loss', icon: '🕊️' },
  { id: 'self_esteem', label: 'Self-Esteem', icon: '🌟' },
  { id: 'parenting', label: 'Parenting Support', icon: '👨‍👩‍👦' },
  { id: 'friendship', label: 'Friendship & Social Life', icon: '🤝' },
  { id: 'visual_disability', label: 'Visual Disability', icon: '👁️' },
  { id: 'hearing_disability', label: 'Hearing Disability', icon: '👂' },
  { id: 'speech_disability', label: 'Speech & Communication', icon: '🗣️' },
  { id: 'physical_disability', label: 'Physical Disability', icon: '♿' },
  { id: 'intellectual_disability', label: 'Intellectual Disability', icon: '🧠' },
  { id: 'learning_disability', label: 'Learning Disability', icon: '📚' },
  { id: 'gbv', label: 'Gender-Based Violence', icon: '🛡️' },
  { id: 'fgm', label: 'Female Genital Mutilation', icon: '⚕️' },
  { id: 'trauma', label: 'Trauma Recovery', icon: '🌅' },
];

const SupportCircleList = ({ circles, user, onJoin, onLeave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCircles = circles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          circle.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || circle.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isMember = (circle) => {
    return circle.members?.includes(user?.id) || false;
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search support circles..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="mental_health">Mental Health</option>
          <option value="disability">Disability Support</option>
          <option value="trauma">Trauma & Recovery</option>
          <option value="relationships">Relationships</option>
          <option value="life">Life & Career</option>
        </select>
      </div>

      {/* Circle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCircles.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support circles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredCircles.map((circle) => {
            const member = isMember(circle);
            return (
              <div
                key={circle.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl mb-1">
                      {CIRCLE_CATEGORIES.find(c => c.id === circle.category)?.icon || '🌟'}
                    </div>
                    <h3 className="font-semibold text-gray-900">{circle.name}</h3>
                    <p className="text-sm text-gray-500">{circle.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4" />
                    <span>{circle.members_count || 0} members</span>
                  </div>
                  
                  <button
                    onClick={() => member ? onLeave(circle.id) : onJoin(circle.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                      member
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {member ? (
                      <>
                        <UserMinusIcon className="w-4 h-4" />
                        <span>Leave</span>
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Join</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SupportCircleList;