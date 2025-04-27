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

const StaffCard = styled(Paper)<{ ismobile?: boolean }>`
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  height: ${props => props.ismobile ? '140px' : '160px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const StaffManagement: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
const [mobileOpen, setMobileOpen] = useState(false);
const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <StaffContainer>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

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

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <StaffCard elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: '#000080' }} />
                <Typography variant="h6">Current Staff</Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                View and manage your current staff members
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ alignSelf: 'flex-start' }}
              >
                View Staff List
              </Button>
            </StaffCard>
          </Box>

          <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
            <StaffCard elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonAddIcon sx={{ mr: 1, color: '#000080' }} />
                <Typography variant="h6">Add New Staff</Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add new staff members to your organization
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Staff Member
              </Button>
            </StaffCard>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Paper sx={{ flex: 1, p: 3, minWidth: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Staff Members
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No staff members found. Add staff members using the button above.
            </Typography>
          </Paper>
        </Box>
      </MainContent>
    </StaffContainer>
  );
};

export default StaffManagement;
