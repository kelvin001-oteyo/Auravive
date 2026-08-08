import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Start your wellness journey',
      features: [
        { included: true, text: 'Basic mood tracking' },
        { included: true, text: 'Daily journal entries' },
        { included: true, text: 'Community access' },
        { included: true, text: 'Basic resources' },
        { included: true, text: 'AI Companion (limited)' },
        { included: false, text: 'Premium courses' },
        { included: false, text: 'Advanced analytics' },
        { included: false, text: 'Priority support' },
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      description: 'Full access to everything',
      features: [
        { included: true, text: 'Unlimited mood tracking' },
        { included: true, text: 'Unlimited journal entries' },
        { included: true, text: 'Community access' },
        { included: true, text: 'All resources' },
        { included: true, text: 'Full AI Companion' },
        { included: true, text: 'All premium courses' },
        { included: true, text: 'Advanced analytics' },
        { included: true, text: 'Priority support' },
        { included: true, text: 'Book psychologist sessions' },
        { included: true, text: 'Book trainer sessions' },
      ],
      buttonText: 'Upgrade Now',
      buttonVariant: 'primary',
      popular: true,
    },
    {
      name: 'Annual',
      price: '$99.99',
      period: '/year',
      description: 'Best value - save 17%',
      features: [
        { included: true, text: 'All Premium features' },
        { included: true, text: '2 months free' },
        { included: true, text: 'Exclusive content' },
        { included: true, text: 'Early access to new features' },
        { included: true, text: 'Special member events' },
      ],
      buttonText: 'Save 17%',
      buttonVariant: 'primary',
      popular: false,
    },
  ];

  const handlePlanSelect = (planName) => {
    if (planName === 'Free') {
      navigate('/register');
    } else {
      navigate('/register', { state: { plan: planName } });
    }
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your wellness journey with the perfect plan for your needs.
            Upgrade anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-indigo-500 transform scale-105 relative'
                  : 'border-transparent hover:border-indigo-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                  ⭐ Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-500 mt-2">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mr-2" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-gray-300 flex-shrink-0 mr-2" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full mt-8 py-3 rounded-lg font-medium transition-colors ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900">Can I cancel anytime?</h4>
              <p className="text-sm text-gray-600">Yes, you can cancel your subscription at any time.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">Yes, start with our free plan and upgrade when ready.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900">What payment methods?</h4>
              <p className="text-sm text-gray-600">We accept all major credit cards and PayPal.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900">Is my data secure?</h4>
              <p className="text-sm text-gray-600">Yes, we use bank-grade encryption for all data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;