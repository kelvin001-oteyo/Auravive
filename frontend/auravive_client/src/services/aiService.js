import api from './api';

export const aiService = {
  sendMessage: async (message, sessionId = null) => {
    const response = await api.post('/ai/chat/', {
      message,
      session_id: sessionId,
    });
    return response.data;
  },

  getSessions: async () => {
    const response = await api.get('/ai/sessions/');
    return response.data;
  },

  getSessionMessages: async (sessionId) => {
    const response = await api.get(`/ai/sessions/${sessionId}/messages/`);
    return response.data;
  },

  createSession: async () => {
    const response = await api.post('/ai/sessions/');
    return response.data;
  },

  deleteSession: async (sessionId) => {
    const response = await api.delete(`/ai/sessions/${sessionId}/`);
    return response.data;
  },

  bookPsychologist: async (data) => {
    const response = await api.post('/ai/book-psychologist/', data);
    return response.data;
  },

  getPsychologists: async () => {
    const response = await api.get('/psychologists/');
    return response.data;
  },
};

export default aiService;