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
  Grid as MuiGrid,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Visibility as SupervisionIcon,
  Description as ReportsIcon,
  Menu as MenuIcon,
  TrendingUp as TrendingUpIcon,
  BatteryChargingFull as BatteryIcon,
  Speed as SpeedIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

// Create a typed version of Grid to avoid the TypeScript errors
const Grid = MuiGrid as React.ComponentType<any>;

const DashboardContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
`;

const MainContent = styled(Box)<{ isMobile?: boolean }>`
  flex-grow: 1;
  padding: ${props => props.isMobile ? '16px' : '24px'};
  padding-bottom: ${props => props.isMobile ? '8px' : '12px'};
  margin-left: ${props => props.isMobile ? '0' : '240px'};
  transition: margin-left 0.3s ease;
`;

const Header = styled(Box)<{ isMobile?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: ${props => props.isMobile ? 'wrap' : 'nowrap'};
  gap: ${props => props.isMobile ? '16px' : '0'};
  
  ${props => props.isMobile && `
    .title {
      width: 100%;
      order: 1;
    }
    .actions {
      width: 100%;
      order: 3;
      justify-content: center;
    }
    .user-section {
      width: 100%;
      order: 2;
      justify-content: flex-end;
    }
  `}
`;

const SearchBar = styled(Paper)<{ isMobile?: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: ${props => props.isMobile ? '100%' : '300px'};
  border-radius: 20px;
  background-color: white;
  margin-right: ${props => props.isMobile ? '0' : '16px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const StatusCard = styled(Paper)<{ isMobile?: boolean }>`
  padding: 24px;
  border-radius: 16px;
  background-color: white;
  height: ${props => props.isMobile ? '120px' : '140px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, #000080, #1a237e);
  }
  
  .card-icon {
    position: absolute;
    right: 20px;
    bottom: 20px;
    opacity: 0.1;
    font-size: 40px;
    color: #000080;
  }
`;

const ChartContainer = styled(Paper)<{ isMobile?: boolean }>`
  padding: ${props => props.isMobile ? '16px' : '24px'};
  border-radius: 16px;
  background-color: white;
  margin-top: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${props => props.isMobile ? '16px' : '24px'};
    flex-wrap: ${props => props.isMobile ? 'wrap' : 'nowrap'};
    
    h6 {
      margin-bottom: ${props => props.isMobile ? '8px' : '0'};
      width: ${props => props.isMobile ? '100%' : 'auto'};
    }
  }
`;

const ActionButton = styled(Button)<{ isMobile?: boolean; variant?: string }>`
  border-radius: 30px;
  padding: ${props => props.isMobile ? '8px 16px' : '10px 24px'};
  font-weight: 600;
  text-transform: none;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'contained' ? 'linear-gradient(90deg, #000080 0%, #1a237e 100%)' : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${props => props.variant === 'contained' ? 'linear-gradient(90deg, #1a237e 0%, #000080 100%)' : 'transparent'};
  }
`;

const StatusIndicator = styled.div<{ color?: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color || '#4caf50'};
  margin-right: 8px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background-color: ${props => props.color || '#4caf50'};
    opacity: 0.3;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    70% {
      transform: scale(1.1);
      opacity: 0.2;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }
`;

const MobileMenuButton = styled(IconButton)<{ isMobile?: boolean }>`
  display: ${props => props.isMobile ? 'flex' : 'none'};
  margin-right: 8px;
`;

