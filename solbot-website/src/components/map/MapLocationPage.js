import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';

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

const MapContainer = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 400px;
  margin-bottom: 24px;
  background-color: #e0e0e0;
`;

const MapImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const MapButton = styled(Button)`
  border-radius: 30px;
  padding: 8px 24px;
  font-weight: 600;
  text-transform: none;
  margin-right: 10px;
`;

const StatusCard = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  height: 100%;
`;

const StatusItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusLabel = styled(Typography)`
  color: #666;
`;

const StatusValue = styled(Typography)`
  font-weight: 600;
  color: ${props => props.color || 'inherit'};
`;

const JoystickContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const JoystickOuter = styled(Box)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const JoystickInner = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #000080;
  position: absolute;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const BatteryIndicator = styled(Box)`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
`;

const BatteryLevel = styled(Box)`
  height: 100%;
  width: ${props => props.level || '0%'};
  background-color: ${props => {
    if (props.level > 60) return '#4caf50';
    if (props.level > 20) return '#ff9800';
    return '#f44336';
  }};
  border-radius: 4px;
`;

const MapLocationPage = () => {
  const [mapType, setMapType] = useState('satellite');
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  
  const handleJoystickMove = (e) => {
    // This would be replaced with actual joystick logic in a real implementation
    console.log('Joystick moved');
  };
  
  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header>
        <Typography variant="h4" fontWeight="600">Map/Location</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <input
                placeholder="Search..."
                sx={{
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
        
        <Box sx={{ mb: 2 }}>
          <MapButton 
            variant={mapType === 'satellite' ? 'contained' : 'outlined'} 
            color="primary"
            onClick={() => setMapType('satellite')}
          >
            Satellite
          </MapButton>
          <MapButton 
            variant={mapType === 'ground' ? 'contained' : 'outlined'} 
            color="primary"
            onClick={() => setMapType('ground')}
          >
            Ground
          </MapButton>
        </Box>
        
        <MapContainer elevation={0}>
          <MapImage style={{ 
            backgroundImage: `url(${mapType === 'satellite' 
              ? 'https://via.placeholder.com/1200x600?text=Satellite+View' 
              : 'https://via.placeholder.com/1200x600?text=Ground+View'})` 
          }} />
        </MapContainer>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StatusCard elevation={0}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>Robot Status</Typography>
              
              <StatusItem>
                <StatusLabel variant="body2">Status:</StatusLabel>
                <StatusValue variant="body2" color="#4caf50">Active - Patrolling</StatusValue>
              </StatusItem>
              
              <StatusItem>
                <StatusLabel variant="body2">Battery:</StatusLabel>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '60%' }}>
                  <StatusValue variant="body2">75%</StatusValue>
                  <BatteryIndicator>
                    <BatteryLevel level="75%" />
                  </BatteryIndicator>
                </Box>
              </StatusItem>
              
              <StatusItem>
                <StatusLabel variant="body2">Speed:</StatusLabel>
                <StatusValue variant="body2">1.2 m/s</StatusValue>
              </StatusItem>
              
              <StatusItem>
                <StatusLabel variant="body2">Location:</StatusLabel>
                <StatusValue variant="body2">Section B4</StatusValue>
              </StatusItem>
              
              <StatusItem>
                <StatusLabel variant="body2">Connection:</StatusLabel>
                <StatusValue variant="body2" color="#4caf50">Strong</StatusValue>
              </StatusItem>
              
              <StatusItem>
                <StatusLabel variant="body2">Anomalies Found:</StatusLabel>
                <StatusValue variant="body2" color="#f44336">3</StatusValue>
              </StatusItem>
            </StatusCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StatusCard elevation={0}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>Manual Control Mode</Typography>
              
              <JoystickContainer>
                <JoystickOuter>
                  <JoystickInner 
                    onMouseDown={handleJoystickMove}
                    style={{
                      transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`,
                    }}
                  />
                </JoystickOuter>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Use joystick to control robot movement
                </Typography>
              </JoystickContainer>
            </StatusCard>
          </Grid>
        </Grid>
      </MainContent>
    </PageContainer>
  );
};

export default MapLocationPage;
