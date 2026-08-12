import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ChatBubbleLeftIcon, 
  BookOpenIcon, 
  ChartBarIcon,
  SparklesIcon,
  UsersIcon,
  AcademicCapIcon,
  HeartIcon,
  LifebuoyIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../Footer/Footer';

const mainNavigation = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'AI Companion', path: '/ai-companion', icon: ChatBubbleLeftIcon },
  { name: 'My Journey', path: '/journey', icon: BookOpenIcon },
  { name: 'Mood Tracking', path: '/mood-tracking', icon: ChartBarIcon },
  { name: 'Mindfulness', path: '/mindfulness', icon: SparklesIcon },
  { name: 'Resources', path: '/resources', icon: HeartIcon },
  { name: 'Courses', path: '/courses', icon: AcademicCapIcon },
  { name: 'Community', path: '/community', icon: UsersIcon },
  { name: 'Get Help', path: '/get-help', icon: LifebuoyIcon },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <PublicNavbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <Link to="/dashboard" className="text-xl font-bold gradient-text">
            Auravive
          </Link>
          <Link to="/profile" className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-600">
            <UserCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </Link>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 glass border-r border-gray-200/50 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <span className="text-2xl font-bold gradient-text">Auravive</span>
                <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full">v2.0</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <ul className="space-y-1">
                {mainNavigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/30'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                        ({ isActive }) => isActive ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      }`} />
                      <span className="font-medium">{item.name}</span>
                      {({ isActive }) => isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="ml-auto w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
                        />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-4 border-t border-gray-200/50 dark:border-gray-700/50"></div>

              {/* Additional Links */}
              <div className="space-y-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all"
                >
                  <UserCircleIcon className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all"
                >
                  {isDarkMode ? (
                    <SunIcon className="w-5 h-5 mr-3 text-yellow-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 mr-3 text-gray-400" />
                  )}
                  <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                {user.plan_type === 'free' && (
                  <Link
                    to="/pricing"
                    className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-700/30 text-amber-700 dark:text-amber-400 hover:from-amber-100 hover:to-yellow-100 dark:hover:from-amber-900/30 dark:hover:to-yellow-900/30 transition-all"
                  >
                    <CreditCardIcon className="w-5 h-5 mr-3 text-amber-500" />
                    <span className="font-medium">Upgrade to Premium</span>
                    <span className="ml-auto text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-0.5 rounded-full">🌟</span>
                  </Link>
                )}
              </div>
            </nav>

            {/* User Profile & Logout */}
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
              <div className="flex items-center mb-3 p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 flex items-center justify-center flex-shrink-0 border-2 border-indigo-200 dark:border-indigo-600">
                  {user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.full_name || user?.username || 'User'}
                  </p>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user?.plan_type === 'premium' 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {user?.plan_type === 'premium' ? '🌟 Premium' : 'Free Plan'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-72 flex-1 min-h-screen flex flex-col">
          <div className="pt-16 lg:pt-0 flex-1">
            <main className="p-4 md:p-6 animate-fade-in">
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Public Navbar Component with Premium Design
const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">Auravive</span>
            <span className="hidden sm:inline text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full">Mental Wellness</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              About
            </Link>
            <Link to="/services" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Services
            </Link>
            <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Contact
            </Link>
            <Link
              to="/donate"
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all font-medium shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
            >
              ❤️ Donate
            </Link>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-gray-200/50 dark:border-gray-700/50 py-4 px-4"
        >
          <div className="space-y-3">
            <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
            <Link to="/services" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Services</Link>
            <Link to="/pricing" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</Link>
            <Link to="/faq" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</Link>
            <Link to="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
            <Link to="/donate" className="block text-rose-500 font-medium">❤️ Donate</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Layout;
