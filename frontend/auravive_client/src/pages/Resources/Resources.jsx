import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import resourcesService from '../../services/resourcesService';
import toast from 'react-hot-toast';
import {
  HeartIcon,
  BookOpenIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
  SparklesIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  FilmIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import ResourceCard from './components/ResourceCard';
import ResourceDetail from './components/ResourceDetail';

const CATEGORIES = [
  { id: 'guides', label: 'Mental Health Guides', icon: '📚', color: 'from-blue-500 to-blue-600' },
  { id: 'stories', label: 'Inspiring Stories', icon: '📖', color: 'from-green-500 to-green-600' },
  { id: 'spoken_word', label: 'Spoken Word', icon: '🎤', color: 'from-purple-500 to-purple-600' },
  { id: 'poems', label: 'Poems', icon: '📝', color: 'from-pink-500 to-pink-600' },
  { id: 'music', label: 'Healing Music', icon: '🎵', color: 'from-indigo-500 to-indigo-600' },
  { id: 'videos', label: 'Wellness Videos', icon: '🎬', color: 'from-red-500 to-red-600' },
  { id: 'books', label: 'Books', icon: '📕', color: 'from-orange-500 to-orange-600' },
];

const Resources = () => {
  const { user, isPremium } = useAuth();
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [view, setView] = useState('grid');

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resourcesRes, categoriesRes] = await Promise.all([
        resourcesService.getResources({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          search: searchTerm || undefined,
        }),
        resourcesService.getCategories(),
      ]);

      setResources(resourcesRes.results || resourcesRes);
      setCategories(categoriesRes.results || categoriesRes);
    } catch (error) {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (resourceId) => {
    try {
      const response = await resourcesService.likeResource(resourceId);
      setResources(resources.map(resource =>
        resource.id === resourceId
          ? { ...resource, likes_count: response.likes_count, is_liked: response.liked }
          : resource
      ));
    } catch (error) {
      toast.error('Failed to like resource');
    }
  };

  const handleBookPurchase = (resource) => {
    if (resource.purchase_url) {
      window.open(resource.purchase_url, '_blank');
    } else {
      toast.info('Purchase link coming soon!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading resources...</p>
        </div>
      </div>
    );
  }

  const hasResources = resources.length > 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mental Health Resources</h1>
            <p className="text-indigo-100 mt-1">Articles, videos, books & helpful resources</p>
          </div>
          <div className="hidden md:block">
            <SparklesIcon className="w-12 h-12 text-white/30" />
          </div>
        </div>
        {/* Search Bar in Header */}
        <div className="relative mt-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none border border-white/20"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-white/70" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-3.5 text-white/70 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ✨ All Resources
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Resources</p>
          <p className="text-2xl font-bold text-gray-900">{resources.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-gray-900">{CATEGORIES.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Premium Content</p>
          <p className="text-2xl font-bold text-yellow-600">
            {resources.filter(r => r.is_premium).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Free Content</p>
          <p className="text-2xl font-bold text-green-600">
            {resources.filter(r => !r.is_premium).length}
          </p>
        </div>
      </div>

      {/* Resources Grid */}
      {!hasResources ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpenIcon className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isPremium={isPremium}
              view={view}
              onLike={() => handleLike(resource.id)}
              onView={() => setSelectedResource(resource)}
              onPurchase={() => handleBookPurchase(resource)}
            />
          ))}
        </div>
      )}

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetail
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onPurchase={() => handleBookPurchase(selectedResource)}
        />
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

export default Resources;
