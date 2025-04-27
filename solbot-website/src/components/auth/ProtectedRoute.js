import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

/**
 * ProtectedRoute component that checks if user is authenticated
 * Redirects to login page if not authenticated
 */
const ProtectedRoute = () => {
  const isAuth = isAuthenticated();
  
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
