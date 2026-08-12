import React from 'react';
import { FireIcon, ChatBubbleLeftIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const TrendingTopics = ({ posts }) => {
  // Calculate trending topics based on engagement
  const getTrendingTopics = () => {
    const topics = {};
    posts.forEach(post => {
      const words = post.content?.split(' ') || [];
      words.forEach(word => {
        if (word.startsWith('#') && word.length > 1) {
          const topic = word.toLowerCase();
          if (!topics[topic]) {
            topics[topic] = {
              count: 0,
              likes: 0,
              comments: 0,
            };
          }
          topics[topic].count += 1;
          topics[topic].likes += post.likes_count || 0;
          topics[topic].comments += post.comments?.length || 0;
        }
      });
    });
    
    return Object.entries(topics)
      .map(([topic, data]) => ({
        topic,
        count: data.count,
        engagement: data.likes + data.comments,
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10);
  };

  const trendingTopics = getTrendingTopics();

  if (trendingTopics.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FireIcon className="w-12 h-12 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trending topics yet</h3>
          <p className="text-gray-500">Start engaging with the community to see trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <FireIcon className="w-5 h-5 mr-2 text-orange-500" />
          Trending Discussions
        </h2>
        <div className="space-y-3">
          {trendingTopics.map((item, index) => (
            <div
              key={item.topic}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                <div>
                  <p className="font-medium text-gray-900">{item.topic}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center">
                      <ChatBubbleLeftIcon className="w-3 h-3 mr-1" />
                      {item.count} posts
                    </span>
                    <span className="flex items-center">
                      <HeartIcon className="w-3 h-3 mr-1" />
                      {item.engagement} engagements
                    </span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800' :
                index === 1 ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700' :
                index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {index === 0 ? '🔥 Hot' : index === 1 ? '⭐ Popular' : index === 2 ? '📈 Rising' : '💬 Active'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
