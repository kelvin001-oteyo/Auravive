import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from '@heroicons/react/24/outline';
import AnimatedCards from '../../components/Animations/AnimatedCards';
import AnimatedButton from '../../components/Animations/AnimatedButton';
import { floatAnimation, pulseAnimation } from '../../utils/animations';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChatBubbleLeftIcon,
      title: 'AI Companion',
      description: '24/7 emotional wellness support powered by AI. Chat safely and get personalized guidance.',
      color: 'bg-blue-100 text-blue-600',
      delay: 0.1,
    },
    {
      icon: BookOpenIcon,
      title: 'Journal & Memories',
      description: 'Capture your thoughts, feelings, and experiences in a private, secure journal.',
      color: 'bg-purple-100 text-purple-600',
      delay: 0.15,
    },
    {
      icon: ChartBarIcon,
      title: 'Mood Tracking',
      description: 'Track, analyze, and understand your emotional patterns over time.',
      color: 'bg-green-100 text-green-600',
      delay: 0.2,
    },
    {
      icon: SparklesIcon,
      title: 'Mindfulness Activities',
      description: 'Guided meditation, breathing exercises, and relaxation techniques.',
      color: 'bg-orange-100 text-orange-600',
      delay: 0.25,
    },
    {
      icon: HeartIcon,
      title: 'Mental Health Resources',
      description: 'Curated articles, videos, books, and healing content.',
      color: 'bg-red-100 text-red-600',
      delay: 0.3,
    },
    {
      icon: AcademicCapIcon,
      title: 'Online Courses',
      description: 'Learn and grow with expert-led wellness courses.',
      color: 'bg-yellow-100 text-yellow-600',
      delay: 0.35,
    },
    {
      icon: UsersIcon,
      title: 'Community Support',
      description: 'Connect with others, share experiences, and find support circles.',
      color: 'bg-pink-100 text-pink-600',
      delay: 0.4,
    },
    {
      icon: LifebuoyIcon,
      title: 'Get Help',
      description: 'Find trusted organizations and professional support services.',
      color: 'bg-indigo-100 text-indigo-600',
      delay: 0.45,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Premium Member',
      content: 'Auravive has been a game-changer for my mental health. The AI companion is incredibly supportive, and the community is so welcoming.',
      avatar: '👩',
      rating: 5,
      delay: 0.1,
    },
    {
      name: 'James K.',
      role: 'Free Member',
      content: 'The mood tracking feature has helped me understand my emotional patterns better. I feel more in control of my mental health.',
      avatar: '👨',
      rating: 5,
      delay: 0.2,
    },
    {
      name: 'Emily R.',
      role: 'Premium Member',
      content: 'The mindfulness activities and courses have transformed my daily routine. I\'m more present and less anxious.',
      avatar: '👩‍🦰',
      rating: 5,
      delay: 0.3,
    },
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: UsersIcon, delay: 0.1 },
    { label: 'Moods Tracked', value: '50K+', icon: ChartBarIcon, delay: 0.2 },
    { label: 'Community Posts', value: '5K+', icon: HeartIcon, delay: 0.3 },
    { label: 'Courses Completed', value: '2K+', icon: CheckCircleIcon, delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
                animate={pulseAnimation.animate}
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Your Mental Wellness Companion
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Nurture Your Mind,
                <br />
                <span className="text-indigo-600">Thrive in Life</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Auravive is your all-in-one platform for mental wellness, mindfulness, 
                and personal growth. Start your journey to better mental health today.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <AnimatedButton
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                >
                  Get Started Free
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => navigate('/about')}
                  className="px-8 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  Learn More
                </AnimatedButton>
              </div>
              <motion.div
                className="mt-8 flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
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
              </motion.div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div
                className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                animate={floatAnimation.animate}
              >
                <motion.div
                  className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  animate={pulseAnimation.animate}
                >
                  🌟 Trusted by 10K+
                </motion.div>
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8 text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🧠
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900">Start Your Wellness Journey</h3>
                  <p className="text-gray-600 mt-2">Join thousands of users who are transforming their mental health</p>
                  <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
                    <span>✅ Free to start</span>
                    <span>✅ Premium features</span>
                    <span>✅ Community support</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need for Mental Wellness
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to support your mental health journey
              with tools, resources, and community.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedCards
                key={index}
                delay={feature.delay}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </AnimatedCards>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">Start your wellness journey in three simple steps</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Account',
                description: 'Sign up for free and set up your wellness profile.',
                icon: '📝',
                delay: 0.1,
              },
              {
                step: '2',
                title: 'Explore & Connect',
                description: 'Use tools, join communities, and track your progress.',
                icon: '🔍',
                delay: 0.2,
              },
              {
                step: '3',
                title: 'Grow & Thrive',
                description: 'Develop healthy habits and improve your mental wellbeing.',
                icon: '🌱',
                delay: 0.3,
              },
            ].map((item) => (
              <AnimatedCards key={item.step} delay={item.delay} className="text-center">
                <motion.div
                  className="relative inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </AnimatedCards>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-gray-600">Real stories from real people on their wellness journey</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedCards
                key={index}
                delay={testimonial.delay}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <StarIcon className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{testimonial.content}</p>
              </AnimatedCards>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-indigo-100 text-lg mb-8"
          >
            Join thousands of users who are taking control of their mental health.
            Start for free today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <AnimatedButton
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Start Free Trial
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate('/pricing')}
              className="px-8 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-400 transition-colors border border-white/20"
            >
              View Pricing
            </AnimatedButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 text-indigo-200 text-sm"
          >
            No credit card required • Free plan available
          </motion.p>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;