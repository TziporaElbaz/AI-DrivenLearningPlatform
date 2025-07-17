import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetUsersQuery } from '../api/usersApi';
import StatCard from '../components/StatCard';

// pages/AdminUsersPage.tsx
const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* כפתור חזרה */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin')}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          חזרה לדף הבית
        </Button>
      </Box>
      
      <Typography variant="h4" gutterBottom>
        ניהול משתמשים
      </Typography>
      
      {/* סטטיסטיקות */}
      <Box display="flex" gap={3} mb={4}>
          <StatCard 
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="סך המשתמשים" 
            value={users?.length || 0} 
            color="primary"
          />
          <StatCard 
            icon={<AdminPanelSettingsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />}
            title="אדמינים" 
            value={users?.filter(user => user.is_admin).length || 0}
            color="secondary"
          />
          <StatCard 
            icon={<VerifiedUserIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            title="משתמשים רגילים" 
            value={users?.filter(user => !user.is_admin).length || 0}
            color="success"
          />
        </Box>

        {/* טבלת משתמשים */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={3}>כל המשתמשים</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם</TableCell>
                <TableCell>תעודת זהות</TableCell>
                <TableCell>טלפון</TableCell>
                <TableCell>סוג משתמש</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.is_admin ? "אדמין" : "משתמש"} 
                      color={user.is_admin ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/admin/users/${user.id}/history`)}
                    >
                      צפה בהיסטוריה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
  );
};

export default AdminUsersPage;