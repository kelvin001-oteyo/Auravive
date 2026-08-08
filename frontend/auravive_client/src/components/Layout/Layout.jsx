import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
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
  CreditCardIcon
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
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
        <Link to="/dashboard" className="text-xl font-semibold text-indigo-600">Auravive</Link>
        <Link to="/profile" className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <UserCircleIcon className="w-6 h-6 text-indigo-600" />
        </Link>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">Auravive</Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {mainNavigation.map((item) => (
                <li key={item.name}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${({ isActive }) => isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t border-gray-200"></div>
            <div className="space-y-1">
              <Link to="/profile" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <UserCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
                <span className="font-medium">Profile</span>
              </Link>
              {user?.plan_type === 'free' && (
                <Link to="/pricing" className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 hover:from-amber-100 hover:to-amber-200">
                  <CreditCardIcon className="w-5 h-5 mr-3 text-amber-500" />
                  <span className="font-medium">Upgrade to Premium</span>
                </Link>
              )}
            </div>
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <UserCircleIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name || user?.username || 'User'}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${user?.plan_type === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                  {user?.plan_type === 'premium' ? '🌟 Premium' : 'Free Plan'}
                </span>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 flex-1 min-h-screen flex flex-col">
        <div className="pt-16 lg:pt-0 flex-1">
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;