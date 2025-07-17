import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation, authApi } from '../../api/authApi';
import { categoriesApi } from '../../api/categoriesApi';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      
      // נקה את כל ה-cache של RTK Query
      dispatch(authApi.util.resetApiState());
      dispatch(categoriesApi.util.resetApiState());
      
      navigate('/');
    } catch (err) {
      console.error('שגיאה בהתנתקות:', err);
    }
  };

  return (
    <Button color="secondary" variant="outlined" onClick={handleLogout} sx={{ ml: 2 }}>
      התנתקות
    </Button>
  );
};

export default LogoutButton;
