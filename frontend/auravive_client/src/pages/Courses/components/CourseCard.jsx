import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import coursesService from '../../../services/coursesService';
import toast from 'react-hot-toast';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  PlayIcon,
  StarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import CourseCard from './CourseCard';
import CourseDetail from './CourseDetail';
import CoursePlayer from './CoursePlayer';

const Courses = () => {
  const { user, isPremium } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'enrolled' | 'premium' | 'free'
  const [view, setView] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    fetchData();
  }, [filter, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes, enrolledRes] = await Promise.all([
        coursesService.getCourses({
          search: searchTerm || undefined,
          is_premium: filter === 'premium' ? true : filter === 'free' ? false : undefined,
        }),
        coursesService.getEnrolledCourses(),
      ]);

      setCourses(coursesRes.results || coursesRes);
      setEnrolledCourses(enrolledRes.results || enrolledRes);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await coursesService.enrollCourse(courseId);
      toast.success('Enrolled successfully! 🎉');
      fetchData();
    } catch (error) {
      toast.error('Failed to enroll');
    }
  };

  const handleUnenroll = async (courseId) => {
    if (!window.confirm('Are you sure you want to unenroll from this course?')) return;
    try {
      await coursesService.unenrollCourse(courseId);
      toast.success('Unenrolled successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to unenroll');
    }
  };

  const handleStartLesson = (course, lesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c.id === courseId);
  };

  const getCourseProgress = (courseId) => {
    const enrolled = enrolledCourses.find(c => c.id === courseId);
    return enrolled?.progress_percentage || 0;
  };

  const displayedCourses = filter === 'enrolled' 
    ? courses.filter(c => isEnrolled(c.id))
    : courses;

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
          <h1 className="text-2xl font-bold text-gray-900">Online Courses</h1>
          <p className="text-gray-500">Learn & grow with expert-led courses</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {isPremium ? '🌟 Premium Member' : 'Free Plan'}
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
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
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('enrolled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'enrolled'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setFilter('free')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'free'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setFilter('premium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'premium'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrolled</p>
              <p className="text-xl font-bold text-gray-900">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Premium</p>
              <p className="text-xl font-bold text-gray-900">
                {courses.filter(c => c.is_premium).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-bold text-gray-900">
                {enrolledCourses.filter(c => c.progress_percentage > 0 && c.progress_percentage < 100).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{displayedCourses.length} courses found</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className={`grid ${
        view === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      } gap-6`}>
        {displayedCourses.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          displayedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={isEnrolled(course.id)}
              progress={getCourseProgress(course.id)}
              isPremium={isPremium}
              view={view}
              onEnroll={() => handleEnroll(course.id)}
              onUnenroll={() => handleUnenroll(course.id)}
              onView={() => setSelectedCourse(course)}
            />
          ))
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetail
          course={selectedCourse}
          isEnrolled={isEnrolled(selectedCourse.id)}
          progress={getCourseProgress(selectedCourse.id)}
          onClose={() => setSelectedCourse(null)}
          onEnroll={() => handleEnroll(selectedCourse.id)}
          onStartLesson={(lesson) => handleStartLesson(selectedCourse, lesson)}
        />
      )}

      {/* Course Player */}
      {selectedLesson && selectedCourse && (
        <CoursePlayer
          course={selectedCourse}
          lesson={selectedLesson}
          onClose={() => {
            setSelectedLesson(null);
            setSelectedCourse(null);
          }}
          onComplete={() => {
            toast.success('Lesson completed! 🎉');
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default Courses;