import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Community Guidelines', path: '/community-guidelines' },
    ],
    resources: [
      { name: 'Mental Health Guides', path: '/resources?category=guides' },
      { name: 'Crisis Support', path: '/get-help' },
      { name: 'Support Circles', path: '/community' },
      { name: 'Blog', path: '/blog' },
      { name: 'Wellness Tips', path: '/mindfulness' },
    ],
    features: [
      { name: 'AI Companion', path: '/ai-companion' },
      { name: 'Mood Tracking', path: '/mood-tracking' },
      { name: 'Online Courses', path: '/courses' },
      { name: 'Community', path: '/community' },
      { name: 'Get Help', path: '/get-help' },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold gradient-text">
              Auravive
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Your companion for mental wellness, mindfulness, and personal growth.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Features
            </h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm text-slate-400">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-l-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-r-xl hover:from-indigo-700 hover:to-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            © {currentYear} Auravive. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
              Cookies
            </Link>
            <Link to="/accessibility" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>

        {/* Crisis Support Banner */}
        <div className="mt-6 p-4 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-xl border border-rose-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-slate-300">
              <span className="text-lg">🆘</span>
              <span className="font-medium">Need immediate help?</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 sm:mt-0">
              <a
                href="tel:988"
                className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-orange-600 text-white rounded-lg font-medium hover:from-rose-700 hover:to-orange-700 transition-colors text-xs"
              >
                📞 Suicide Prevention: 988
              </a>
              <a
                href="tel:18002738255"
                className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-xs border border-slate-700"
              >
                📞 Crisis Text: 741741
              </a>
              <Link
                to="/get-help"
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs"
              >
                Find Help Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
