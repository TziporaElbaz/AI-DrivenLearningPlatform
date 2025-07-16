import React from 'react';
import { useGetCategoriesQuery } from '../api/categoriesApi';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Card, CardContent, CircularProgress, Alert, Box, Stack, Dialog, IconButton } from '@mui/material';
import CategoryCard from '../features/categories/CategoryCard';
import LoginIcon from '@mui/icons-material/Login';
import AuthModalContent from '../features/auth/AuthModalContent';
import CloseIcon from '@mui/icons-material/Close';
import { useGetMeQuery } from '../api/authApi';
import LogoutButton from '../features/auth/LogoutButton';


const HomePage: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const { data: user, isLoading: userLoading } = useGetMeQuery();
  const isAuthenticated = !!user;
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const navigate = useNavigate();

  // דמו: סגירת מודאל אחרי "התחברות"
  const handleFakeLogin = () => {
    setOpenAuthModal(false);
    // כאן תבצעי redirect או refetch לפי הצורך
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="h4" color="primary" fontWeight={700}>
    ברוכים הבאים לפלטפורמת הלמידה
  </Typography>
  <Box>
    <Button
      variant="contained"
      color="primary"
      startIcon={<LoginIcon />}
      sx={{ borderRadius: 3, px: 4, fontWeight: 600 }}
      onClick={() => setOpenAuthModal(true)}
    >
      התחברות / הרשמה
    </Button>
    {isAuthenticated && <LogoutButton />}
  </Box>
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
              <CategoryCard
                name={cat.name}
                onClick={() => {
                  if (!isAuthenticated) setOpenAuthModal(true);
                  else navigate(`/categories/${cat.id}/subcategories`);
                }}
              />
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

      {/* מודאל התחברות/הרשמה */}
      <Dialog open={openAuthModal} onClose={() => {}} disableEscapeKeyDown>
        <AuthModalContent onClose={() => setOpenAuthModal(false)} />
      </Dialog>
    </Container>
  );
};

export default HomePage;
