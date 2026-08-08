import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const PostForm = ({ onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onSave(data);
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create a Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              {...register('content', { required: 'Content is required' })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Share your thoughts, experiences, or questions..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex justify-center space-x-6">
              <label className="cursor-pointer flex flex-col items-center hover:text-indigo-600 transition-colors">
                <PhotoIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-1">Add Image</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <label className="cursor-pointer flex flex-col items-center hover:text-indigo-600 transition-colors">
                <VideoCameraIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-1">Add Video</span>
                <input type="file" accept="video/*" className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">Share your journey with the community</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;