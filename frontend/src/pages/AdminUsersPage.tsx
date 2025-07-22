import React, { useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAdminUsers } from '../hooks/useAdminUsers';
import StatCard from '../components/StatCard';
import GenericTable from '../components/GenericTable';
import { createUserColumns } from '../features/users/userTableConfig';


const AdminUsersPage: React.FC = memo(() => {
  const navigate = useNavigate();
 
  const { users, userStats, isLoading, error } = useAdminUsers();


  const handleViewHistory = useCallback((userId: string) => {
    navigate(`/admin/users/${userId}/history`);
  }, [navigate]);


  const handleBackToAdmin = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  
  const userColumns = useMemo(() => {
    return createUserColumns(handleViewHistory);
  }, [handleViewHistory]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>טוען משתמשים...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">שגיאה בטעינת המשתמשים</Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* כפתור חזרה מותב */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToAdmin}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          חזרה לדף הבית
        </Button>
      </Box>
      
      <Typography variant="h4" gutterBottom>
        ניהול משתמשים
      </Typography>
  
      <Box display="flex" gap={3} mb={4}>
          <StatCard 
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="סך המשתמשים" 
            value={userStats.total} 
            color="primary"
          />
          <StatCard 
            icon={<AdminPanelSettingsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />}
            title="אדמינים" 
            value={userStats.admins}
            color="secondary"
          />
          <StatCard 
            icon={<VerifiedUserIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            title="משתמשים רגילים" 
            value={userStats.regular}
            color="success"
          />
        </Box>

     
        <GenericTable
          data={users}
          columns={userColumns}
          keyExtractor={(user) => user.id}
          title="כל המשתמשים"
          isLoading={isLoading}
          error={error}
          emptyMessage="אין משתמשים במערכת"
        />
      </Container>
  );
});

AdminUsersPage.displayName = 'AdminUsersPage';

export default AdminUsersPage;