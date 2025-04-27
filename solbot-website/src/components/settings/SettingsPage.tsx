import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Avatar,
  Badge,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const SettingsContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled(Box)<{ ismobile?: boolean }>`
  flex-grow: 1;
  padding: ${props => props.ismobile ? '16px' : '24px'};
  margin-left: ${props => props.ismobile ? '0' : '240px'};
  transition: margin-left 0.3s ease;
`;

const Header = styled(Box)<{ ismobile?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => props.ismobile ? 'wrap' : 'nowrap'};
  gap: ${props => props.ismobile ? '16px' : '0'};
  margin-bottom: 24px;
`;

const SearchBar = styled(Paper)<{ ismobile?: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: ${props => props.ismobile ? '100%' : '300px'};
  border-radius: 20px;
  background-color: white;
  margin-right: ${props => props.ismobile ? '0' : '16px'};
`;

const SettingsCard = styled(Paper)<{ ismobile?: boolean }>`
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 24px;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const SettingsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

const [mobileOpen, setMobileOpen] = useState(false);
const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  return (
    <SettingsContainer>
       <Sidebar  mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainContent ismobile={isMobile}>
        <Header ismobile={isMobile}>
          {isMobile && (
            <MobileMenuButton onClick={handleDrawerToggle}>
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

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <SettingsCard elevation={0}>
              <Typography variant="h6" gutterBottom>
                User Profile
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue="Admin User"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue="khoiadjatesnim@gmail.com"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue="+1 (555) 123-4567"
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </SettingsCard>

            <SettingsCard elevation={0}>
              <Typography variant="h6" gutterBottom>
                Security
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Update Password
                  </Button>
                </Box>
              </Box>
            </SettingsCard>
          </Box>

          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <SettingsCard elevation={0}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email Notifications"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="System Alerts"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Maintenance Reminders"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch />}
                    label="Marketing Updates"
                  />
                </Box>
              </Box>
            </SettingsCard>

            <SettingsCard elevation={0}>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Dark Mode"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Automatic Updates"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Data Analytics Collection"
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </Box>
            </SettingsCard>
          </Box>
        </Box>
      </MainContent>
    </SettingsContainer>
  );
};

export default SettingsPage;
