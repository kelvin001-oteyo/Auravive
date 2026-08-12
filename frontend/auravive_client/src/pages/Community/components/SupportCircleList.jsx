import React, { useState } from 'react';
import { UsersIcon, UserPlusIcon, UserMinusIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const CIRCLE_CATEGORIES = {
  'Mental Health Support': [
    { id: 'anxiety', label: 'Anxiety Support', icon: '😰', color: 'from-blue-100 to-blue-200' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🧘', color: 'from-green-100 to-green-200' },
    { id: 'healing', label: 'Healing Journey', icon: '💝', color: 'from-purple-100 to-purple-200' },
    { id: 'self_esteem', label: 'Self-Esteem', icon: '🌟', color: 'from-yellow-100 to-yellow-200' },
  ],
  'Relationships': [
    { id: 'heartbreak', label: 'Heartbreak Recovery', icon: '💔', color: 'from-red-100 to-red-200' },
    { id: 'marriage', label: 'Marriage Support', icon: '💑', color: 'from-pink-100 to-pink-200' },
    { id: 'relationship', label: 'Relationship Advice', icon: '❤️', color: 'from-rose-100 to-rose-200' },
    { id: 'friendship', label: 'Friendship & Social Life', icon: '🤝', color: 'from-indigo-100 to-indigo-200' },
  ],
  'Life Challenges': [
    { id: 'career', label: 'Career Stress', icon: '💼', color: 'from-orange-100 to-orange-200' },
    { id: 'grief', label: 'Grief & Loss', icon: '🕊️', color: 'from-gray-100 to-gray-200' },
    { id: 'parenting', label: 'Parenting Support', icon: '👨‍👩‍👦', color: 'from-teal-100 to-teal-200' },
  ],
  'Disability Support': [
    { id: 'visual_disability', label: 'Visual Disability', icon: '👁️', color: 'from-blue-100 to-blue-200' },
    { id: 'hearing_disability', label: 'Hearing Disability', icon: '👂', color: 'from-purple-100 to-purple-200' },
    { id: 'speech_disability', label: 'Speech & Communication', icon: '🗣️', color: 'from-green-100 to-green-200' },
    { id: 'physical_disability', label: 'Physical Disability', icon: '♿', color: 'from-orange-100 to-orange-200' },
    { id: 'intellectual_disability', label: 'Intellectual Disability', icon: '🧠', color: 'from-indigo-100 to-indigo-200' },
    { id: 'learning_disability', label: 'Learning Disability', icon: '📚', color: 'from-yellow-100 to-yellow-200' },
  ],
  'Community Support': [
    { id: 'gbv', label: 'Gender-Based Violence', icon: '🛡️', color: 'from-red-100 to-red-200' },
    { id: 'fgm', label: 'Female Genital Mutilation', icon: '⚕️', color: 'from-pink-100 to-pink-200' },
    { id: 'trauma', label: 'Trauma Recovery', icon: '🌅', color: 'from-purple-100 to-purple-200' },
  ],
};

const SupportCircleList = ({ circles, user, onJoin, onLeave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(CIRCLE_CATEGORIES).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isMember = (circle) => {
    return circle.members?.includes(user?.id) || false;
  };

  const getAllCircles = () => {
    const allCircles = [];
    Object.entries(CIRCLE_CATEGORIES).forEach(([category, items]) => {
      items.forEach(item => {
        allCircles.push({
          ...item,
          category,
          name: item.label,
          description: `Connect with others in the ${item.label} community`,
          members_count: Math.floor(Math.random() * 50) + 5,
          isActive: true,
        });
      });
    });
    return allCircles;
  };

  const allCircles = getAllCircles();

  const filteredCircles = allCircles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          circle.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getCirclesByCategory = (category) => {
    return filteredCircles.filter(c => c.category === category);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search support circles..."
          className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {Object.keys(CIRCLE_CATEGORIES).map((category) => {
          const categoryCircles = getCirclesByCategory(category);
          if (categoryCircles.length === 0) return null;

          return (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {category === 'Mental Health Support' && '🧠'}
                    {category === 'Relationships' && '💕'}
                    {category === 'Life Challenges' && '🌟'}
                    {category === 'Disability Support' && '♿'}
                    {category === 'Community Support' && '🤝'}
                  </span>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {categoryCircles.length} circles
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {categoryCircles.reduce((sum, c) => sum + (c.members_count || 0), 0)} members
                  </span>
                  {expandedCategories[category] ? (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Circle Cards */}
              {expandedCategories[category] && (
                <div className="p-4 space-y-3">
                  {categoryCircles.map((circle) => {
                    const member = isMember(circle);
                    return (
                      <div
                        key={circle.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-gray-100"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${circle.color || 'from-gray-100 to-gray-200'} flex items-center justify-center text-2xl`}>
                            {circle.icon || '🌟'}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{circle.name}</h4>
                            <p className="text-sm text-gray-500">{circle.description}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="flex items-center text-xs text-gray-400">
                                <UsersIcon className="w-3 h-3 mr-1" />
                                {circle.members_count || 0} members
                              </span>
                              <span className="flex items-center text-xs text-green-500">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => member ? onLeave(circle.id) : onJoin(circle.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                            member
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'
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
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCircles.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No support circles found</h3>
            <p className="text-gray-500">Try adjusting your search or browse all categories</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Add XMarkIcon import
const XMarkIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default SupportCircleList;
