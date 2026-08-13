import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: August 13, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            At Auravive, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Information We Collect</h2>
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">1.1 Personal Information</h3>
          <p className="text-gray-600">When you create an account, we collect:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Name (first and last)</li>
            <li>Email address</li>
            <li>Username</li>
            <li>Password (encrypted)</li>
            <li>Profile picture (optional)</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">1.2 Wellness Data</h3>
          <p className="text-gray-600">We collect data you voluntarily provide:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Journal entries and mood tracking</li>
            <li>Mindfulness session data</li>
            <li>Course progress and learning data</li>
            <li>Community posts and interactions</li>
            <li>AI Companion conversations</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600">Your information helps us:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Send important notifications</li>
            <li>Analyze usage and improve features</li>
            <li>Provide AI-powered support</li>
            <li>Ensure platform security</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Data Security</h2>
          <p className="text-gray-600">We protect your data with:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>256-bit SSL/TLS encryption</li>
            <li>Secure password hashing</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We never sell your personal data to third parties.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Your Rights</h2>
          <p className="text-gray-600">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2">
            <p className="text-gray-600 text-sm">
              <strong>Email:</strong> privacy@auravive.com<br />
              <strong>Address:</strong> San Francisco, CA, USA
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Back to Home
              </Link>
              <Link
                to="/terms"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
