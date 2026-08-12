import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import communityService from '../../services/communityService';
import toast from 'react-hot-toast';
import {
  UsersIcon,
  PlusIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  UserCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PhotoIcon,
  VideoCameraIcon,
  HashtagIcon,
  BellIcon,
  UserGroupIcon,
  SparklesIcon,
  GlobeAltIcon,
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import SupportCircleList from './components/SupportCircleList';
import CommentSection from './components/CommentSection';
import TrendingTopics from './components/TrendingTopics';
import LiveChatWidget from './components/LiveChatWidget';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('feed');
  const [showLiveChat, setShowLiveChat] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedCircle]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, circlesRes] = await Promise.all([
        communityService.getPosts({
          circle: selectedCircle === 'all' ? undefined : selectedCircle,
          search: searchTerm || undefined,
        }),
        communityService.getCircles(),
      ]);

      setPosts(postsRes.results || postsRes);
      setCircles(circlesRes.results || circlesRes);
    } catch (error) {
      toast.error('Failed to load community content');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await communityService.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes_count: response.likes_count, is_liked: response.liked }
          : post
      ));
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (postId, content) => {
    try {
      const response = await communityService.commentOnPost(postId, content);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), response] }
          : post
      ));
      toast.success('Comment added!');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleJoinCircle = async (circleId) => {
    try {
      await communityService.joinCircle(circleId);
      setCircles(circles.map(circle =>
        circle.id === circleId
          ? { ...circle, members_count: circle.members_count + 1 }
          : circle
      ));
      toast.success('Joined support circle!');
    } catch (error) {
      toast.error('Failed to join circle');
    }
  };

  const handleLeaveCircle = async (circleId) => {
    try {
      await communityService.leaveCircle(circleId);
      setCircles(circles.map(circle =>
        circle.id === circleId
          ? { ...circle, members_count: Math.max(0, circle.members_count - 1) }
          : circle
      ));
      toast.success('Left support circle');
    } catch (error) {
      toast.error('Failed to leave circle');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await communityService.deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Post deleted');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Community</h1>
                <p className="text-indigo-100">Connect, share & support each other</p>
              </div>
              <button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2 text-sm border border-white/20"
              >
                <ChatBubbleLeftIcon className="w-4 h-4" />
                <span>Live Chat</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-indigo-100 text-sm">Community Posts</p>
                <p className="text-xl font-bold">{posts.length}</p>
              </div>
              <div>
                <p className="text-indigo-100 text-sm">Support Circles</p>
                <p className="text-xl font-bold">{circles.length}</p>
              </div>
              <div>
                <p className="text-indigo-100 text-sm">Active Members</p>
                <p className="text-xl font-bold">
                  {circles.reduce((sum, c) => sum + (c.members_count || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex">
            <button
              onClick={() => setView('feed')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'feed'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <SparklesIcon className="w-4 h-4 inline mr-2" />
              Feed
            </button>
            <button
              onClick={() => setView('circles')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'circles'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserGroupIcon className="w-4 h-4 inline mr-2" />
              Support Circles
            </button>
            <button
              onClick={() => setView('trending')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'trending'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FireIcon className="w-4 h-4 inline mr-2" />
              Trending
            </button>
          </div>

          {/* Create Post Button */}
          <button
            onClick={() => setShowPostForm(true)}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-6 h-6 text-indigo-600" />
              )}
            </div>
            <span className="text-gray-400 group-hover:text-gray-600 transition-colors flex-1 text-left">
              What's on your mind, {user?.first_name || 'User'}?
            </span>
            <div className="flex items-center space-x-2 text-gray-400">
              <PhotoIcon className="w-5 h-5" />
              <VideoCameraIcon className="w-5 h-5" />
              <HashtagIcon className="w-5 h-5" />
            </div>
          </button>

          {/* Search */}
          {view === 'feed' && (
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
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
          )}

          {/* Content */}
          {view === 'feed' ? (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UsersIcon className="w-12 h-12 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-500">Be the first to share something with the community</p>
                    <button
                      onClick={() => setShowPostForm(true)}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      Create First Post ✨
                    </button>
                  </div>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    user={user}
                    onLike={() => handleLike(post.id)}
                    onComment={(content) => handleComment(post.id, content)}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))
              )}
            </div>
          ) : view === 'circles' ? (
            <SupportCircleList
              circles={circles}
              user={user}
              onJoin={handleJoinCircle}
              onLeave={handleLeaveCircle}
            />
          ) : (
            <TrendingTopics posts={posts} />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block space-y-6">
          {/* Trending Topics Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <FireIcon className="w-4 h-4 mr-2 text-orange-500" />
                Trending Topics
              </h3>
              <span className="text-xs text-gray-400">Today</span>
            </div>
            <div className="space-y-2">
              {['Mental Health Awareness', 'Mindfulness Tips', 'Self-Care Sunday', 'Community Support', 'Healing Journey'].map((topic, i) => (
                <div key={i} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                  <span className="text-sm text-gray-700">#{topic.replace(/\s/g, '')}</span>
                  <span className="text-xs text-gray-400">{Math.floor(Math.random() * 50) + 10} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Circles Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <UserGroupIcon className="w-4 h-4 mr-2 text-purple-500" />
                Popular Circles
              </h3>
              <button
                onClick={() => setView('circles')}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                View All →
              </button>
            </div>
            <div className="space-y-2">
              {circles.slice(0, 5).map((circle) => (
                <div key={circle.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{circle.icon || '🌟'}</span>
                    <span className="text-sm text-gray-700">{circle.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{circle.members_count || 0} members</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Community Guidelines</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Be kind, respect privacy, and support each other. Report any inappropriate content.
                </p>
                <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                  Read more →
                </button>
              </div>
            </div>
          </div>

          {/* Live Chat Widget */}
          {showLiveChat && (
            <LiveChatWidget onClose={() => setShowLiveChat(false)} />
          )}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <PostForm
          onClose={() => setShowPostForm(false)}
          onSave={async (data) => {
            try {
              const newPost = await communityService.createPost(data);
              setPosts([newPost, ...posts]);
              toast.success('Post created successfully! 🎉');
              setShowPostForm(false);
            } catch (error) {
              toast.error('Failed to create post');
            }
          }}
        />
      )}
    </div>
  );
};

// Add ShieldCheckIcon if not imported
const ShieldCheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default Community;
