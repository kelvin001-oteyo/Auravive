import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import Layout from './components/Layout/Layout';
import PublicLayout from './components/Layout/PublicLayout';
import PrivateRoute from './components/Auth/PrivateRoute';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Pricing from './pages/Pricing/Pricing';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/Privacy/Privacy';
import Dashboard from './pages/Dashboard/Dashboard';
import AIChat from './pages/AIChat/AIChat';
import Journey from './pages/Journey/Journey';
import MoodTracking from './pages/MoodTracking/MoodTracking';
import Mindfulness from './pages/Mindfulness/Mindfulness';
import Resources from './pages/Resources/Resources';
import Courses from './pages/Courses/Courses';
import Community from './pages/Community/Community';
import GetHelp from './pages/GetHelp/GetHelp';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            },
            success: {
              icon: '🎉',
              style: {
                border: '1px solid rgba(16, 185, 129, 0.3)',
              },
            },
            error: {
              icon: '😢',
              style: {
                border: '1px solid rgba(239, 68, 68, 0.3)',
              },
            },
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            {/* Public Routes - No Auth Required */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<Home />} />
              <Route path="/services" element={<Home />} />
              <Route path="/faq" element={<Home />} />
              <Route path="/contact" element={<Home />} />
              <Route path="/donate" element={<Home />} />
              <Route path="/cookies" element={<Home />} />
            </Route>
            
            {/* Protected Routes - Auth Required */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ai-companion" element={<AIChat />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/mood-tracking" element={<MoodTracking />} />
                <Route path="/mindfulness" element={<Mindfulness />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/community" element={<Community />} />
                <Route path="/get-help" element={<GetHelp />} />
              </Route>
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
