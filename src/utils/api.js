import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Courses
export const getCourses = (params) => api.get('/courses', { params });
export const getCourse = (id) => api.get(`/courses/${id}`);
export const getVideo = (id) => api.get(`/courses/video/${id}`);

// User
export const getProfile = () => api.get('/user/profile');
export const addToFavorites = (videoId) => api.post(`/user/favorites/${videoId}`);
export const removeFromFavorites = (videoId) => api.delete(`/user/favorites/${videoId}`);
export const updateProgress = (videoId, progress) => api.post(`/user/progress/${videoId}`, { progress });

// Admin
export const createCourse = (courseData) => api.post('/admin/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/admin/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);
export const createVideo = (videoData) => api.post('/admin/videos', videoData);
export const createReels = (reelsData) => api.post('/admin/reels', reelsData);
export const getStats = () => api.get('/admin/stats');

export default api;
