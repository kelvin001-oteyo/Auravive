import React from 'react';
import {
  XMarkIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const CourseDetail = ({ course, isEnrolled, progress, onClose, onEnroll, onStartLesson }) => {
  const isLocked = course.is_premium && !isEnrolled;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="w-full h-64 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <AcademicCapIcon className="w-24 h-24 text-white/50" />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
              <p className="text-gray-600">by {course.instructor}</p>
            </div>
            {course.is_premium && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                ⭐ Premium Course
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <span className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1" />
              {course.duration}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <BookOpenIcon className="w-4 h-4 mr-1" />
              {course.lessons_count} lessons
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <UserGroupIcon className="w-4 h-4 mr-1" />
              {course.enrolled_count || 0} enrolled
            </span>
            {isEnrolled && (
              <span className="flex items-center text-sm text-green-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                {progress}% complete
              </span>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">About this course</h3>
            <p className="text-gray-600 leading-relaxed">{course.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
            <div className="space-y-2">
              {course.lessons?.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    lesson.is_free || isEnrolled
                      ? 'hover:bg-gray-50 cursor-pointer'
                      : 'bg-gray-50 opacity-75'
                  }`}
                  onClick={() => {
                    if (lesson.is_free || isEnrolled) {
                      onStartLesson(lesson);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900">{lesson.title}</p>
                      <p className="text-sm text-gray-500">{lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.is_free && !isEnrolled && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Free Preview
                      </span>
                    )}
                    {(lesson.is_free || isEnrolled) ? (
                      <PlayIcon className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <span className="text-xs text-gray-400">🔒</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            {isEnrolled ? (
              <button
                onClick={() => {
                  const firstLesson = course.lessons?.find(l => l.is_free || isEnrolled);
                  if (firstLesson) onStartLesson(firstLesson);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Continue Learning</span>
              </button>
            ) : (
              <button
                onClick={onEnroll}
                disabled={course.is_premium && !isEnrolled}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  course.is_premium && !isEnrolled
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {course.is_premium ? '🔒 Premium Required' : 'Enroll Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;