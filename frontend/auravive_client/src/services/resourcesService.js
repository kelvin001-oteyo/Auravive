import api from './api';

export const resourcesService = {
  getResources: async (params = {}) => {
    const response = await api.get('/resources/', { params });
    return response.data;
  },

  getResource: async (id) => {
    const response = await api.get(`/resources/${id}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/resource-categories/');
    return response.data;
  },

  likeResource: async (id) => {
    const response = await api.post(`/resources/${id}/like/`);
    return response.data;
  },

  searchResources: async (query) => {
    const response = await api.get('/resources/', { params: { search: query } });
    return response.data;
  },
};

export default resourcesService;