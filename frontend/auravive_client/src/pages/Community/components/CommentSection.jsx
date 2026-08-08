import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const CommentSection = ({ comments, onComment, user }) => {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    onComment(newComment.trim());
    setNewComment('');
    setSubmitting(false);
  };

  const formatDate = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diff = Math.floor((now - commentDate) / (1000 * 60));
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return commentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 space-y-3">
      {/* Comments List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                {comment.user_avatar ? (
                  <img
                    src={comment.user_avatar}
                    alt={comment.user_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-indigo-600">
                    {comment.user_name?.[0] || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">
                    {comment.user_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">{formatDate(comment.created_at)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-2">No comments yet</p>
        )}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!newComment.trim() || submitting}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;