import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 16px;
  background-color: white;
  height: 100%;
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
    background: ${props => props.color || '#000080'};
  }
  
  .widget-icon {
    position: absolute;
    right: 20px;
    bottom: 20px;
    opacity: 0.1;
    font-size: 60px;
    color: ${props => props.color || '#000080'};
  }
`;

const StatsWidget = ({ title, value, icon, color = '#000080' }) => {
  return (
    <StyledPaper elevation={0} color={color}>
      <Typography color="text.secondary" variant="body1">
        {title}
      </Typography>
      <Typography variant="h3" fontWeight="600" sx={{ my: 1 }}>
        {value}
      </Typography>
      <Box className="widget-icon">
        {icon}
      </Box>
    </StyledPaper>
  );
};

export default StatsWidget;
