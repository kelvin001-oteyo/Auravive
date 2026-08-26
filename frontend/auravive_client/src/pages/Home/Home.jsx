import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  ChatBubbleLeftIcon,
  BookOpenIcon,
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  HeartIcon,
  LifebuoyIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UserGroupIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const features = [
    {
      icon: ChatBubbleLeftIcon,
      title: 'AI Companion',
      description: '24/7 emotional wellness support powered by AI. Chat safely and get personalized guidance.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: BookOpenIcon,
      title: 'Journal & Memories',
      description: 'Capture your thoughts, feelings, and experiences in a private, secure journal.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: ChartBarIcon,
      title: 'Mood Tracking',
      description: 'Track, analyze, and understand your emotional patterns over time.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: SparklesIcon,
      title: 'Mindfulness Activities',
      description: 'Guided meditation, breathing exercises, and relaxation techniques.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: HeartIcon,
      title: 'Mental Health Resources',
      description: 'Curated articles, videos, books, and healing content.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: AcademicCapIcon,
      title: 'Online Courses',
      description: 'Learn and grow with expert-led wellness courses.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: UsersIcon,
      title: 'Community Support',
      description: 'Connect with others, share experiences, and find support circles.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: LifebuoyIcon,
      title: 'Get Help',
      description: 'Find trusted organizations and professional support services.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Premium Member',
      content: 'Auravive has been a game-changer for my mental health. The AI companion is incredibly supportive, and the community is so welcoming.',
      avatar: '👩',
      rating: 5,
    },
    {
      name: 'James K.',
      role: 'Free Member',
      content: 'The mood tracking feature has helped me understand my emotional patterns better. I feel more in control of my mental health.',
      avatar: '👨',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Premium Member',
      content: 'The mindfulness activities and courses have transformed my daily routine. I\'m more present and less anxious.',
      avatar: '👩‍🦰',
      rating: 5,
    },
  ];

  const coreFeatures = [
    { icon: 'AI', title: 'AI Emotional Support', description: '24/7 AI-powered conversations for emotional wellness' },
    { icon: 'MT', title: 'Mood Tracking', description: 'Monitor and understand your emotional patterns' },
    { icon: 'MA', title: 'Mindfulness Activities', description: 'Guided meditation and relaxation exercises' },
    { icon: 'PJ', title: 'Personal Journaling', description: 'Private space to express your thoughts and feelings' },
    { icon: 'MR', title: 'Mental Health Resources', description: 'Curated articles, videos, and healing content' },
    { icon: 'OC', title: 'Online Courses', description: 'Expert-led courses for personal growth' },
    { icon: 'CS', title: 'Community Support Groups', description: 'Connect with others on similar journeys' },
    { icon: 'PH', title: 'Professional Help', description: 'Connections to trusted mental health professionals' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated to Match Screenshot Design */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-background.jpg" 
            alt="Mental Health Background" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 via-purple-700/85 to-pink-600/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-40 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Mental Health
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4">
            <span className="text-white">Resources</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Articles, videos, books &amp; helpful resources to support your journey.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all shadow-2xl"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-indigo-700 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 bg-white text-indigo-700 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium hover:bg-white/30 transition-all"
            >
              Explore Resources
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
            <div className="flex items-center space-x-1.5">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>Free Access</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <UsersIcon className="w-4 h-4" />
              <span>10K+ Users</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <StarIcon className="w-4 h-4" />
              <span>Expert Curated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Introduction Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Welcome to Auravive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Mental Wellness Platform
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          
          <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-8 md:p-10 border border-indigo-100 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold text-indigo-600">Auravive</span> is a comprehensive, 
              evidence-based mental wellness platform dedicated to making emotional health support 
              accessible to everyone, everywhere.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We combine the power of artificial intelligence with human-centered design to create 
              a safe, private, and supportive environment for individuals on their mental health journey.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform integrates self-reflection tools, mindfulness practices, educational resources, 
              and community connection to provide a holistic approach to mental wellness.
            </p>
          </div>
        </div>
      </section>

      {/* About / Learn More Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              About Auravive
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Learn More About Our Platform</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Auravive?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Auravive is a mental wellness platform designed to help people improve their emotional well-being 
                  through self-reflection, mindfulness, community support, learning, and access to professional resources. 
                  The platform creates a safe space where people can manage stress, understand their emotions, track 
                  their mental wellness journey, and find support when they need it.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-900">Our Mission</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    To make emotional wellness support more accessible by helping people heal, grow, and build 
                    healthier minds through technology, resources, and supportive communities.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <div className="text-3xl mb-2">👁️</div>
                  <h4 className="font-semibold text-gray-900">Our Vision</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    To become a trusted global platform where every person can access tools, guidance, and a 
                    supportive environment to improve their mental health and live a more balanced and fulfilling life.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {coreFeatures.map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all border border-gray-100">
                    <div className="text-lg font-bold text-indigo-600 mb-1">{feature.icon}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need for Mental Wellness
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to support your mental health journey
              with tools, resources, and community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1 hover:bg-white"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Getting Started
            </span>
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">Start your wellness journey in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Account',
                description: 'Sign up for free and set up your wellness profile.',
                icon: '📝',
                color: 'from-blue-500 to-blue-600',
              },
              {
                step: '2',
                title: 'Explore & Connect',
                description: 'Use tools, join communities, and track your progress.',
                icon: '🔍',
                color: 'from-purple-500 to-purple-600',
              },
              {
                step: '3',
                title: 'Grow & Thrive',
                description: 'Develop healthy habits and improve your mental wellbeing.',
                icon: '🌱',
                color: 'from-green-500 to-green-600',
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative inline-block">
                  <div className={`w-24 h-24 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-gray-600">Real stories from real people on their wellness journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow hover:bg-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of users who are taking control of their mental health.
            Start for free today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm"
            >
              View Pricing
            </button>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">No credit card required • Free plan available</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
