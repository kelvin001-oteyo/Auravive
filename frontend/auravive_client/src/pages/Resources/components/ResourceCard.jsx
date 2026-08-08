import React from 'react';
import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const CATEGORY_ICONS = {
  guides: '📚',
  stories: '📖',
  spoken_word: '🎤',
  poems: '📝',
  music: '🎵',
  videos: '🎬',
  books: '📕',
};

const ResourceCard = ({ resource, isPremium, view, onLike, onView, onPurchase }) => {
  const isLiked = resource.is_liked || false;
  const isBook = resource.category_name?.toLowerCase() === 'books';

  if (view === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-4xl">{CATEGORY_ICONS[resource.category] || '📚'}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                {resource.author && (
                  <p className="text-sm text-gray-500">by {resource.author}</p>
                )}
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-1 inline-block">
                  {resource.category_name}
                </span>
              </div>
              {resource.is_premium && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{resource.description}</p>
            <div className="flex items-center space-x-4 mt-3">
              <button onClick={onLike} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500">
                {isLiked ? <HeartIconSolid className="w-4 h-4 text-red-500" /> : <HeartIcon className="w-4 h-4" />}
                <span>{resource.likes_count || 0}</span>
              </button>
              <span className="flex items-center space-x-1 text-sm text-gray-500">
                <EyeIcon className="w-4 h-4" />
                <span>{resource.views || 0}</span>
              </span>
              {resource.price && (
                <span className="text-sm font-medium text-green-600">${resource.price}</span>
              )}
              {isBook && resource.purchase_url && (
                <button
                  onClick={onPurchase}
                  className="ml-auto px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span>Buy</span>
                </button>
              )}
              <button
                onClick={onView}
                className="ml-auto text-sm text-indigo-600 hover:text-indigo-700"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
          <span className="text-6xl">{CATEGORY_ICONS[resource.category] || '📚'}</span>
        </div>
        {resource.is_premium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Premium
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{resource.title}</h3>
            {resource.author && (
              <p className="text-sm text-gray-500">by {resource.author}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{resource.description}</p>

        {resource.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.split(',').slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onLike} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500">
              {isLiked ? <HeartIconSolid className="w-4 h-4 text-red-500" /> : <HeartIcon className="w-4 h-4" />}
              <span>{resource.likes_count || 0}</span>
            </button>
            <span className="flex items-center space-x-1 text-sm text-gray-500">
              <EyeIcon className="w-4 h-4" />
              <span>{resource.views || 0}</span>
            </span>
          </div>
          {isBook && resource.purchase_url && (
            <button
              onClick={onPurchase}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-1"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>Buy</span>
            </button>
          )}
          <button
            onClick={onView}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;