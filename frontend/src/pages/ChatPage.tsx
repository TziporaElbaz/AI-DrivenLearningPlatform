import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { Container, Typography, Alert } from '@mui/material';
import { useGetMeQuery } from '../api/authApi';
import Header from '../components/Header';
import ChatComponent from '../components/ChatComponent';

const ChatPage: React.FC = () => {
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string;
    subCategoryId: string;
  }>();
  const location = useLocation();
  const { data: user } = useGetMeQuery();
  const isAuthenticated = !!user;

  const { conversationHistory, resumeConversation } = location.state || {};

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!categoryId || !subCategoryId) {
    return (
      <Container>
        <Alert severity="error">
          פרמטרים לא תקינים
        </Alert>
      </Container>
    );
  }

  const categoryIdNum = parseInt(categoryId);
  const subCategoryIdNum = parseInt(subCategoryId);

  if (isNaN(categoryIdNum) || isNaN(subCategoryIdNum)) {
    return (
      <Container>
        <Alert severity="error">
          מזהי קטגוריה לא תקינים
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <Header 
        onLoginClick={() => {}} 
        isAuthenticated={isAuthenticated}
        currentPage="home"
        user={user}
      />
      
      <Container maxWidth="md" sx={{ py: 2 }}>
        <ChatComponent 
          categoryId={categoryIdNum}
          subCategoryId={subCategoryIdNum}
          conversationHistory={conversationHistory}
          resumeConversation={resumeConversation}
        />
      </Container>
    </Container>
  );
};

export default ChatPage;
