import React from 'react';
import { Link } from 'react-router-dom';

const EmergencyFooter = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🆘</span>
          <span className="font-medium">Need immediate help?</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 sm:mt-0">
          <a
            href="tel:988"
            className="px-4 py-1.5 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-xs"
          >
            📞 Suicide Prevention: 988
          </a>
          <a
            href="tel:18002738255"
            className="px-4 py-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-xs"
          >
            📞 Crisis Text: 741741
          </a>
          <Link
            to="/get-help"
            className="px-4 py-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-xs"
          >
            Find Help Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFooter;