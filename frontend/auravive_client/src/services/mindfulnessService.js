import api from './api';

export const mindfulnessService = {
  // Activities
  getActivities: async (params = {}) => {
    const response = await api.get('/mindfulness/', { params });
    return response.data;
  },

  getActivity: async (id) => {
    const response = await api.get(`/mindfulness/${id}/`);
    return response.data;
  },

  // Sessions
  startSession: async (data) => {
    const response = await api.post('/mindfulness-sessions/', data);
    return response.data;
  },

  completeSession: async (id, data) => {
    const response = await api.put(`/mindfulness-sessions/${id}/`, data);
    return response.data;
  },

  getSessions: async () => {
    const response = await api.get('/mindfulness-sessions/');
    return response.data;
  },

  // Trainers
  getTrainers: async () => {
    const response = await api.get('/trainers/');
    return response.data;
  },

  bookTrainer: async (data) => {
    const response = await api.post('/trainer-bookings/', data);
    return response.data;
  },
};

export default mindfulnessService;