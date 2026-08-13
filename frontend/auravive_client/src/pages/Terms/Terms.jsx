import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: August 13, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            Welcome to Auravive. By using our platform, you agree to these Terms of Service. 
            Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By creating an account and using Auravive, you agree to be bound by these Terms of Service 
            and our Privacy Policy. If you do not agree, please do not use our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Description of Service</h2>
          <p className="text-gray-600">
            Auravive provides a mental wellness platform including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>AI-powered emotional wellness support</li>
            <li>Personal journaling and mood tracking</li>
            <li>Mindfulness activities and meditation</li>
            <li>Educational resources and courses</li>
            <li>Community support and discussion forums</li>
            <li>Access to professional mental health resources</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. User Accounts</h2>
          <p className="text-gray-600">
            To use our services, you must create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Providing accurate and complete information</li>
            <li>Maintaining the security of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. User Conduct</h2>
          <p className="text-gray-600">You agree to use Auravive responsibly and not to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Post harmful, abusive, or inappropriate content</li>
            <li>Harass, intimidate, or threaten others</li>
            <li>Impersonate others or provide false information</li>
            <li>Share personal information of others without consent</li>
            <li>Use the platform for illegal activities</li>
            <li>Attempt to breach security measures</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Privacy and Data</h2>
          <p className="text-gray-600">
            Your privacy is important to us. Please review our{' '}
            <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">
              Privacy Policy
            </Link>
            {' '}to understand how we collect, use, and protect your data.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Subscription and Payments</h2>
          <p className="text-gray-600">
            Auravive offers both free and premium subscription plans:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Free plan provides basic features</li>
            <li>Premium plan offers additional features and content</li>
            <li>Subscriptions auto-renew unless cancelled</li>
            <li>You can cancel anytime from your account settings</li>
            <li>Refunds are subject to our refund policy</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Content Ownership</h2>
          <p className="text-gray-600">
            You retain ownership of content you create on Auravive. By posting, you grant us a license to 
            display and distribute your content as needed to provide our services. You agree not to post 
            content that infringes on others' rights.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-3">
            <p className="text-yellow-700 text-sm">
              ⚠️ If you're in crisis, please call emergency services at 911 or the 
              Suicide Prevention Lifeline at 988. Auravive is not a crisis service.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Contact Information</h2>
          <p className="text-gray-600">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-2">
            <p className="text-gray-600 text-sm">
              <strong>Email:</strong> legal@auravive.com<br />
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
                to="/privacy"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
