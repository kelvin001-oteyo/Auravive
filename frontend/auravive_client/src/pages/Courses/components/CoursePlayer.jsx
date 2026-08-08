import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const CoursePlayer = ({ course, lesson, onClose, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate video progress
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          const newProgress = p + 0.5;
          if (newProgress >= 100) {
            setIsPlaying(false);
            setIsComplete(true);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handlePlay = () => {
    if (isComplete) return;
    setIsPlaying(!isPlaying);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div>
            <h3 className="text-white font-medium">{course.title}</h3>
            <p className="text-white/60 text-sm">{lesson.title}</p>
          </div>
        </div>
        {isComplete && (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            <span>Complete Lesson</span>
          </button>
        )}
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg flex flex-col items-center justify-center relative">
          {/* Video Content */}
          <div className="text-center text-white/30">
            <AcademicCapIcon className="w-24 h-24 mx-auto mb-4" />
            <p className="text-xl">{lesson.title}</p>
            <p className="text-sm">Course content would play here</p>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-16 left-4 right-4">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div
                className="bg-indigo-600 rounded-full h-1 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4">
            <button
              onClick={handlePlay}
              disabled={isComplete}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
            >
              {isComplete ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
              ) : isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>
            <span className="text-white/70 text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Lesson Info */}
      <div className="p-4 bg-black/50 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-white/60">
          <span>{lesson.duration}</span>
          <span>{course.lessons?.findIndex(l => l.id === lesson.id) + 1} / {course.lessons?.length}</span>
        </div>
      </div>
    </div>
  );
};

// Add missing import
const AcademicCapIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422M12 14l-6.16-3.422M12 14v6m-6 0h12" />
  </svg>
);

export default CoursePlayer;