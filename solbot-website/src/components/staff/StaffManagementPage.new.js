import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Divider,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { getStaff, getStaffStats, createStaffMember, updateStaffMember, deleteStaffMember } from '../../services/staffService';
import StaffFormDialog from './StaffFormDialog';
import AssignmentDialog from './AssignmentDialog';
import StaffDetailDialog from './StaffDetailDialog';
import StatsWidget from './StatsWidget';

const StyledContainer = styled(Box)`
  padding: 24px;
  padding-bottom: 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  min-height: calc(100vh - 64px);
`;

const SearchBar = styled(Paper)`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  margin-right: 16px;
  background-color: ${props => props.bgcolor || '#000080'};
`;

const StyledTableCell = styled(TableCell)`
  font-weight: ${props => props.header ? '600' : '400'};
`;

const StaffManagementPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    role: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState('table');
  const [openStaffDialog, setOpenStaffDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(null);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [dialogMode, setDialogMode] = useState('add');

  // Fetch staff data
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const apiFilters = {
        ...filters,
        search: searchQuery
      };
      const response = await getStaff(page + 1, rowsPerPage, apiFilters);
      setStaff(response.data);
      setTotalCount(response.pagination.total);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch staff');
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await getStaffStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchStaff();
    fetchStats();
  }, [page, rowsPerPage, filters, searchQuery]);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // Handle filter change
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
    setPage(0);
    setOpenFilterMenu(null);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle view mode change
  const handleViewModeChange = (event, newValue) => {
    setViewMode(newValue);
  };

  // Handle filter menu
  const handleFilterMenuOpen = (event) => {
    setOpenFilterMenu(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterMenuClose = () => {
    setOpenFilterMenu(null);
  };

  // Handle action menu
  const handleActionMenuOpen = (event, staff) => {
    setSelectedStaff(staff);
    setOpenActionMenu(event.currentTarget);
  };

  // Handle action menu close
  const handleActionMenuClose = () => {
    setOpenActionMenu(null);
  };

  // Handle staff dialog
  const handleOpenStaffDialog = (mode, staff = null) => {
    setDialogMode(mode);
    setSelectedStaff(staff);
    setOpenStaffDialog(true);
  };

  // Handle assignment dialog
  const handleOpenAssignmentDialog = (staff) => {
    setSelectedStaff(staff);
    setOpenAssignmentDialog(true);
    setOpenActionMenu(null);
  };

  // Handle detail dialog
  const handleOpenDetailDialog = (staff) => {
    setSelectedStaff(staff);
    setOpenDetailDialog(true);
  };

  // Handle save staff
  const handleSaveStaff = async (staffData) => {
    try {
      setLoading(true);
      
      if (dialogMode === 'add') {
        await createStaffMember(staffData);
        setSnackbar({
          open: true,
          message: 'Staff member added successfully',
          severity: 'success'
        });
      } else {
        await updateStaffMember(selectedStaff._id, staffData);
        setSnackbar({
          open: true,
          message: 'Staff member updated successfully',
          severity: 'success'
        });
      }
      
      setOpenStaffDialog(false);
      fetchStaff();
      fetchStats();
    } catch (err) {
      console.error('Failed to save staff:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to save staff member',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete staff
  const handleDeleteStaff = async () => {
    try {
      setLoading(true);
      await deleteStaffMember(selectedStaff._id);
      
      setSnackbar({
        open: true,
        message: 'Staff member deleted successfully',
        severity: 'success'
      });
      
      setOpenActionMenu(null);
      setOpenDetailDialog(false);
      fetchStaff();
      fetchStats();
    } catch (err) {
      console.error('Failed to delete staff:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to delete staff member',
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

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      department: '',
      status: '',
      role: ''
    });
    setPage(0);
  };

  // Render status chip
  const renderStatusChip = (status) => {
    let color;
    switch (status) {
      case 'active':
        color = 'success';
        break;
      case 'inactive':
        color = 'error';
        break;
      case 'on-leave':
        color = 'warning';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={color} 
        size="small" 
      />
    );
  };

  return (
    <StyledContainer>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600" sx={{ mb: isMobile ? 2 : 0 }}>
          Staff Management
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <input
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
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
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenStaffDialog('add')}
        >
          Add Staff
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={() => {
            fetchStaff();
            fetchStats();
          }}
        >
          Refresh
        </Button>
      </Box>
      
      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget 
              title="Total Staff" 
              value={stats.totalStaff} 
              icon={<PersonIcon fontSize="large" />} 
              color="#000080"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget 
              title="Active Staff" 
              value={stats.activeStaff} 
              icon={<PersonIcon fontSize="large" />} 
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget 
              title="Inactive Staff" 
              value={stats.inactiveStaff} 
              icon={<PersonIcon fontSize="large" />} 
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget 
              title="On Leave" 
              value={stats.onLeaveStaff} 
              icon={<PersonIcon fontSize="large" />} 
              color="#ff9800"
            />
          </Grid>
        </Grid>
      )}
      
      <SearchBar elevation={0}>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <input
          placeholder="Search staff by name, email, role, or department"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            background: 'transparent',
            fontSize: '16px',
          }}
        />
        {searchQuery && (
          <IconButton size="small" onClick={() => setSearchQuery('')}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Tooltip title="Filter">
          <IconButton onClick={handleFilterMenuOpen}>
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </SearchBar>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {filters.department && (
          <Chip 
            label={`Department: ${filters.department}`} 
            onDelete={() => handleFilterChange('department', '')} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        )}
        {filters.status && (
          <Chip 
            label={`Status: ${filters.status}`} 
            onDelete={() => handleFilterChange('status', '')} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        )}
        {filters.role && (
          <Chip 
            label={`Role: ${filters.role}`} 
            onDelete={() => handleFilterChange('role', '')} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        )}
        {(filters.department || filters.status || filters.role) && (
          <Chip 
            label="Clear All" 
            onClick={handleResetFilters} 
            size="small" 
            color="secondary" 
            variant="outlined"
          />
        )}
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              fetchStaff();
              fetchStats();
            }}
          >
            Try Again
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Tabs 
              value={viewMode} 
              onChange={handleViewModeChange}
              indicatorColor="primary"
              textColor="primary"
              variant={isMobile ? "fullWidth" : "standard"}
            >
              <Tab value="table" label="Table View" />
              <Tab value="grid" label="Grid View" />
            </Tabs>
          </Box>
          
          {viewMode === 'table' ? (
            <>
              <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
                      <StyledTableCell header>Name</StyledTableCell>
                      <StyledTableCell header>Department</StyledTableCell>
                      <StyledTableCell header>Role</StyledTableCell>
                      <StyledTableCell header>Status</StyledTableCell>
                      <StyledTableCell header align="right">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staff.length > 0 ? (
                      staff.map((staffMember) => (
                        <TableRow 
                          key={staffMember._id}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: '#f5f7fa',
                              cursor: 'pointer'
                            }
                          }}
                          onClick={() => handleOpenDetailDialog(staffMember)}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={staffMember.profileImage} 
                                alt={staffMember.name}
                                sx={{ mr: 2, bgcolor: '#000080' }}
                              >
                                {staffMember.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2">{staffMember.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{staffMember.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{staffMember.department}</TableCell>
                          <TableCell>{staffMember.role}</TableCell>
                          <TableCell>{renderStatusChip(staffMember.status)}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionMenuOpen(e, staffMember);
                              }}
                            >
                              <MoreIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                          <Typography variant="body1">No staff members found</Typography>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<AddIcon />}
                            sx={{ mt: 2 }}
                            onClick={() => handleOpenStaffDialog('add')}
                          >
                            Add Staff
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <>
              <Grid container spacing={3}>
                {staff.length > 0 ? (
                  staff.map((staffMember) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={staffMember._id}>
                      <StyledCard onClick={() => handleOpenDetailDialog(staffMember)}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <StyledAvatar 
                              src={staffMember.profileImage} 
                              alt={staffMember.name}
                            >
                              {staffMember.name.charAt(0)}
                            </StyledAvatar>
                            <Box>
                              <Typography variant="h6">{staffMember.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{staffMember.email}</Typography>
                            </Box>
                          </Box>
                          
                          <Divider sx={{ mb: 2 }} />
                          
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Department</Typography>
                            <Typography variant="body1">{staffMember.department}</Typography>
                          </Box>
                          
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Role</Typography>
                            <Typography variant="body1">{staffMember.role}</Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" color="text.secondary">Status</Typography>
                            {renderStatusChip(staffMember.status)}
                          </Box>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionMenuOpen(e, staffMember);
                            }}
                          >
                            <MoreIcon />
                          </IconButton>
                        </CardActions>
                      </StyledCard>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1">No staff members found</Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<AddIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => handleOpenStaffDialog('add')}
                      >
                        Add Staff
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
              
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </>
      )}
      
      {/* Filter Menu */}
      <Menu
        anchorEl={openFilterMenu}
        open={Boolean(openFilterMenu)}
        onClose={handleFilterMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { 
            width: 280,
            padding: 2,
            borderRadius: '12px'
          }
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>Filter Staff</Typography>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={filters.department}
              label="Department"
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <MenuItem value="">All Departments</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="on-leave">On Leave</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={filters.role}
              label="Role"
              onChange={(e) => handleFilterChange('role', e.target.value)}
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Team Lead">Team Lead</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
              <MenuItem value="Junior">Junior</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="small" 
            onClick={handleResetFilters}
          >
            Reset
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={handleFilterMenuClose}
          >
            Apply
          </Button>
        </Box>
      </Menu>
      
      {/* Action Menu */}
      <Menu
        anchorEl={openActionMenu}
        open={Boolean(openActionMenu)}
        onClose={handleActionMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: '12px' }
        }}
      >
        <MenuItem onClick={() => handleOpenStaffDialog('edit', selectedStaff)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleOpenAssignmentDialog(selectedStaff)}>
          <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
          Assign Task
        </MenuItem>
        <MenuItem onClick={handleDeleteStaff} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      
      {/* Dialogs */}
      {openStaffDialog && (
        <StaffFormDialog
          open={openStaffDialog}
          onClose={() => setOpenStaffDialog(false)}
          onSave={handleSaveStaff}
          staff={dialogMode === 'edit' ? selectedStaff : null}
          mode={dialogMode}
        />
      )}
      
      {openAssignmentDialog && (
        <AssignmentDialog
          open={openAssignmentDialog}
          onClose={() => setOpenAssignmentDialog(false)}
          staffId={selectedStaff?._id}
          onSuccess={() => {
            fetchStaff();
            setSnackbar({
              open: true,
              message: 'Assignment added successfully',
              severity: 'success'
            });
          }}
        />
      )}
      
      {openDetailDialog && (
        <StaffDetailDialog
          open={openDetailDialog}
          onClose={() => setOpenDetailDialog(false)}
          staff={selectedStaff}
          onEdit={() => handleOpenStaffDialog('edit', selectedStaff)}
          onAssign={() => handleOpenAssignmentDialog(selectedStaff)}
          onDelete={handleDeleteStaff}
          onSuccess={() => {
            fetchStaff();
            fetchStats();
          }}
        />
      )}
      
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
  );
};

export default StaffManagementPage;
