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
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileContainer = styled(Box)`
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

const ProfileCard = styled(Paper)`
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

// Mock staff data (in a real app, this would come from an API)
const staffData = {
  'john-doe': {
    id: 'john-doe',
    name: 'John Doe',
    role: 'Technician',
    department: 'Solar Panel Maintenance',
    email: 'john.doe@solbot.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 15, 2023',
    location: 'San Francisco, CA',
    bio: 'John is an experienced technician specializing in solar panel maintenance and repair. He has over 5 years of experience in the renewable energy sector.',
    skills: ['Solar Panel Installation', 'Maintenance', 'Troubleshooting', 'Electrical Systems'],
    projects: [
      { name: 'Downtown Solar Array Maintenance', status: 'Completed' },
      { name: 'Residential Installation Project', status: 'In Progress' },
    ],
  },
  'jane-smith': {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'Engineer',
    department: 'System Design',
    email: 'jane.smith@solbot.com',
    phone: '+1 (555) 987-6543',
    joinDate: 'March 3, 2022',
    location: 'Boston, MA',
    bio: 'Jane is a senior engineer with expertise in designing efficient solar energy systems. She has a background in electrical engineering and renewable energy technologies.',
    skills: ['System Design', 'Electrical Engineering', 'Project Management', 'CAD Software'],
    projects: [
      { name: 'Commercial Building Energy System', status: 'Completed' },
      { name: 'Smart Grid Integration', status: 'Planning' },
    ],
  },
  'robert-johnson': {
    id: 'robert-johnson',
    name: 'Robert Johnson',
    role: 'Technician',
    department: 'Robot Maintenance',
    email: 'robert.johnson@solbot.com',
    phone: '+1 (555) 456-7890',
    joinDate: 'June 12, 2023',
    location: 'Chicago, IL',
    bio: 'Robert specializes in maintaining and repairing the robotic systems used for solar panel cleaning and inspection. He has a background in robotics and automation.',
    skills: ['Robotics', 'Automation', 'Mechanical Repair', 'Programming'],
    projects: [
      { name: 'Automated Cleaning System Deployment', status: 'Completed' },
      { name: 'Inspection Drone Maintenance', status: 'In Progress' },
    ],
  },
};

const StaffProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Get staff data based on ID (with fallback)
  const staff = staffData[id] || staffData['john-doe'];
  
  return (
    <ProfileContainer>
      <Sidebar />
      <MainContent ismobile={isMobile}>
        <Header ismobile={isMobile}>
          {isMobile && (
            <MobileMenuButton>
              <MenuIcon />
            </MobileMenuButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              sx={{ mr: 1 }}
              onClick={() => navigate('/staff-management')}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Staff Profile</Typography>
          </Box>
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

        {/* Profile Header */}
        <ProfileCard elevation={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 150, 
                  height: 150, 
                  bgcolor: '#000080',
                  fontSize: '4rem',
                  mb: 2
                }}
              >
                {staff.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight="bold" align="center">
                {staff.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" align="center">
                {staff.role} • {staff.department}
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2, bgcolor: '#000080' }}
                fullWidth={isMobile}
              >
                Send Message
              </Button>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {staff.bio}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email"
                        secondary={staff.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone"
                        secondary={staff.phone}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DateRangeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Join Date"
                        secondary={staff.joinDate}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Location"
                        secondary={staff.location}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ProfileCard>
        
        {/* Skills Section */}
        <ProfileCard elevation={1}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Skills & Expertise
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {staff.skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                sx={{ 
                  bgcolor: '#000080', 
                  color: 'white',
                  '&:hover': { bgcolor: '#000060' }
                }} 
              />
            ))}
          </Box>
        </ProfileCard>
        
        {/* Projects Section */}
        <ProfileCard elevation={1}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Current Projects
          </Typography>
          <List>
            {staff.projects.map((project, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider component="li" />}
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={project.name}
                    secondary={`Status: ${project.status}`}
                  />
                  <Chip 
                    label={project.status} 
                    color={project.status === 'Completed' ? 'success' : 
                           project.status === 'In Progress' ? 'primary' : 'default'}
                    size="small"
                    variant="outlined"
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </ProfileCard>
      </MainContent>
    </ProfileContainer>
  );
};

export default StaffProfile;
