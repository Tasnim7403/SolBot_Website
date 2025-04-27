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
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid, // Standard Grid
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

// Updated styling to match the design in the images
const ReportsContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled(Box)<{ ismobile?: boolean }>`
  flex-grow: 1;
  padding: ${props => props.ismobile ? '16px' : '24px'};
  margin-left: ${props => props.ismobile ? '0' : '240px'};
  transition: margin-left 0.3s ease;
  background-color: white;
`;

const Header = styled(Box)<{ ismobile?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => props.ismobile ? 'wrap' : 'nowrap'};
  gap: ${props => props.ismobile ? '16px' : '0'};
  margin-bottom: 24px;
`;

// Updated search bar to match the design
const SearchBar = styled(Paper)<{ ismobile?: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: ${props => props.ismobile ? '100%' : '300px'};
  border-radius: 20px;
  background-color: #f5f5f5;
  margin-right: ${props => props.ismobile ? '0' : '16px'};
  border: 1px solid #e0e0e0;
`;

// Updated chart styling
const ChartCard = styled(Paper)<{ ismobile?: boolean }>`
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 24px;
  height: ${props => props.ismobile ? '400px' : '500px'};
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

// Updated table styling to match the image
const TableCard = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
  font-weight: 500;
  color: #333;
  
  &.MuiTableCell-head {
    background-color: white;
    font-weight: 600;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  border-bottom: 1px solid #f0f0f0;
`;

// Updated button styling to match the image
const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  text-transform: none;
  background-color: #000080;
  color: white;
  
  &:hover {
    background-color: #000066;
  }
`;

const FilterButton = styled(Button)`
  color: #000080;
  font-weight: 500;
  text-transform: none;
  
  &:hover {
    background-color: rgba(0, 0, 128, 0.05);
  }
