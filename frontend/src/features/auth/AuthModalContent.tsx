import React from 'react';
import { Box, Typography, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalContentProps {
  onClose: () => void;
}

const AuthModalContent: React.FC<AuthModalContentProps> = ({ onClose }) => {
  const [tab, setTab] = React.useState(0);

  return (
    <Box p={3} minWidth={320}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
        <Tab label="התחברות" />
        <Tab label="הרשמה" />
      </Tabs>
      {tab === 0 ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
    </Box>
  );
};

export default AuthModalContent;
