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
} from '@heroicons/react/24/outline';
import ResourceCard from './components/ResourceCard';
import ResourceDetail from './components/ResourceDetail';

const CATEGORIES = [
  { id: 'guides', label: 'Mental Health Guides', icon: '📚' },
  { id: 'stories', label: 'Inspiring Stories', icon: '📖' },
  { id: 'spoken_word', label: 'Spoken Word', icon: '🎤' },
  { id: 'poems', label: 'Poems', icon: '📝' },
  { id: 'music', label: 'Healing Music', icon: '🎵' },
  { id: 'videos', label: 'Wellness Videos', icon: '🎬' },
  { id: 'books', label: 'Books', icon: '📕' },
];

const Resources = () => {
  const { user, isPremium } = useAuth();
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' | 'list'

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
        <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mental Health Resources</h1>
        <p className="text-gray-500">Articles, videos, books & helpful resources</p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search resources..."
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Resources
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{resources.length} resources found</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={`grid ${
        view === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      } gap-6`}>
        {resources.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isPremium={isPremium}
              view={view}
              onLike={() => handleLike(resource.id)}
              onView={() => setSelectedResource(resource)}
              onPurchase={() => handleBookPurchase(resource)}
            />
          ))
        )}
      </div>

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

export default Resources;