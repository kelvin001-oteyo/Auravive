import api from './api';

export const getHelpService = {
  getServices: async (params = {}) => {
    const response = await api.get('/help-services/', { params });
    return response.data;
  },

  getServiceCategories: async () => {
    const response = await api.get('/help-service-categories/');
    return response.data;
  },

  searchServices: async (query) => {
    const response = await api.get('/help-services/', { params: { search: query } });
    return response.data;
  },

  getNearbyServices: async (lat, lng, radius = 10) => {
    const response = await api.get('/help-services/nearby/', { 
      params: { lat, lng, radius } 
    });
    return response.data;
  },

  getHotlines: async () => {
    const response = await api.get('/help-hotlines/');
    return response.data;
  },
};

export default getHelpService;