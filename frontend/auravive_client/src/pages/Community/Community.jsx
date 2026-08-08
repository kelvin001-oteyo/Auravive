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
} from '@heroicons/react/24/outline';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import SupportCircleList from './components/SupportCircleList';
import CommentSection from './components/CommentSection';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('feed'); // 'feed' | 'circles'

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
        <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-500">Connect, share & support each other</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setView('feed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'feed'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setView('circles')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'circles'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <UsersIcon className="w-4 h-4 inline mr-2" />
            Support Circles
          </button>
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Search */}
      {view === 'feed' && (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something with the community</p>
              <button
                onClick={() => setShowPostForm(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create First Post
              </button>
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
      ) : (
        <SupportCircleList
          circles={circles}
          user={user}
          onJoin={handleJoinCircle}
          onLeave={handleLeaveCircle}
        />
      )}

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

export default Community;