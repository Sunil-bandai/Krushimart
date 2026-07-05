import axios from 'axios';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let activeRequests = 0;

// Request interceptor for adding JWT token
api.interceptors.request.use(
  (config) => {
    activeRequests++;
    useUIStore.getState().setLoading(true);
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useUIStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useUIStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useUIStore.getState().setLoading(false);
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/auth' || currentPath === '/login';
      if (!isAuthPage) {
        useAuthStore.getState().logout();
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
