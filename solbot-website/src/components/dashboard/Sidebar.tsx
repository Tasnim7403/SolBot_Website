import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocationOn as LocationIcon,
  Visibility as SupervisionIcon,
  Error as AnomalyIcon,
  Description as ReportsIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import solbotLogo from '../../assets/images/solbot-logo.png';
import { logout } from '../../services/authService';

const SidebarContainer = styled(Box)<{ ismobile?: boolean }>((props) => ({
  width: '240px',
  height: '100vh',
  backgroundColor: '#000080',
  color: 'white',
  position: 'fixed',
  left: 0,
  top: 0,
  padding: '20px',
  overflowY: 'auto',
  zIndex: 1200,
  transition: 'transform 0.3s ease',
  display: props.ismobile ? 'none' : 'block',
}));



const Logo = styled.img`
  width: 40px;
  height: auto;
  margin-right: 10px;
`;

const StyledListItem = styled(ListItem)<{ active?: boolean }>`
  border-radius: 8px;
  margin-bottom: 4px;
  cursor: pointer;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MobileMenuButton = styled(IconButton)`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1100;
  background-color: #000080;
  color: white;
  &:hover {
    background-color: #000080;
    opacity: 0.9;
  }
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Map/Location', icon: <LocationIcon />, path: '/map' },
  { text: 'Supervision', icon: <SupervisionIcon />, path: '/supervision' },
  { text: 'Anomaly Detection History', icon: <AnomalyIcon />, path: '/anomalies' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Staff Management', icon: <PeopleIcon />, path: '/staff-management' },
];

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [loading, setLoading] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setLogoutDialogOpen(false);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarContent = (
    <>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            p: 1,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            placeholder="Search..."
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
              color: 'white',
            }}
          />
        </Box>
      </Box>

      <List>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.text}
            active={currentPath === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      <Box sx={{ position: 'absolute', bottom: 20, width: 'calc(100% - 40px)' }}>
        <StyledListItem onClick={() => handleNavigation('/settings')}>
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledListItem>
        <StyledListItem onClick={() => setLogoutDialogOpen(true)}>
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : <SignOutIcon />}
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledListItem>
      </Box>
    </>
  );

  return (
    <>
      {isMobile && (
        <MobileMenuButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: mobileOpen ? 'none' : 'flex' }}
        >
          <MenuIcon />
        </MobileMenuButton>
      )}

      <SidebarContainer ismobile={isMobile}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Logo src={solbotLogo} alt="SolBot Logo" />
          <Typography variant="h6" component="span">
            SolBot
          </Typography>
        </Box>
        
        {sidebarContent}
        
        <Dialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          aria-labelledby="logout-dialog-title"
        >
          <DialogTitle id="logout-dialog-title">Sign Out</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleLogout} 
              color="primary" 
              autoFocus
              variant="contained"
            >
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
      </SidebarContainer>

      <Drawer
        variant="temporary"
        open={isMobile && mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#000080',
            color: 'white',
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo src={solbotLogo} alt="SolBot Logo" />
            <Typography variant="h6" component="span">
              SolBot
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;