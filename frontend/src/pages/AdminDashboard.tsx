import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  Box
} from '@mui/material';
import { useGetMeQuery } from '../api/authApi';
import { useGetCategoriesQuery } from '../api/categoriesApi';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: categories } = useGetCategoriesQuery();

  console.log('AdminDashboard render:', { user, isAdmin: user?.is_admin });

  return (
    <>
      <Header 
        variant="admin"
        isAuthenticated={true}
        user={user}
        currentPage="admin"
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ברוך הבא, {user?.name}
        </Typography>
        
        <Box 
          display="flex" 
          flexWrap="wrap" 
          gap={3} 
          sx={{ mb: 4 }}
        >
          <StatCard 
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
            title="משתמשים"
            value="-"
            color="primary"
          />
          
          <StatCard 
            icon={<CategoryIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />}
            title="קטגוריות"
            value={categories?.length || 0}
            color="secondary"
          />
          
          <StatCard 
            icon={<AnalyticsIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />}
            title="שיחות"
            value="-"
            color="success"
          />
          
          <StatCard 
            icon={<SettingsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />}
            title="מערכת"
            value={<Chip label="פעיל" color="success" />}
          />
        </Box>

        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          gap={3}
          sx={{ mb: 3 }}
        >
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              ניהול תוכן
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<CategoryIcon />}
                fullWidth
                onClick={() => navigate('/admin/categories')}
              >
                ניהול קטגוריות וסאב-קטגוריות
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                onClick={() => {/* TODO: נווט לניהול תוכן */}}
              >
                ניהול תוכן ותבניות
              </Button>
            </Stack>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              ניהול משתמשים
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<PeopleIcon />}
                fullWidth
                onClick={() => navigate('/admin/users')}
              >
                צפייה בכל המשתמשים
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth
                onClick={() => {/* TODO: נווט להרשאות */}}
              >
                ניהול הרשאות
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
