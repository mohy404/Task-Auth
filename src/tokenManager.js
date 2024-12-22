export const TokenManager = {
    getToken: () => localStorage.getItem('auth_token'),
    setToken: (token) => localStorage.setItem('auth_token', token),
    removeToken: () => localStorage.removeItem('auth_token'),
    isAuthenticated: () => !!localStorage.getItem('auth_token')
  };
  