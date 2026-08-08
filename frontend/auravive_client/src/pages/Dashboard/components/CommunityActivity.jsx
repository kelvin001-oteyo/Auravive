import React from 'react';

const CommunityActivity = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500 text-sm">No recent community activity</p>;
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            {post.user_avatar ? (
              <img
                src={post.user_avatar}
                alt={post.user_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium text-indigo-600">
                {post.user_name?.[0] || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{post.user_name || 'User'}</span>
              <span className="text-gray-500 text-xs ml-2">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityActivity;