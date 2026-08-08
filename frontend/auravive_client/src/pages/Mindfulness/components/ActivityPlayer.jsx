import React, { useState, useEffect, useRef } from 'react';
import {
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
import mindfulnessService from '../../../services/mindfulnessService';

const ActivityPlayer = ({ activity, onClose, onComplete }) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(activity.duration * 60); // in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Start session when player opens
    startSession();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startSession = async () => {
    try {
      await mindfulnessService.startSession({
        activity: activity.id,
        started_at: new Date().toISOString(),
        duration_completed: 0,
      });
    } catch (error) {
      console.error('Failed to start session');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= totalDuration) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsComplete(true);
            handleComplete();
            return totalDuration;
          }
          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration]);

  const handleComplete = async () => {
    const minutes = Math.floor(timeElapsed / 60);
    await onComplete(minutes);
  };

  const togglePlay = () => {
    if (isComplete) return;
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeElapsed / totalDuration) * 100;

  const getGuideText = () => {
    const progressPercent = (timeElapsed / totalDuration) * 100;
    if (progressPercent < 25) return "Begin by finding a comfortable position...";
    if (progressPercent < 50) return "Focus on your breath. Inhale deeply, exhale slowly...";
    if (progressPercent < 75) return "Notice any thoughts without judgment. Let them pass...";
    return "You're almost done. Take a final deep breath...";
  };

  const getMoodEmoji = () => {
    const progressPercent = (timeElapsed / totalDuration) * 100;
    if (progressPercent < 25) return '🌱';
    if (progressPercent < 50) return '🌿';
    if (progressPercent < 75) return '🌳';
    if (progressPercent < 100) return '🌺';
    return '✨';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{activity.name}</h2>
            <p className="text-sm text-gray-500">
              {activity.activity_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
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
          {/* Visual Display */}
          <div className="relative bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">{getMoodEmoji()}</div>
            <div className="text-4xl font-bold text-gray-900">{formatTime(timeElapsed)}</div>
            <div className="text-sm text-gray-500 mt-1">
              {isComplete ? '✨ Complete!' : `${formatTime(totalDuration - timeElapsed)} remaining`}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isComplete ? 'bg-green-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Guide Text */}
            <div className="mt-4 text-sm text-gray-600 italic">
              "{getGuideText()}"
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <SpeakerWaveIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={togglePlay}
              disabled={isComplete}
              className={`p-4 rounded-full transition-colors ${
                isComplete
                  ? 'bg-green-500 text-white'
                  : isPlaying
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isComplete ? (
                <CheckCircleIcon className="w-8 h-8" />
              ) : isPlaying ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8" />
              )}
            </button>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ClockIcon className="w-4 h-4" />
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Tips for the session</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Find a quiet, comfortable space</li>
              <li>• Close your eyes and focus on your breath</li>
              <li>• Let thoughts come and go without judgment</li>
              <li>• Be patient and kind to yourself</li>
            </ul>
          </div>

          {/* Complete Button */}
          {isComplete && (
            <button
              onClick={onClose}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircleIcon className="w-5 h-5 inline mr-2" />
              Great Job! Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPlayer;