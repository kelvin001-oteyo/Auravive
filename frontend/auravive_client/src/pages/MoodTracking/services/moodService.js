import api from '../../../services/api';

export const moodService = {
  getMoods: async (params = {}) => {
    const response = await api.get('/moods/', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/moods/stats/');
    return response.data;
  },

  createMood: async (data) => {
    const response = await api.post('/moods/', data);
    return response.data;
  },

  updateMood: async (id, data) => {
    const response = await api.put(`/moods/${id}/`, data);
    return response.data;
  },

  deleteMood: async (id) => {
    const response = await api.delete(`/moods/${id}/`);
    return response.data;
  },
};

export default moodService;