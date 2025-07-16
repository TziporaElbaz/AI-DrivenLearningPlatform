import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery, useLogoutMutation } from '../../api/authApi';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { refetch } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      refetch(); // יעדכן את הסטייט של המשתמש
      navigate('/');
    } catch (err) {
      // אפשר להציג הודעת שגיאה אם תרצי
    }
  };

  return (
    <Button color="secondary" variant="outlined" onClick={handleLogout} sx={{ ml: 2 }}>
      התנתקות
    </Button>
  );
};

export default LogoutButton;
