import api from './api';

export const dashboardService = {
  getDashboardData: async () => {
    const response = await api.get('/dashboard/');
    return response.data;
  },
  
  getMoodStats: async () => {
    const response = await api.get('/moods/stats/');
    return response.data;
  },
  
  getRecentJournals: async () => {
    const response = await api.get('/journals/?ordering=-entry_date&limit=5');
    return response.data;
  },
  
  getGoals: async () => {
    const response = await api.get('/goals/?status=active');
    return response.data;
  },
  
  getCompletedGoals: async () => {
    const response = await api.get('/goals/?status=completed');
    return response.data;
  },
  
  getMindfulnessSessions: async () => {
    const response = await api.get('/mindfulness/recent/');
    return response.data;
  },
  
  getCommunityActivity: async () => {
    const response = await api.get('/posts/recent/');
    return response.data;
  },
  
  getReminders: async () => {
    const response = await api.get('/reminders/');
    return response.data;
  },
};

export default dashboardService;