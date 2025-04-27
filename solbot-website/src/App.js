import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import SupervisionPage from './components/supervision/SupervisionPage';
import MapLocationPage from './components/map/MapLocationPage';
import AnomalyDetectionPage from './components/anomalies/AnomalyDetectionPage';
import ReportsPage from './components/reports/ReportsPage';
import StaffManagement from './components/staff/StaffManagement';
import StaffProfile from './components/staff/StaffProfile';
import SettingsPage from './components/settings/SettingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { isAuthenticated } from './services/authService';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/supervision" element={<SupervisionPage />} />
            <Route path="/map" element={<MapLocationPage />} />
            <Route path="/anomalies" element={<AnomalyDetectionPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/staff-management" element={<StaffManagement />} />
            <Route path="/staff-profile/:id" element={<StaffProfile />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
