import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Logout user
export const logout = async () => {
  try {
    const user = getCurrentUser();
    if (user && user.token) {
      // Make a call to the backend to invalidate the token
      await axios.post(`${API_URL}/logout`, {}, {
        headers: getAuthHeader()
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always remove from localStorage even if the API call fails
    localStorage.removeItem('user');
  }
};

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user && !!user.token;
};

// Get auth header
export const getAuthHeader = () => {
  const user = getCurrentUser();
  
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/me`, userData, {
      headers: getAuthHeader()
    });
    
    // Update local storage with new user data
    const user = getCurrentUser();
    if (user) {
      const updatedUser = {
        ...user,
        name: userData.name,
        email: userData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Update password
export const updatePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};
