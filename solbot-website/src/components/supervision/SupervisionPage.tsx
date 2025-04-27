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
  Stack
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  PlayArrow,
  FiberManualRecord,
} from '@mui/icons-material';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const SupervisionContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

// Fix the styled components TypeScript definitions
const MainContent = styled(Box)<{ ismobile?: string }>`
  flex-grow: 1;
  padding: ${props => props.ismobile === 'true' ? '16px' : '24px'};
  margin-left: ${props => props.ismobile === 'true' ? '0' : '240px'};
  transition: margin-left 0.3s ease;
`;

const Header = styled(Box)<{ ismobile?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => props.ismobile === 'true' ? 'wrap' : 'nowrap'};
  gap: ${props => props.ismobile === 'true' ? '16px' : '0'};
  margin-bottom: 24px;
`;

const SearchBar = styled(Paper)<{ ismobile?: string }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: ${props => props.ismobile === 'true' ? '100%' : '300px'};
  border-radius: 20px;
  background-color: white;
  margin-right: ${props => props.ismobile === 'true' ? '0' : '16px'};
`;

const StatusCard = styled(Paper)<{ ismobile?: string }>`
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  height: ${props => props.ismobile === 'true' ? '140px' : '160px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const VideoContainer = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-color: #000;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const StatusItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatusValue = styled(Typography)<{ $color?: string }>`
  font-weight: 600;
  color: ${props => props.$color || 'inherit'};
`;

const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  text-transform: none;
  min-width: 180px;
`;

const DetectionItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

interface RobotStatus {
  battery: number;
  connection: string;
  speed: number;
  status: 'online' | 'offline';
}

interface Detection {
  id: string;
  type: string;
  timestamp: string;
  confidence: number;
}

const SupervisionPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [robotStatus, setRobotStatus] = useState<RobotStatus>({
    battery: 78,
    connection: '4G',
    speed: 1.2,
    status: 'online'
  });
  const [detections, setDetections] = useState<Detection[]>([
    { id: '1', type: 'Person', timestamp: '10:30 AM', confidence: 0.95 },
    { id: '2', type: 'Vehicle', timestamp: '10:31 AM', confidence: 0.88 },
    { id: '3', type: 'Object', timestamp: '10:32 AM', confidence: 0.92 }
  ]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleMonitoring = () => setIsMonitoring(!isMonitoring);
  const toggleRecording = () => setIsRecording(!isRecording);

  return (
    <SupervisionContainer>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainContent ismobile={isMobile ? 'true' : 'false'}>
        <Header ismobile={isMobile ? 'true' : 'false'}>
          {isMobile && (
            <MobileMenuButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </MobileMenuButton>
          )}
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600">Supervision</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
            <SearchBar elevation={0} ismobile={isMobile ? 'true' : 'false'}>
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
              <Box sx={{ mr: 2, textAlign: 'right' }}>
                <Typography variant="body2">Hello,</Typography>
                <Typography variant="subtitle2" fontWeight="600">Tesnim</Typography>
              </Box>
              <Avatar src="/avatar.jpg" alt="User" />
            </Box>
          </Box>
        </Header>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
          <Box sx={{ width: { xs: '100%', md: '66.666%' }, px: 2, mb: 4 }}>
            <Stack direction="row" spacing={3} mb={3}>
              <ActionButton
                variant={isMonitoring ? "contained" : "outlined"}
                onClick={toggleMonitoring}
                startIcon={<PlayArrow />}
              >
                {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
              </ActionButton>
              <ActionButton
                variant={isRecording ? "contained" : "outlined"}
                onClick={toggleRecording}
                startIcon={<FiberManualRecord />}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </ActionButton>
            </Stack>

            <VideoContainer elevation={0}>
              <PlayButton>
                <PlayArrow sx={{ color: 'white', fontSize: 30 }} />
              </PlayButton>
            </VideoContainer>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '33.333%' }, px: 2 }}>
            <StatusCard elevation={0} ismobile={isMobile ? 'true' : 'false'}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="600">Robot Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                  <StatusDot color={robotStatus.status === 'online' ? '#4caf50' : '#f44336'} />
                  <Typography variant="body2" fontWeight="600">
                    {robotStatus.status.charAt(0).toUpperCase() + robotStatus.status.slice(1)}
                  </Typography>
                </Box>
              </Box>

              <StatusItem>
                <Typography variant="body2" color="text.secondary">Battery:</Typography>
                <StatusValue variant="body2" $color={robotStatus.battery < 20 ? '#f44336' : undefined}>
                  {robotStatus.battery}%
                </StatusValue>
              </StatusItem>

              <StatusItem>
                <Typography variant="body2" color="text.secondary">Connection:</Typography>
                <StatusValue variant="body2">{robotStatus.connection}</StatusValue>
              </StatusItem>

              <StatusItem>
                <Typography variant="body2" color="text.secondary">Speed:</Typography>
                <StatusValue variant="body2">{robotStatus.speed} m/s</StatusValue>
              </StatusItem>
            </StatusCard>

            <StatusCard elevation={0} ismobile={isMobile ? 'true' : 'false'}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>Recent Detections</Typography>
              {detections.map((detection) => (
                <DetectionItem key={detection.id}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="600">{detection.type}</Typography>
                    <Typography variant="caption" color="text.secondary">{detection.timestamp}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {(detection.confidence * 100).toFixed(0)}%
                  </Typography>
                </DetectionItem>
              ))}
            </StatusCard>
          </Box>
        </Box>
      </MainContent>
    </SupervisionContainer>
  );
};

export default SupervisionPage;