import api from './api';

export const communityService = {
  // Posts
  getPosts: async (params = {}) => {
    const response = await api.get('/posts/', { params });
    return response.data;
  },

  getPost: async (id) => {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
  },

  createPost: async (data) => {
    const response = await api.post('/posts/', data);
    return response.data;
  },

  updatePost: async (id, data) => {
    const response = await api.put(`/posts/${id}/`, data);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}/`);
    return response.data;
  },

  likePost: async (id) => {
    const response = await api.post(`/posts/${id}/like/`);
    return response.data;
  },

  commentOnPost: async (id, content) => {
    const response = await api.post(`/posts/${id}/comment/`, { content });
    return response.data;
  },

  // Support Circles
  getCircles: async (params = {}) => {
    const response = await api.get('/circles/', { params });
    return response.data;
  },

  joinCircle: async (id) => {
    const response = await api.post(`/circles/${id}/join/`);
    return response.data;
  },

  leaveCircle: async (id) => {
    const response = await api.post(`/circles/${id}/leave/`);
    return response.data;
  },

  // Live Chat (WebSocket will be handled separately)
};

export default communityService;