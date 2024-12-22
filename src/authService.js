// src/services/authService.js
import axios from 'axios';
import API_CONFIG from '../src/api';
import { handleApiError } from '../src/errorHandlers';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // Redirect to login page or handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    const formattedErrors = handleApiError(error);
    return {
      success: false,
      errors: formattedErrors
    };
  }
};

export const loginUser = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await apiClient.post('/api/v1/auth/login', formData, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      return {
        success: true,
        data: response.data
      };
    }
    
    return {
      success: false,
      errors: { auth: 'Invalid response from server' }
    };
  } catch (error) {
    const formattedErrors = handleApiError(error);
    return {
      success: false,
      errors: formattedErrors
    };
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.post(
      '/api/v1/job-seeker/profile/basic-information',
      profileData
    );
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    const formattedErrors = handleApiError(error);
    return {
      success: false,
      errors: formattedErrors
    };
  }
};

export const checkAuthStatus = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};