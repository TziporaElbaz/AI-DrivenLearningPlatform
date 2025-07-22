import React from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Dialog
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../api/authApi';
import AuthModalContent from '../features/auth/AuthModalContent';
import Header from '../components/Header';
import PromptHistoryView from '../features/prompts/PromptHistoryView';

const UserHistoryPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useGetMeQuery();
  const isAuthenticated = !!user;
  const isAdmin = user?.is_admin === true;
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  // Check if user is admin
  if (!isAdmin && !userLoading) {
    return (
      <>
        <Header 
          variant="admin"
          onLoginClick={() => setOpenAuthModal(true)} 
          isAuthenticated={isAuthenticated}
          user={user}
          title="גישה נדחתה"
        />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="error">
              גישה נדחתה - נדרשות הרשאות מנהל
            </Typography>
          </Box>
        </Container>
        
        <Dialog open={openAuthModal} onClose={() => {}} disableEscapeKeyDown>
          <AuthModalContent onClose={() => setOpenAuthModal(false)} />
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Header 
        variant="admin"
        showBackButton={true}
        backTo="/admin/users"
        title={`היסטוריית משתמש - ID: ${userId}`}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <PromptHistoryView 
          title={`היסטוריית לימוד - משתמש ${userId}`} 
          userId={userId} 
          isAdminView={true}
          showNavigation={false}
        />
      </Container>

      <Dialog open={openAuthModal} onClose={() => {}} disableEscapeKeyDown>
        <AuthModalContent onClose={() => setOpenAuthModal(false)} />
      </Dialog>
    </>
  );
};

export default UserHistoryPage;
