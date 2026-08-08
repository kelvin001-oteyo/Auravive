import api from './api';

export const journeyService = {
  getEntries: async (params = {}) => {
    const response = await api.get('/journals/', { params });
    return response.data;
  },

  getEntry: async (id) => {
    const response = await api.get(`/journals/${id}/`);
    return response.data;
  },

  createEntry: async (data) => {
    const response = await api.post('/journals/', data);
    return response.data;
  },

  updateEntry: async (id, data) => {
    const response = await api.put(`/journals/${id}/`, data);
    return response.data;
  },

  deleteEntry: async (id) => {
    const response = await api.delete(`/journals/${id}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/journals/categories/');
    return response.data;
  },

  getGoals: async (params = {}) => {
    const response = await api.get('/goals/', { params });
    return response.data;
  },

  createGoal: async (data) => {
    const response = await api.post('/goals/', data);
    return response.data;
  },

  updateGoal: async (id, data) => {
    const response = await api.put(`/goals/${id}/`, data);
    return response.data;
  },

  deleteGoal: async (id) => {
    const response = await api.delete(`/goals/${id}/`);
    return response.data;
  },

  markGoalComplete: async (id) => {
    const response = await api.post(`/goals/${id}/mark_complete/`);
    return response.data;
  },

  updateGoalProgress: async (id, data) => {
    const response = await api.post(`/goals/${id}/progress/`, data);
    return response.data;
  },
};

export default journeyService;