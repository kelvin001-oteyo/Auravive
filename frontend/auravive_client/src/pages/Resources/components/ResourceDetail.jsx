import React from 'react';
import { XMarkIcon, HeartIcon, EyeIcon, ShoppingCartIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ResourceDetail = ({ resource, onClose, onPurchase }) => {
  const isLiked = resource.is_liked || false;
  const isBook = resource.category_name?.toLowerCase() === 'books';

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
            {resource.author && (
              <p className="text-sm text-gray-500">by {resource.author}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {resource.category_name}
            </span>
            {resource.is_premium && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                ⭐ Premium Content
              </span>
            )}
            <span className="flex items-center space-x-1 text-gray-500">
              <EyeIcon className="w-4 h-4" />
              <span>{resource.views || 0} views</span>
            </span>
            <span className="text-gray-500">
              Added {formatDate(resource.created_at)}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{resource.description}</p>
          </div>

          {/* Book Summary & Review */}
          {isBook && (resource.summary || resource.review) && (
            <div className="space-y-4">
              {resource.summary && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">📖 Summary</h3>
                  <p className="text-gray-600 leading-relaxed">{resource.summary}</p>
                </div>
              )}
              {resource.review && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">⭐ Review</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 leading-relaxed">{resource.review}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content Preview */}
          {resource.content_text && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Content</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{resource.content_text}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {resource.tags && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.split(',').map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              {isLiked ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
              <span>{isLiked ? 'Liked' : 'Like'}</span>
              <span>({resource.likes_count || 0})</span>
            </button>

            {isBook && resource.purchase_url && (
              <button
                onClick={onPurchase}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Buy This Book</span>
                {resource.price && <span>(${resource.price})</span>}
              </button>
            )}

            {resource.content_url && (
              <a
                href={resource.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span>Read More</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;