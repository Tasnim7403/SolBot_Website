import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Grid,
  Paper,
  CircularProgress,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { updateAssignment, removeAssignment } from '../../services/staffService';

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #f5f7fa;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-right: 24px;
  background-color: #000080;
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    margin-right: 16px;
  }
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  .icon {
    color: #6b7280;
    margin-right: 12px;
    min-width: 24px;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StaffDetailDialog = ({ open, onClose, staff, onEdit, onAssign, onDelete, onSuccess }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateAssignmentStatus = async (assignmentId, status) => {
    setActionLoading(true);
    setActionType('update');
    setSelectedAssignmentId(assignmentId);
    setError(null);
    
    try {
      await updateAssignment(staff._id, assignmentId, { status });
      onSuccess();
    } catch (err) {
      setError('Failed to update assignment status');
      console.error(err);
    } finally {
      setActionLoading(false);
      setSelectedAssignmentId(null);
    }
  };

  const handleRemoveAssignment = async (assignmentId) => {
    setActionLoading(true);
    setActionType('remove');
    setSelectedAssignmentId(assignmentId);
    setError(null);
    
    try {
      await removeAssignment(staff._id, assignmentId);
      onSuccess();
    } catch (err) {
      setError('Failed to remove assignment');
      console.error(err);
    } finally {
      setActionLoading(false);
      setSelectedAssignmentId(null);
    }
  };

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

  const renderAssignmentStatusChip = (status) => {
    let color, icon;
    switch (status) {
      case 'pending':
        color = 'warning';
        icon = null;
        break;
      case 'in-progress':
        color = 'info';
        icon = null;
        break;
      case 'completed':
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'cancelled':
        color = 'error';
        icon = <CancelIcon fontSize="small" />;
        break;
      default:
        color = 'default';
        icon = null;
    }
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} 
        color={color}
        size="small"
        icon={icon}
      />
    );
  };

  if (!staff) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: '16px' }
      }}
    >
      <StyledDialogTitle>
        <Typography variant="h6" fontWeight="600">
          Staff Details
        </Typography>
        <Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </StyledDialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 3 }}>
          <StyledAvatar src={staff.profileImage} alt={staff.name}>
            {staff.name.charAt(0)}
          </StyledAvatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h5" fontWeight="600">
                {staff.name}
              </Typography>
              {renderStatusChip(staff.status)}
            </Box>
            
            <InfoItem>
              <EmailIcon className="icon" fontSize="small" />
              <Typography variant="body1">{staff.email}</Typography>
            </InfoItem>
            
            {staff.phone && (
              <InfoItem>
                <PhoneIcon className="icon" fontSize="small" />
                <Typography variant="body1">{staff.phone}</Typography>
              </InfoItem>
            )}
            
            <InfoItem>
              <WorkIcon className="icon" fontSize="small" />
              <Typography variant="body1">
                {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
              </Typography>
            </InfoItem>
            
            <InfoItem>
              <BusinessIcon className="icon" fontSize="small" />
              <Typography variant="body1">
                {staff.department.charAt(0).toUpperCase() + staff.department.slice(1)}
              </Typography>
            </InfoItem>
            
            <InfoItem>
              <CalendarIcon className="icon" fontSize="small" />
              <Typography variant="body1">
                Joined: {new Date(staff.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </InfoItem>
          </Box>
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Assignments" />
              <Tab label="Activity" />
            </Tabs>
          </Box>
          
          <Box sx={{ py: 2 }}>
            {tabValue === 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Current Assignments ({staff.assignments ? staff.assignments.length : 0})
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AssignmentIcon />}
                    size="small"
                    onClick={onAssign}
                  >
                    Assign New Task
                  </Button>
                </Box>
                
                {staff.assignments && staff.assignments.length > 0 ? (
                  <Grid container spacing={2}>
                    {staff.assignments.map((assignment) => (
                      <Grid item xs={12} md={6} key={assignment._id}>
                        <StyledPaper>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="600">
                              {assignment.title}
                            </Typography>
                            {renderAssignmentStatusChip(assignment.status)}
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {assignment.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2">
                              <strong>Location:</strong> {assignment.location}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2">
                              <strong>Start Date:</strong> {new Date(assignment.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </Typography>
                            {assignment.endDate && (
                              <Typography variant="body2">
                                <strong>End Date:</strong> {new Date(assignment.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </Typography>
                            )}
                          </Box>
                          
                          <Divider sx={{ my: 1 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            {assignment.status !== 'completed' && (
                              <Tooltip title="Mark as Completed">
                                <span>
                                  <IconButton 
                                    size="small" 
                                    color="success"
                                    onClick={() => handleUpdateAssignmentStatus(assignment._id, 'completed')}
                                    disabled={actionLoading && selectedAssignmentId === assignment._id}
                                  >
                                    {actionLoading && actionType === 'update' && selectedAssignmentId === assignment._id ? (
                                      <CircularProgress size={20} />
                                    ) : (
                                      <CheckCircleIcon fontSize="small" />
                                    )}
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                            
                            {assignment.status !== 'cancelled' && (
                              <Tooltip title="Cancel Assignment">
                                <span>
                                  <IconButton 
                                    size="small" 
                                    color="error"
                                    onClick={() => handleUpdateAssignmentStatus(assignment._id, 'cancelled')}
                                    disabled={actionLoading && selectedAssignmentId === assignment._id}
                                  >
                                    <CancelIcon fontSize="small" />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                            
                            <Tooltip title="Remove Assignment">
                              <span>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleRemoveAssignment(assignment._id)}
                                  disabled={actionLoading && selectedAssignmentId === assignment._id}
                                >
                                  {actionLoading && actionType === 'remove' && selectedAssignmentId === assignment._id ? (
                                    <CircularProgress size={20} />
                                  ) : (
                                    <DeleteIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Box>
                        </StyledPaper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No Assignments
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      This staff member doesn't have any assignments yet
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AssignmentIcon />}
                      onClick={onAssign}
                    >
                      Assign New Task
                    </Button>
                  </Box>
                )}
              </>
            )}
            
            {tabValue === 1 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  Activity Log
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activity tracking will be available in a future update
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button 
          variant="outlined"
          onClick={onClose}
        >
          Close
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffDetailDialog;
