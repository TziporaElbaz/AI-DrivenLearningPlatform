// components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutButton from '../features/auth/LogoutButton';

interface HeaderProps {
  onLoginClick: () => void;
  isAuthenticated: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onLoginClick, 
  isAuthenticated, 
  title = "ברוכים הבאים לפלטפורמת הלמידה" 
}) => (
  <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4" color="primary" fontWeight={700}>
        {title}
      </Typography>
      <Box>
        {!isAuthenticated && (
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

export default Header;