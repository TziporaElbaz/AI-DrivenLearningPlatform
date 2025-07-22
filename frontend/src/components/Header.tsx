
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutButton from '../features/auth/LogoutButton';
import type { User } from '../types/models';

interface HeaderProps {
  onLoginClick?: () => void;
  isAuthenticated?: boolean;
  currentPage?: 'home' | 'my-learning' | 'admin';
  user?: User;
  title?: string;
  variant?: 'user' | 'admin';
  showBackButton?: boolean;
  backTo?: string;
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onLoginClick = () => {}, 
  isAuthenticated = false, 
  currentPage,
  user,
  title,
  variant = 'user',
  showBackButton = false,
  backTo = '/',
  showNavigation = true
}) => {
  const navigate = useNavigate();

  const getTitle = () => {
    if (title) return title;
    if (variant === 'admin') return `דשבורד אדמין - ${user?.name || 'מנהל'}`;
    return "ברוכים הבאים לפלטפורמת הלמידה";
  };

  const handleBackClick = () => {
    navigate(backTo);
  };

  return (
    <AppBar 
      position="static" 
      color={variant === 'admin' ? 'primary' : 'default'} 
      elevation={2} 
      sx={{ mb: variant === 'admin' ? 0 : 4 }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBackClick}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        
        <Typography 
          variant="h6" 
          color={variant === 'admin' ? 'inherit' : 'primary'} 
          fontWeight={700}
          sx={{ flexGrow: showBackButton ? 1 : 0 }}
        >
          {getTitle()}
        </Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          {variant === 'user' && showNavigation && isAuthenticated && (
            <Box display="flex" gap={1}>
              <Button 
                color={currentPage === 'home' ? 'primary' : 'inherit'}
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                variant={currentPage === 'home' ? 'contained' : 'text'}
              >
                לימוד חדש
              </Button>
              <Button 
                color={currentPage === 'my-learning' ? 'primary' : 'inherit'}
                startIcon={<HistoryIcon />}
                onClick={() => navigate('/my-learning')}
                variant={currentPage === 'my-learning' ? 'contained' : 'text'}
              >
                הלימודים שלי
              </Button>
              {user?.is_admin && (
                <Button 
                  color={currentPage === 'admin' ? 'secondary' : 'inherit'}
                  startIcon={<AdminPanelSettingsIcon />}
                  onClick={() => navigate('/admin')}
                  variant={currentPage === 'admin' ? 'contained' : 'text'}
                >
                  ניהול
                </Button>
              )}
            </Box>
          )}
          
          {variant === 'admin' && showNavigation && (
            <Box display="flex" gap={1}>
              <Button 
                color="inherit"
                startIcon={<AdminPanelSettingsIcon />}
                onClick={() => navigate('/admin')}
                variant="text"
              >
                דשבורד
              </Button>
            </Box>
          )}
     
          {variant === 'user' && !isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{ borderRadius: 3, px: 4, fontWeight: 600 }}
              onClick={onLoginClick}
            >
              התחברות / הרשמה
            </Button>
          )}
          
          {isAuthenticated && <LogoutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;