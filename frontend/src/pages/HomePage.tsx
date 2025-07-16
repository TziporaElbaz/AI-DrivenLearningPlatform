import React from 'react';
import { useGetCategoriesQuery } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Card, CardContent, CircularProgress, Alert, Box, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const HomePage: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" color="primary" fontWeight={700}>
            ברוכים הבאים לפלטפורמת הלמידה
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{ borderRadius: 3, px: 4, fontWeight: 600 }}
            onClick={() => navigate('/register')}
          >
            התחברות / הרשמה
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h5" color="secondary" sx={{ mb: 3, textAlign: 'center', fontWeight: 500 }}>
        קטגוריות למידה
      </Typography>
      {isLoading && (
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>שגיאה בטעינת קטגוריות</Alert>
      )}
      <Stack direction="row" flexWrap="wrap" spacing={3} justifyContent="center">
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <Box key={cat.id} sx={{ m: 1, minWidth: 220, maxWidth: 300, flex: '1 1 220px' }}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, cursor: 'pointer', transition: '0.2s', '&:hover': { boxShadow: 8, transform: 'scale(1.03)' } }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" align="center">
                    {cat.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          !isLoading && (
            <Box sx={{ width: '100%' }}>
              <Alert severity="info">לא נמצאו קטגוריות</Alert>
            </Box>
          )
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
