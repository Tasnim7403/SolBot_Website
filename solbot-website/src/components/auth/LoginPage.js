import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import styled from 'styled-components';
import solbotLogo from '../../assets/images/solbot-logo.png';
import { login, isAuthenticated } from '../../services/authService';

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
`;

const LoginBox = styled(Paper)`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  width: 100%;
  max-width: 1100px;
  min-height: ${props => props.isMobile ? 'auto' : '600px'};
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
`;

const LogoSection = styled(Box)`
  flex: ${props => props.isMobile ? '0 0 200px' : '1'};
  background: linear-gradient(135deg, #000080 0%, #1a237e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.isMobile ? '2rem 1rem' : '3rem 2rem'};
  color: white;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const FormSection = styled(Box)`
  flex: ${props => props.isMobile ? 'auto' : '1.2'};
  padding: ${props => props.isMobile ? '2rem 1.5rem' : '3rem 4rem'};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  width: ${props => props.isMobile ? '80px' : '120px'};
  height: auto;
  margin-bottom: 1.5rem;
  z-index: 1;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1.5rem;
  
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #000080;
    }
    
    &.Mui-focused {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #000080;
      border-width: 2px;
    }
  }
  
  .MuiInputLabel-root.Mui-focused {
    color: #000080;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 12px;
  padding: ${props => props.isMobile ? '10px' : '14px'};
  font-weight: 600;
  text-transform: none;
  font-size: ${props => props.isMobile ? '15px' : '16px'};
  background: linear-gradient(90deg, #000080 0%, #1a237e 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 128, 0.2);
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(90deg, #1a237e 0%, #000080 100%);
    box-shadow: 0 6px 15px rgba(0, 0, 128, 0.3);
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ForgotPassword = styled(Typography)`
  text-align: right;
  color: #000080;
  cursor: pointer;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1a237e;
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: 'khoiadjatesnim@gmail.com',
    password: 'solbot123',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  
  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    let valid = true;
    const errors = {
      email: '',
      password: '',
    };
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
    
    // Clear general error message
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await login(formData.email, formData.password);
      console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message && err.message.includes('password')) {
        setError('Invalid password. Please try again.');
        setFormErrors({
          ...formErrors,
          password: 'Invalid password'
        });
      } else if (err.message && err.message.includes('email')) {
        setError('Email not found. Please check your email address.');
        setFormErrors({
          ...formErrors,
          email: 'Email not found'
        });
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <LoginBox elevation={0} isMobile={isMobile}>
        <LogoSection isMobile={isMobile}>
          <Logo src={solbotLogo} alt="SolBot Logo" isMobile={isMobile} />
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              zIndex: 1,
              textAlign: 'center',
              mb: 2 
            }}
          >
            SolBot
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.8, 
              textAlign: 'center', 
              zIndex: 1,
              px: isMobile ? 1 : 3,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            Solar Panel Monitoring & Maintenance System
          </Typography>
        </LogoSection>
        <FormSection isMobile={isMobile}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            sx={{ 
              mb: 1, 
              fontWeight: 'bold',
              textAlign: isMobile ? 'center' : 'left' 
            }}
          >
            Welcome Back!
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              textAlign: isMobile ? 'center' : 'left',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            Please log in to your account to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                    <Email fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ForgotPassword 
              variant="body2" 
              onClick={() => {
                if (formData.email) {
                  // Simulate sending a password reset email
                  setLoading(true);
                  setTimeout(() => {
                    setResetEmailSent(true);
                    setLoading(false);
                  }, 1500);
                } else {
                  setFormErrors({
                    ...formErrors,
                    email: 'Please enter your email to reset password'
                  });
                }
              }}
            >
              Forgot your password?
            </ForgotPassword>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {resetEmailSent && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Password reset link has been sent to your email.
              </Alert>
            )}
            
            <StyledButton
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              isMobile={isMobile}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </StyledButton>
          </form>
        </FormSection>
      </LoginBox>
    </StyledContainer>
  );
};

export default LoginPage;