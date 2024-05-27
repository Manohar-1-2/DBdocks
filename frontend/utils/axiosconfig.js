
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // Optional: set a timeout of 10 seconds
});

axiosInstance.interceptors.request.use(
    config => {
      // Get the token from localStorage
      const token = localStorage.getItem('access_token');
      if (token) {
        // If token is found, add it to the headers
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
export default axiosInstance;