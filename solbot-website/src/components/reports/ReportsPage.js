import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../dashboard/Sidebar';

const PageContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  padding-bottom: 12px;
  margin-left: 240px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 24px;
`;

const ReportTitle = styled(Typography)`
  text-align: center;
  margin: 16px 0;
  font-weight: 600;
`;

const TableCard = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
`;

const ChartCard = styled(Paper)`
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  text-transform: none;
`;

// Sample data for the anomaly table
const anomalyData = [
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

// Sample data for the energy production chart
const energyData = [
  { day: 'Day 1', kw: 100 },
  { day: 'Day 2', kw: 200 },
  { day: 'Day 3', kw: 300 },
  { day: 'Day 4', kw: 200 },
  { day: 'Day 5', kw: 400 },
];

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <Typography variant="h4" fontWeight="600">Reports</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <input
                placeholder="Search..."
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '200px',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#f0f0f0',
                  fontSize: '14px',
                }}
              />
            </Box>
            <Box sx={{ mr: 2 }}>
              <Button
                variant="text"
                sx={{ minWidth: 'auto' }}
              >
                <Box component="span" sx={{ position: 'relative' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'red',
                    }}
                  />
                </Box>
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, textAlign: 'right' }}>
                <Typography variant="body2">Hello,</Typography>
                <Typography variant="subtitle2" fontWeight="600">Tesnim</Typography>
              </Box>
              <Box
                component="img"
                src="/avatar.jpg"
                alt="User"
                sx={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#f0f0f0',
                }}
              />
            </Box>
          </Box>
        </Header>

        <TableCard elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <ReportTitle variant="h6">
              Solar Panel Monitoring and Anomaly Report
            </ReportTitle>
            <ActionButton
              variant="contained"
              color="primary"
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
                {anomalyData.map((row) => (
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

        <ChartCard elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="600">
              Solar Panel Energy Production Trend
            </Typography>
            <Box>
              <Button 
                variant={timeRange === 'day' ? 'contained' : 'outlined'} 
                color="primary" 
                size="small" 
                onClick={() => setTimeRange('day')}
                sx={{ mr: 1 }}
              >
                Day
              </Button>
              <Button 
                variant={timeRange === 'week' ? 'contained' : 'outlined'} 
                color="primary" 
                size="small" 
                onClick={() => setTimeRange('week')}
                sx={{ mr: 1 }}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'contained' : 'outlined'} 
                color="primary" 
                size="small" 
                onClick={() => setTimeRange('month')}
                sx={{ mr: 1 }}
              >
                Month
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
              >
                Filter
              </Button>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={energyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kw"
                stroke="#000080"
                strokeWidth={2}
                dot={{ r: 6, strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Note: Click on the chart points to see detailed information
          </Typography>
        </ChartCard>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <ChartCard elevation={0}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Efficiency by Panel Section
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { section: 'A', efficiency: 87 },
                    { section: 'B', efficiency: 82 },
                    { section: 'C', efficiency: 91 },
                    { section: 'D', efficiency: 84 },
                    { section: 'E', efficiency: 89 },
                  ]}
                  margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="section" />
                  <YAxis domain={[75, 95]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#2196f3"
                    strokeWidth={2}
                    dot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard elevation={0}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Anomalies by Type
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { type: 'Dust', count: 12 },
                    { type: 'Cracks', count: 5 },
                    { type: 'Shadows', count: 8 },
                    { type: 'Damage', count: 3 },
                    { type: 'Other', count: 7 },
                  ]}
                  margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#f44336"
                    strokeWidth={2}
                    dot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>
        </Grid>
      </MainContent>
    </PageContainer>
  );
};

export default ReportsPage;
