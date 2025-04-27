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
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';

// Define TypeScript interfaces
interface AnomalyData {
  id: number;
  type: string;
  date: string;
  status: 'fixed' | 'not_fixed' | 'pending';
  assignedTo: string;
  location: string;
}

interface StatusColor {
  bg: string;
  color: string;
}

// Define props interface for Sidebar
interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

// Styled components
const PageContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  margin-left: 240px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 24px;
`;

const TableCard = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
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

const StatusChip = styled(Chip)`
  font-weight: 600;
  padding: 0 10px;
`;

const Pagination = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

const PaginationButton = styled(Button)`
  min-width: auto;
  padding: 6px 12px;
  margin: 0 4px;
`;

// Sample data
const anomalyData: AnomalyData[] = [
  {
    id: 1,
    type: 'Physical damage',
    date: '7-04-2025',
    status: 'fixed',
    assignedTo: 'Tesnim',
    location: 'Panel A-237',
  },
  {
    id: 2,
    type: 'Dust Accumulation',
    date: '6-04-2025',
    status: 'pending',
    assignedTo: 'Ahmed',
    location: 'Panel B-112',
  },
  {
    id: 3,
    type: 'Shadow Pattern',
    date: '5-04-2025',
    status: 'not_fixed',
    assignedTo: 'Tesnim',
    location: 'Panel C-045',
  },
  {
    id: 4,
    type: 'Crack Detected',
    date: '4-04-2025',
    status: 'fixed',
    assignedTo: 'Sarah',
    location: 'Panel A-189',
  },
  {
    id: 5,
    type: 'Connection Issue',
    date: '3-04-2025',
    status: 'pending',
    assignedTo: 'Tesnim',
    location: 'Panel D-023',
  },
];

const AnomalyDetectionPage: React.FC = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [actionAnchorEl, setActionAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<AnomalyData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, row: AnomalyData) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedRow(null);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    handleFilterClose();
  };

  const getStatusColor = (status: string): StatusColor => {
    switch (status) {
      case 'fixed':
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'not_fixed':
        return { bg: '#ffebee', color: '#c62828' };
      case 'pending':
        return { bg: '#fff8e1', color: '#f57f17' };
      default:
        return { bg: '#e0e0e0', color: '#616161' };
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'fixed':
        return 'Fixed';
      case 'not_fixed':
        return 'Not Fixed';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const filteredData = statusFilter === 'all'
    ? anomalyData
    : anomalyData.filter(item => item.status === statusFilter);

  return (
    <PageContainer>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainContent>
        <Header>
          <Typography variant="h4" fontWeight="600">Anomaly Detection History</Typography>
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
              <Button variant="text" sx={{ minWidth: 'auto' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
              sx={{ mr: 2 }}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={() => handleStatusFilter('all')}>All Statuses</MenuItem>
              <MenuItem onClick={() => handleStatusFilter('fixed')}>Fixed</MenuItem>
              <MenuItem onClick={() => handleStatusFilter('not_fixed')}>Not Fixed</MenuItem>
              <MenuItem onClick={() => handleStatusFilter('pending')}>Pending</MenuItem>
            </Menu>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Detected Anomaly</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Anomaly Status</StyledTableCell>
                  <StyledTableCell>Assigned Person</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => {
                  const statusStyle = getStatusColor(row.status);
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.type}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>
                        <StatusChip
                          label={getStatusLabel(row.status)}
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{row.assignedTo}</StyledTableCell>
                      <StyledTableCell>{row.location}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionClick(e, row)}
                        >
                          <MoreIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination>
            <PaginationButton variant="outlined">Previous</PaginationButton>
            <PaginationButton variant="contained">1</PaginationButton>
            <PaginationButton variant="outlined">2</PaginationButton>
            <PaginationButton variant="outlined">3</PaginationButton>
            <PaginationButton variant="outlined">Next</PaginationButton>
          </Pagination>
        </TableCard>
      </MainContent>

      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={handleActionClose}>View Details</MenuItem>
        <MenuItem onClick={handleActionClose}>Update Status</MenuItem>
        <MenuItem onClick={handleActionClose}>Assign to Team Member</MenuItem>
        <MenuItem onClick={handleActionClose}>Generate Report</MenuItem>
      </Menu>
    </PageContainer>
  );
};

export default AnomalyDetectionPage;