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

  const stats = [
    { label: 'Active Users', value: '10K+', icon: UsersIcon },
    { label: 'Moods Tracked', value: '50K+', icon: ChartBarIcon },
    { label: 'Community Posts', value: '5K+', icon: HeartIcon },
    { label: 'Courses Completed', value: '2K+', icon: CheckCircleIcon },
  ];

  const coreFeatures = [
    { icon: '🤖', title: 'AI Emotional Support', description: '24/7 AI-powered conversations for emotional wellness' },
    { icon: '📊', title: 'Mood Tracking', description: 'Monitor and understand your emotional patterns' },
    { icon: '🧘', title: 'Mindfulness Activities', description: 'Guided meditation and relaxation exercises' },
    { icon: '📝', title: 'Personal Journaling', description: 'Private space to express your thoughts and feelings' },
    { icon: '📚', title: 'Mental Health Resources', description: 'Curated articles, videos, and healing content' },
    { icon: '🎓', title: 'Online Courses', description: 'Expert-led courses for personal growth' },
    { icon: '👥', title: 'Community Support Groups', description: 'Connect with others on similar journeys' },
    { icon: '🆘', title: 'Professional Help', description: 'Connections to trusted mental health professionals' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg shadow-indigo-200">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Your Mental Wellness Companion
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Nurture Your Mind,
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Thrive in Life</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Auravive is your all-in-one platform for mental wellness, mindfulness, 
                and personal growth. Start your journey to better mental health today.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 flex items-center"
                >
                  Get Started Free
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
                >
                  Learn More
                </button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-1">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">100% Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Expert Curated</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🌟 Trusted by 10K+
                </div>
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold text-gray-900">Start Your Wellness Journey</h3>
                  <p className="text-gray-600 mt-2">Join thousands of users who are transforming their mental health</p>
                  <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
                    <span>✅ Free to start</span>
                    <span>✅ Premium features</span>
                    <span>✅ Community support</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Learn More Section */}
      <section id="about" className="py-20 px-4 bg-white">
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
                    <div className="text-2xl mb-1">{feature.icon}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HeartIcon className="w-7 h-7 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Compassion</h4>
              <p className="text-sm text-gray-500 mt-1">Empathy at the core of everything we do</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Privacy</h4>
              <p className="text-sm text-gray-500 mt-1">Your data is always protected</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UsersIcon className="w-7 h-7 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Inclusivity</h4>
              <p className="text-sm text-gray-500 mt-1">For everyone, everywhere</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <LightBulbIcon className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Innovation</h4>
              <p className="text-sm text-gray-500 mt-1">Evidence-based practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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
                className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1"
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
      <section className="py-20 px-4 bg-white">
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
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow">
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
