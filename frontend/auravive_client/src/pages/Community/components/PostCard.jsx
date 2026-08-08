import React, { useState } from 'react';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CommentSection from './CommentSection';

const PostCard = ({ post, user, onLike, onComment, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isLiked = post.is_liked || false;
  const isOwner = post.user === user?.id;

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = Math.floor((now - postDate) / (1000 * 60));
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    if (diff < 43200) return `${Math.floor(diff / 1440)}d ago`;
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            {post.user_avatar ? (
              <img
                src={post.user_avatar}
                alt={post.user_name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium text-indigo-600">
                {post.user_name?.[0] || 'U'}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.user_name || 'Anonymous'}</p>
            <p className="text-xs text-gray-400">{formatDate(post.created_at)}</p>
          </div>
        </div>
        
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete();
                  }}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left flex items-center space-x-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.image && (
        <div className="px-4 pb-2">
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-lg max-h-96 object-cover"
          />
        </div>
      )}
      {post.video && (
        <div className="px-4 pb-2">
          <video
            src={post.video}
            controls
            className="w-full rounded-lg max-h-96"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onLike}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors group"
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 group-hover:text-indigo-600" />
            )}
            <span>{post.likes_count || 0}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>{post.comments?.length || 0}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ShareIcon className="w-5 h-5" />
            <span>{post.shares || 0}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection
            comments={post.comments || []}
            onComment={onComment}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;