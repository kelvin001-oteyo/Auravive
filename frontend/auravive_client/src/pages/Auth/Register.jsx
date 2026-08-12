import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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
        
        {/* Protected Routes */}
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
    </Router>
  );
}

export default App;
