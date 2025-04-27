import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = 'http://localhost:5000/api/staff';

// Get all staff with optional filters
export const getStaff = async (page = 1, limit = 10, filters = {}) => {
  try {
    let url = `${API_URL}?page=${page}&limit=${limit}`;
    
    // Add search query if provided
    if (filters.search) {
      url += `&search=${filters.search}`;
    }
    
    // Add department filter if provided
    if (filters.department) {
      url += `&department=${filters.department}`;
    }
    
    // Add status filter if provided
    if (filters.status) {
      url += `&status=${filters.status}`;
    }
    
    // Add role filter if provided
    if (filters.role) {
      url += `&role=${filters.role}`;
    }
    
    const response = await axios.get(url, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Get single staff member
export const getStaffMember = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Create new staff member
export const createStaffMember = async (staffData) => {
  try {
    const response = await axios.post(API_URL, staffData, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Update staff member
export const updateStaffMember = async (id, staffData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, staffData, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Delete staff member
export const deleteStaffMember = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Add assignment to staff member
export const addAssignment = async (staffId, assignmentData) => {
  try {
    const response = await axios.post(`${API_URL}/${staffId}/assignments`, assignmentData, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Update assignment
export const updateAssignment = async (staffId, assignmentId, assignmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${staffId}/assignments/${assignmentId}`, assignmentData, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Remove assignment from staff member
export const removeAssignment = async (staffId, assignmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${staffId}/assignments/${assignmentId}`, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Get staff statistics
export const getStaffStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: getAuthHeader()
    });
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};
