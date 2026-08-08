import React, { useState, useEffect } from 'react';
import getHelpService from '../../services/getHelpService';
import toast from 'react-hot-toast';
import {
  LifebuoyIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowPathIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  HomeIcon,
  ScaleIcon,
  BookOpenIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const CATEGORIES = [
  { id: 'disability', label: 'Disability Services', icon: '♿', color: 'bg-blue-100 text-blue-700' },
  { id: 'gbv', label: 'Gender-Based Violence Support', icon: '🛡️', color: 'bg-pink-100 text-pink-700' },
  { id: 'fgm', label: 'Female Genital Mutilation Support', icon: '⚕️', color: 'bg-purple-100 text-purple-700' },
  { id: 'child_protection', label: 'Child Protection Services', icon: '👶', color: 'bg-green-100 text-green-700' },
  { id: 'mental_health', label: 'Mental Health Support', icon: '🧠', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'crisis_intervention', label: 'Crisis Intervention Programs', icon: '🚨', color: 'bg-red-100 text-red-700' },
  { id: 'addiction_recovery', label: 'Addiction Recovery Services', icon: '💪', color: 'bg-orange-100 text-orange-700' },
  { id: 'legal_aid', label: 'Legal Aid', icon: '⚖️', color: 'bg-gray-100 text-gray-700' },
  { id: 'safe_houses', label: 'Safe Houses', icon: '🏠', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'counseling', label: 'Counseling Services', icon: '💬', color: 'bg-teal-100 text-teal-700' },
];

const GetHelp = () => {
  const [services, setServices] = useState([]);
  const [hotlines, setHotlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, hotlinesRes] = await Promise.all([
        getHelpService.getServices({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          search: searchTerm || undefined,
        }),
        getHelpService.getHotlines(),
      ]);

      setServices(servicesRes.results || servicesRes);
      setHotlines(hotlinesRes.results || hotlinesRes);
    } catch (error) {
      toast.error('Failed to load help services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ArrowPathIcon className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Get Help</h1>
        <p className="text-gray-500">Find help & connect with organizations</p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <PhoneIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Need Immediate Help?</h2>
            <p className="text-red-100">
              If you're in crisis or need immediate assistance, please call a helpline.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="tel:911"
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
              >
                🚨 Emergency: 911
              </a>
              <a
                href="tel:988"
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                📞 Suicide Prevention: 988
              </a>
              <a
                href="tel:18002738255"
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                📞 Crisis Text Line: 741741
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for services, organizations, or keywords..."
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Services
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Hotlines Section */}
      {hotlines.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PhoneIcon className="w-5 h-5 mr-2 text-indigo-600" />
            Immediate Support Hotlines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotlines.map((hotline) => (
              <div key={hotline.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-medium text-gray-900">{hotline.name}</h4>
                <p className="text-sm text-gray-600">{hotline.description}</p>
                <a
                  href={`tel:${hotline.phone}`}
                  className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  {hotline.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <LifebuoyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default GetHelp;

// Service Card Component
const ServiceCard = ({ service, onClick }) => {
  const category = CATEGORIES.find(c => c.id === service.category);
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full ${category?.color || 'bg-gray-100 text-gray-700'} flex items-center justify-center text-2xl`}>
            {category?.icon || '🤝'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.category_name}</p>
          </div>
        </div>
        {service.verified && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPinIcon className="w-4 h-4" />
          <span>{service.location || 'Multiple locations'}</span>
        </div>
        {service.phone && (
          <a
            href={`tel:${service.phone}`}
            className="text-indigo-600 hover:text-indigo-700"
            onClick={(e) => e.stopPropagation()}
          >
            <PhoneIcon className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

// Service Detail Modal
const ServiceDetail = ({ service, onClose }) => {
  const category = CATEGORIES.find(c => c.id === service.category);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-14 h-14 rounded-full ${category?.color || 'bg-gray-100 text-gray-700'} flex items-center justify-center text-3xl`}>
                {category?.icon || '🤝'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
                <p className="text-gray-500">{service.category_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">About</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {service.address && (
              <div>
                <h4 className="font-medium text-gray-900">📍 Address</h4>
                <p className="text-gray-600">{service.address}</p>
              </div>
            )}

            {service.website && (
              <div>
                <h4 className="font-medium text-gray-900">🌐 Website</h4>
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {service.website}
                </a>
              </div>
            )}

            {service.phone && (
              <div>
                <h4 className="font-medium text-gray-900">📞 Phone</h4>
                <a href={`tel:${service.phone}`} className="text-indigo-600 hover:text-indigo-700">
                  {service.phone}
                </a>
              </div>
            )}

            {service.email && (
              <div>
                <h4 className="font-medium text-gray-900">📧 Email</h4>
                <a href={`mailto:${service.email}`} className="text-indigo-600 hover:text-indigo-700">
                  {service.email}
                </a>
              </div>
            )}

            {service.hours && (
              <div>
                <h4 className="font-medium text-gray-900">🕐 Hours</h4>
                <p className="text-gray-600">{service.hours}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {service.phone && (
                <a
                  href={`tel:${service.phone}`}
                  className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 inline mr-2" />
                  Call Now
                </a>
              )}
              {service.website && (
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <GlobeAltIcon className="w-4 h-4 inline mr-2" />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};