import React from 'react';
import { Container, Dialog, Box, Typography } from '@mui/material';
import AuthModalContent from '../features/auth/AuthModalContent';
import { useGetMeQuery } from '../api/authApi';
import PageTitle from '../components/PageTitle';
import Header from '../components/Header';
import PromptHistory from '../features/prompts/PromptHistoryView'; // Importing the new PromptHistory component

const MyLearningPage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useGetMeQuery();
  const isAuthenticated = !!user;
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <Header 
        onLoginClick={() => setOpenAuthModal(true)} 
        isAuthenticated={isAuthenticated}
        currentPage="my-learning"
        user={user}
      />
      
      <PageTitle>הלימודים שלי</PageTitle>
      
      <Box sx={{ p: 3 }}>
        {!isAuthenticated ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              יש להתחבר כדי לראות את היסטוריית הלמידה
            </Typography>
          </Box>
        ) : (
          <PromptHistory title="הלימודים שלי" />
        )}
      </Box>

      {/* מודאל התחברות/הרשמה */}
      <Dialog open={openAuthModal} onClose={() => {}} disableEscapeKeyDown>
        <AuthModalContent onClose={() => setOpenAuthModal(false)} />
      </Dialog>
    </Container>
  );
};

export default MyLearningPage;
