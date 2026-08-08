import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login/', { email, password });
    const { access, refresh, user } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, access, refresh };
  },

  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile/', data);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
};

export default authService;