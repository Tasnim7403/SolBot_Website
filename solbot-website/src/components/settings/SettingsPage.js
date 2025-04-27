import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  IconButton,
  Badge
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  PhotoCamera as PhotoCameraIcon,
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { getUserProfile, updateUserProfile, updatePassword } from '../../services/authService';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const SettingsContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: ${props => props.ismobile ? '16px' : '24px'};
  margin-left: ${props => props.ismobile ? '0' : '240px'};
  transition: margin-left 0.3s ease;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => props.ismobile ? 'wrap' : 'nowrap'};
  gap: ${props => props.ismobile ? '16px' : '0'};
  margin-bottom: 24px;
`;

const SearchBar = styled(Paper)`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: ${props => props.ismobile ? '100%' : '300px'};
  border-radius: 20px;
  background-color: white;
  margin-right: ${props => props.ismobile ? '0' : '16px'};
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const StyledContainer = styled(Box)`
  padding: 24px;
  padding-bottom: 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: calc(100vh - 64px);
`;

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  background-color: #000080;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const SettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    role: '',
    profileImage: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true);
        const response = await getUserProfile();
        setUserProfile({
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || 'user',
          profileImage: response.data.profileImage || ''
        });
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setSnackbar({
          open: true,
          message: 'Failed to load user profile',
          severity: 'error'
        });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!userProfile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userProfile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userProfile.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await updateUserProfile({
        name: userProfile.name,
        email: userProfile.email
      });
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to update profile:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setSnackbar({
        open: true,
        message: 'Password updated successfully',
        severity: 'success'
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Failed to update password:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to update password',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <SettingsContainer>
      <Sidebar />
      <MainContent ismobile={isMobile}>
        <Header ismobile={isMobile}>
          {isMobile && (
            <MobileMenuButton>
              <MenuIcon />
            </MobileMenuButton>
          )}
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Settings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
            <SearchBar elevation={0} ismobile={isMobile}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <input
                placeholder="Search..."
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  background: 'transparent',
                  fontSize: isMobile ? '14px' : '16px',
                }}
              />
            </SearchBar>
            <IconButton>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                Hello, Admin
              </Typography>
              <Avatar />
            </Box>
          </Box>
        </Header>
        <StyledContainer>
      
      
      
      <StyledPaper>
        {profileLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant={isMobile ? "fullWidth" : "standard"}
              >
                <Tab 
                  icon={<PersonIcon />} 
                  label="Profile Settings" 
                  id="settings-tab-0"
                  aria-controls="settings-tabpanel-0"
                />
                <Tab 
                  icon={<SecurityIcon />} 
                  label="Credentials" 
                  id="settings-tab-1"
                  aria-controls="settings-tabpanel-1"
                />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <StyledAvatar 
                  src={userProfile.profileImage} 
                  alt={userProfile.name}
                >
                  {userProfile.name.charAt(0)}
                </StyledAvatar>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  size="small"
                >
                  Change Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      // In a real app, you would upload this to a server
                      // For now, we'll just update the state with a placeholder
                      if (e.target.files && e.target.files[0]) {
                        setUserProfile(prev => ({
                          ...prev,
                          profileImage: URL.createObjectURL(e.target.files[0])
                        }));
                      }
                    }}
                  />
                </Button>
              </Box>
              
              <form onSubmit={handleProfileUpdate}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Full Name"
                      value={userProfile.name}
                      onChange={handleProfileChange}
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      value={userProfile.email}
                      onChange={handleProfileChange}
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="role"
                      label="Role"
                      value={userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                      fullWidth
                      disabled
                      helperText="Your role cannot be changed"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <form onSubmit={handlePasswordUpdate}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="newPassword"
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
          </>
        )}
      </StyledPaper>
      
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
        </StyledContainer>
      </MainContent>
    </SettingsContainer>
  );
};

export default SettingsPage;
