import React from 'react';
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
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const StaffContainer = styled(Box)`
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

const StaffCard = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const StaffManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  return (
    <StaffContainer>
      <Sidebar />
      <MainContent ismobile={isMobile}>
        <Header ismobile={isMobile}>
          {isMobile && (
            <MobileMenuButton>
              <MenuIcon />
            </MobileMenuButton>
          )}
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Staff Management</Typography>
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Staff Members</Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{ backgroundColor: '#000080' }}
          >
            Add New Staff
          </Button>
        </Box>

        {/* Staff Cards */}
        <StaffCard elevation={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: '#000080' }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                Technician • Solar Panel Maintenance
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={() => navigate('/staff-profile/john-doe')}>View Profile</Button>
        </StaffCard>

        <StaffCard elevation={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: '#000080' }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Jane Smith</Typography>
              <Typography variant="body2" color="text.secondary">
                Engineer • System Design
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={() => navigate('/staff-profile/jane-smith')}>View Profile</Button>
        </StaffCard>

        <StaffCard elevation={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: '#000080' }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Robert Johnson</Typography>
              <Typography variant="body2" color="text.secondary">
                Technician • Robot Maintenance
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={() => navigate('/staff-profile/robert-johnson')}>View Profile</Button>
        </StaffCard>
      </MainContent>
    </StaffContainer>
  );
};

export default StaffManagement;
