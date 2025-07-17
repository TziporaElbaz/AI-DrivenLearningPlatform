import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { useGetMeQuery } from '../api/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/' 
}) => {
  const { data: user, isLoading, error } = useGetMeQuery();

  // מצב טעינה - חכה עד שהמידע מגיע
  if (isLoading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // רק אם יש שגיאה ברורה או שהמידע הגיע ואין משתמש - הפנה לעמוד הבית
  if (error || (!isLoading && !user)) {
    return <Navigate to={redirectTo} replace />;
  }

  // אם עדיין טוען ואין משתמש - המתן
  if (!user) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // אם נדרש אדמין אבל המשתמש לא אדמין
  if (requireAdmin && !user.is_admin) {
    return (
      <Container>
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" color="error" gutterBottom>
            אין לך הרשאות אדמין
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            דף זה מיועד למנהלי המערכת בלבד
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.href = redirectTo}
          >
            חזור לעמוד הבית
          </Button>
        </Box>
      </Container>
    );
  }

  // אם הכל בסדר - הצג את התוכן
  return <>{children}</>;
};

export default ProtectedRoute;
