// src/config/api.js
const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://neom-api-qc.task99.site',
    ENDPOINTS: {
      REGISTER: '/api/v1/job-seeker/register'
    },
    HEADERS: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  
  export default API_CONFIG;