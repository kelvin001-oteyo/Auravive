import api from './api';

export const coursesService = {
  getCourses: async (params = {}) => {
    const response = await api.get('/courses/', { params });
    return response.data;
  },

  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}/`);
    return response.data;
  },

  enrollCourse: async (id) => {
    const response = await api.post(`/courses/${id}/enroll/`);
    return response.data;
  },

  unenrollCourse: async (id) => {
    const response = await api.post(`/courses/${id}/unenroll/`);
    return response.data;
  },

  getEnrolledCourses: async () => {
    const response = await api.get('/courses/enrolled/');
    return response.data;
  },

  getCourseProgress: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/progress/`);
    return response.data;
  },

  updateLessonProgress: async (courseId, lessonId, data) => {
    const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/progress/`, data);
    return response.data;
  },
};

export default coursesService;