`;

const TimeRangeButton = styled(Button)<{ active: boolean }>`
  border-radius: 20px;
  padding: 6px 16px;
  font-weight: 500;
  text-transform: none;
  margin-right: 8px;
  background-color: ${props => props.active ? '#000080' : 'transparent'};
  color: ${props => props.active ? 'white' : '#000080'};
  border: 1px solid ${props => props.active ? '#000080' : '#e0e0e0'};
  
  &:hover {
    background-color: ${props => props.active ? '#000066' : 'rgba(0, 0, 128, 0.05)'};
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const ReportTitle = styled(Typography)`
  text-align: center;
  margin: 16px 0;
  font-weight: 600;
  color: #333;
`;

const NavSidebar = styled(Box)`
  width: 240px;
  background-color: #000080;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const NavLogo = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
`;

const NavItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Sample data for the efficiency chart
const efficiencyData = [
  { name: 'A', efficiency: 85 },
  { name: 'B', efficiency: 82 },
  { name: 'C', efficiency: 90 },
  { name: 'D', efficiency: 84 },
  { name: 'E', efficiency: 88 },
];

// Sample data for the anomaly pie chart
const anomalyChartData = [
  { name: 'Dust', value: 45 },
  { name: 'Bird Droppings', value: 20 },
  { name: 'Scratches', value: 15 },
  { name: 'Water Spots', value: 10 },
  { name: 'Other', value: 10 },
];

// Updated anomaly table data to match the image
const anomalyTableData = [
  {
    id: 1,
    type: 'Physical damage',
    date: '7-04-2025',
    status: 'Resolved',
    assignedTo: 'Tesnim',
    location: 'Panel A-237',
  },
  {
    id: 2,
    type: 'Dust Accumulation',
    date: '6-04-2025',
    status: 'Pending',
    assignedTo: 'Ahmed',
    location: 'Panel B-112',
  },
  {
    id: 3,
    type: 'Shadow Pattern',
    date: '5-04-2025',
    status: 'Not Fixed',
    assignedTo: 'Tesnim',
    location: 'Panel C-045',
  },
  {
    id: 4,
    type: 'Crack Detected',
    date: '4-04-2025',
    status: 'Resolved',
    assignedTo: 'Sarah',
    location: 'Panel A-189',
  },
  {
    id: 5,
    type: 'Connection Issue',
    date: '3-04-2025',
    status: 'Pending',
    assignedTo: 'Tesnim',
    location: 'Panel D-023',
  },
];

// Updated energy data to match the chart in the image
const energyData = [
  { day: 'Day 1', kw: 100 },
  { day: 'Day 2', kw: 200 },
  { day: 'Day 3', kw: 300 },
  { day: 'Day 4', kw: 200 },
  { day: 'Day 5', kw: 400 },
];

// Anomalies by type data to match the image
const anomaliesTypeData = [
  { type: 'Dust', count: 12 },
  { type: 'Cracks', count: 5 },
  { type: 'Shadows', count: 8 },
  { type: 'Other', count: 3 },
];

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Custom Sidebar component to match the image
const CustomSidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('reports');
  
  return (
    <NavSidebar>
      <NavLogo>
        <img 
          src="/api/placeholder/32/32" 
          alt="SolBot Logo" 
          style={{ marginRight: '8px' }} 
        />
        SolBot
      </NavLogo>
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <SearchBar ismobile={false} elevation={0}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <input
            placeholder="Search..."
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
            }}
          />
        </SearchBar>
      </Box>
      
      <NavItem 
        className={activeItem === 'dashboard' ? 'active' : ''} 
        onClick={() => { setActiveItem('dashboard'); navigate('/dashboard'); }}
      >
        <Box component="span" sx={{ mr: 2 }}>📊</Box>
        Dashboard
      </NavItem>
      
      <NavItem 
        className={activeItem === 'map' ? 'active' : ''} 
        onClick={() => { setActiveItem('map'); navigate('/map'); }}
      >
        <Box component="span" sx={{ mr: 2 }}>📍</Box>
        Map/Location
      </NavItem>
      
      <NavItem 
        className={activeItem === 'supervision' ? 'active' : ''} 
        onClick={() => { setActiveItem('supervision'); navigate('/supervision'); }}
      >
        <Box component="span" sx={{ mr: 2 }}>👁️</Box>
        Supervision
      </NavItem>
      
      <NavItem 
        className={activeItem === 'anomaly' ? 'active' : ''} 
        onClick={() => { setActiveItem('anomaly'); navigate('/anomaly'); }}
      >
        <Box component="span" sx={{ mr: 2 }}>⚠️</Box>
        Anomaly Detection History
      </NavItem>
      
      <NavItem 
        className={activeItem === 'reports' ? 'active' : ''} 
        onClick={() => { setActiveItem('reports'); navigate('/reports'); }}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Box component="span" sx={{ mr: 2 }}>📄</Box>
        Reports
      </NavItem>
      
      <NavItem 
        className={activeItem === 'staff' ? 'active' : ''} 
        onClick={() => { setActiveItem('staff'); navigate('/staff'); }}
      >
        <Box component="span" sx={{ mr: 2 }}>👥</Box>
        Staff Management
      </NavItem>
      
      <Box sx={{ mt: 'auto' }}>
        <NavItem 
          className={activeItem === 'settings' ? 'active' : ''} 
          onClick={() => { setActiveItem('settings'); navigate('/settings'); }}
        >
          <Box component="span" sx={{ mr: 2 }}>⚙️</Box>
          Settings
        </NavItem>
        
        <NavItem onClick={() => navigate('/logout')}>
          <Box component="span" sx={{ mr: 2 }}>🚪</Box>
          Sign Out
        </NavItem>
      </Box>
    </NavSidebar>
  );
};

const ReportsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <ReportsContainer>
      <CustomSidebar />

      <MainContent ismobile={isMobile}>
        <Header ismobile={isMobile}>
          {isMobile && (
            <MobileMenuButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </MobileMenuButton>
          )}
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Reports</Typography>
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
                Hello, Tesnim
              </Typography>
              <Avatar alt="Tesnim" src="/api/placeholder/40/40" />
            </Box>
          </Box>
        </Header>

        <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '24px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', borderRadius: '12px 12px 0 0' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="report tabs"
              textColor="primary"
              indicatorColor="primary"
              sx={{ 
                '& .MuiTab-root': { 
                  fontWeight: 600,
                  color: '#666',
                  '&.Mui-selected': { color: '#000080' }
                },
                '& .MuiTabs-indicator': { backgroundColor: '#000080' }
              }}
            >
              <Tab label="Performance" {...a11yProps(0)} />
              <Tab label="Anomalies" {...a11yProps(1)} />
              <Tab label="Maintenance" {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/* Performance Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <ChartCard elevation={0} ismobile={isMobile}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="600" color="#333">
                    Solar Panel Energy Production Trend
                  </Typography>
                  <Box>
                    <TimeRangeButton 
                      active={timeRange === 'day'} 
                      onClick={() => setTimeRange('day')}
                    >
                      Day
                    </TimeRangeButton>
                    <TimeRangeButton 
                      active={timeRange === 'week'} 
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </TimeRangeButton>
                    <TimeRangeButton 
                      active={timeRange === 'month'} 
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </TimeRangeButton>
                    <FilterButton 
                      variant="text" 
                      size="small"
                    >
                      Filter
                    </FilterButton>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
                    <LineChart
                      data={energyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 450]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="kw"
                        stroke="#000080"
                        strokeWidth={2}
                        dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  Note: Click on the chart points to see detailed information
                </Typography>
              </ChartCard>

              {/* Changed the Grid component layout to use manual flex layout instead */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <ChartCard elevation={0} ismobile={isMobile} style={{ height: isMobile ? '350px' : '400px' }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }} color="#333">
                      Efficiency by Panel Section
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={efficiencyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[75, 95]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#0088FE"
                            strokeWidth={2}
                            dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </ChartCard>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ChartCard elevation={0} ismobile={isMobile} style={{ height: isMobile ? '350px' : '400px' }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }} color="#333">
                      Anomalies by Type
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={anomaliesTypeData}
                          margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="type" />
                          <YAxis domain={[0, 12]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#f44336"
                            strokeWidth={2}
                            dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </ChartCard>
                </Box>
              </Box>
            </Box>
          </TabPanel>

          {/* Anomalies Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <TableCard elevation={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                  <ReportTitle variant="h6">
                    Solar Panel Monitoring and Anomaly Report
                  </ReportTitle>
                  <ActionButton
                    variant="contained"
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </ActionButton>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Detected Anomaly</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Anomaly Status</StyledTableCell>
                        <StyledTableCell>Assigned Person</StyledTableCell>
                        <StyledTableCell>Location Description</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {anomalyTableData.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell>{row.type}</StyledTableCell>
                          <StyledTableCell>{row.date}</StyledTableCell>
                          <StyledTableCell>{row.status}</StyledTableCell>
                          <StyledTableCell>{row.assignedTo}</StyledTableCell>
                          <StyledTableCell>{row.location}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCard>

              {/* Additional chart for the anomalies tab as shown in the image */}
              <ChartCard elevation={0} ismobile={isMobile}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="600" color="#333">
                    Solar Panel Energy Production Trend
                  </Typography>
                  <Box>
                    <TimeRangeButton 
                      active={timeRange === 'day'} 
                      onClick={() => setTimeRange('day')}
                    >
                      Day
                    </TimeRangeButton>
                    <TimeRangeButton 
                      active={timeRange === 'week'} 
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </TimeRangeButton>
                    <TimeRangeButton 
                      active={timeRange === 'month'} 
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </TimeRangeButton>
                    <FilterButton 
                      variant="text" 
                      size="small"
                    >
                      Filter
                    </FilterButton>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
                    <LineChart
                      data={energyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 450]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="kw"
                        stroke="#000080"
                        strokeWidth={2}
                        dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Box>
          </TabPanel>

          {/* Maintenance Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <ChartCard elevation={0} ismobile={isMobile}>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }} color="#333">
                  Maintenance Schedule
                </Typography>
                <Typography variant="body1">
                  Maintenance data will be displayed here.
                </Typography>
              </ChartCard>
            </Box>
          </TabPanel>
        </Box>
      </MainContent>
    </ReportsContainer>
  );
};

export default ReportsPage;