const mockData = [
  { day: 'Day 1', kw: 100, efficiency: 85 },
  { day: 'Day 2', kw: 200, efficiency: 87 },
  { day: 'Day 3', kw: 300, efficiency: 92 },
  { day: 'Day 4', kw: 200, efficiency: 88 },
  { day: 'Day 5', kw: 400, efficiency: 95 },
  { day: 'Day 6', kw: 300, efficiency: 90 },
  { day: 'Day 7', kw: 350, efficiency: 93 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<HTMLElement | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [timeRange, setTimeRange] = useState('week');
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    handleFilterClose();
  };
  
  const handleStartMonitoring = () => {
    navigate('/supervision');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  return (
    <DashboardContainer>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainContent isMobile={isMobile}>
        <Header isMobile={isMobile}>
          <Box className="title" sx={{ display: 'flex', alignItems: 'center' }}>
            <MobileMenuButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              isMobile={isMobile}
            >
              <MenuIcon />
            </MobileMenuButton>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Dashboard</Typography>
          </Box>
          
          <Box className="user-section" sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchBar elevation={0} isMobile={isMobile}>
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
            <IconButton onClick={handleNotificationClick}>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Box sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ textAlign: 'right' }}>Hello,</Typography>
                <Typography variant="subtitle2" fontWeight="600">Tesnim</Typography>
              </Box>
              <Avatar src="/avatar.jpg" />
            </Box>
          </Box>
        </Header>

        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12} sm={6} md={4}>
            <StatusCard elevation={0} isMobile={isMobile}>
              <Typography color="text.secondary" variant={isMobile ? "body2" : "body1"}>Robot Status</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StatusIndicator color="#4caf50" />
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="600">Active</Typography>
              </Box>
              <TrendingUpIcon className="card-icon" />
            </StatusCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatusCard elevation={0} isMobile={isMobile}>
              <Typography color="text.secondary" variant={isMobile ? "body2" : "body1"}>Robot Battery Level</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <Box sx={{ 
                    height: isMobile ? 6 : 8, 
                    borderRadius: 5, 
                    bgcolor: '#e0e0e0',
                    position: 'relative'
                  }}>
                    <Box sx={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: '85%',
                      borderRadius: 5,
                      background: 'linear-gradient(90deg, #4caf50, #8bc34a)'
                    }} />
                  </Box>
                </Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="600">85%</Typography>
              </Box>
              <BatteryIcon className="card-icon" />
            </StatusCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatusCard elevation={0} isMobile={isMobile}>
              <Typography color="text.secondary" variant={isMobile ? "body2" : "body1"}>Activity</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', height: isMobile ? '40%' : '60%' }}>
                {[15, 25, 20, 30, 25, 35].map((height, index) => {
                  const scaledHeight = isMobile ? height * 0.8 : height;
                  return (
                    <Box
                      key={index}
                      sx={{
                        height: `${scaledHeight}px`,
                        width: isMobile ? '8px' : '12px',
                        backgroundColor: index === 5 ? '#000080' : '#c5cae9',
                        borderRadius: '3px',
                        mx: isMobile ? 0.3 : 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: index === 5 ? '#000080' : '#9fa8da',
                          transform: 'translateY(-3px)'
                        }
                      }}
                    />
                  );
                })}
              </Box>
              <SpeedIcon className="card-icon" />
            </StatusCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <StatusCard elevation={0} isMobile={isMobile}>
              <Typography color="text.secondary" variant={isMobile ? "body2" : "body1"}>Quick Actions</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <ActionButton
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1, flex: 1 }}
                  isMobile={isMobile}
                  onClick={handleStartMonitoring}
                >
                  Start Monitoring
                </ActionButton>
                <ActionButton
                  variant="outlined"
                  color="primary"
                  sx={{ flex: 1 }}
                  isMobile={isMobile}
                  onClick={handleViewReports}
                >
                  View Reports
                </ActionButton>
              </Box>
            </StatusCard>
          </Grid>
        </Grid>

        <ChartContainer elevation={0} isMobile={isMobile}>
          <Box className="chart-header">
            <Typography variant="h6" fontWeight="600">Solar Panel Energy Production Trend</Typography>
            <Box>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                onClick={handleFilterClick}
                endIcon={<FilterIcon />}
              >
                Filter
              </Button>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <LineChart
              data={mockData}
              margin={{ 
                top: 5, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 0 : 20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }} 
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
              />
              <Line
                name="Energy Production (kW)"
                type="monotone"
                dataKey="kw"
                stroke="#000080"
                strokeWidth={2}
                dot={{ r: isMobile ? 4 : 6, strokeWidth: 2 }}
                activeDot={{ r: isMobile ? 6 : 8, strokeWidth: 2 }}
              />
              <Line
                name="Efficiency (%)"
                type="monotone"
                dataKey="efficiency"
                stroke="#4caf50"
                strokeWidth={2}
                dot={{ r: isMobile ? 4 : 6, strokeWidth: 2 }}
                activeDot={{ r: isMobile ? 6 : 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </MainContent>
      
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: '12px', minWidth: '250px' }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="subtitle1" fontWeight="600">Notifications</Typography>
        </Box>
        <MenuItem onClick={handleNotificationClose}>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="500">Robot battery at 25%</Typography>
            <Typography variant="caption" color="text.secondary">10 minutes ago</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="500">New anomaly detected</Typography>
            <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="500">Monitoring started</Typography>
            <Typography variant="caption" color="text.secondary">3 hours ago</Typography>
          </Box>
        </MenuItem>
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Button variant="text" size="small" fullWidth>View All</Button>
        </Box>
      </Menu>
      
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: '12px' }
        }}
      >
        <MenuItem onClick={() => handleTimeRangeChange('day')}>Day</MenuItem>
        <MenuItem onClick={() => handleTimeRangeChange('week')}>Week</MenuItem>
        <MenuItem onClick={() => handleTimeRangeChange('month')}>Month</MenuItem>
        <MenuItem onClick={() => handleTimeRangeChange('year')}>Year</MenuItem>
        <MenuItem onClick={handleFilterClose}>Custom Range</MenuItem>
      </Menu>
    </DashboardContainer>
  );
};

export default Dashboard;