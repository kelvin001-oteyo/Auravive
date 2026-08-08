import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Layout
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Pricing from './pages/Pricing/Pricing';
import Dashboard from './pages/Dashboard/Dashboard';
import AIChat from './pages/AIChat/AIChat';
import Journey from './pages/Journey/Journey';
import MoodTracking from './pages/MoodTracking/MoodTracking';
import Mindfulness from './pages/Mindfulness/Mindfulness';
import Resources from './pages/Resources/Resources';
import Courses from './pages/Courses/Courses';
import Community from './pages/Community/Community';
import GetHelp from './pages/GetHelp/GetHelp';
import AnimatedPage from './components/Animations/AnimatedPage';

// Wrapper component for animated routes
const AnimatedRoute = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <AnimatedPage key={location.pathname}>
        {children}
      </AnimatedPage>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/login" element={
            <AnimatedRoute>
              <Login />
            </AnimatedRoute>
          } />
          <Route path="/register" element={
            <AnimatedRoute>
              <Register />
            </AnimatedRoute>
          } />
          <Route path="/forgot-password" element={
            <AnimatedRoute>
              <ForgotPassword />
            </AnimatedRoute>
          } />
          <Route path="/pricing" element={
            <AnimatedRoute>
              <Pricing />
            </AnimatedRoute>
          } />
          <Route path="/about" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/services" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/faq" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/contact" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/donate" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/privacy" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/terms" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
          <Route path="/cookies" element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          } />
        </Route>
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={
              <AnimatedRoute>
                <Dashboard />
              </AnimatedRoute>
            } />
            <Route path="/profile" element={
              <AnimatedRoute>
                <Profile />
              </AnimatedRoute>
            } />
            <Route path="/ai-companion" element={
              <AnimatedRoute>
                <AIChat />
              </AnimatedRoute>
            } />
            <Route path="/journey" element={
              <AnimatedRoute>
                <Journey />
              </AnimatedRoute>
            } />
            <Route path="/mood-tracking" element={
              <AnimatedRoute>
                <MoodTracking />
              </AnimatedRoute>
            } />
            <Route path="/mindfulness" element={
              <AnimatedRoute>
                <Mindfulness />
              </AnimatedRoute>
            } />
            <Route path="/resources" element={
              <AnimatedRoute>
                <Resources />
              </AnimatedRoute>
            } />
            <Route path="/courses" element={
              <AnimatedRoute>
                <Courses />
              </AnimatedRoute>
            } />
            <Route path="/community" element={
              <AnimatedRoute>
                <Community />
              </AnimatedRoute>
            } />
            <Route path="/get-help" element={
              <AnimatedRoute>
                <GetHelp />
              </AnimatedRoute>
            } />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;