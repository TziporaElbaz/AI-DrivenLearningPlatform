import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box, Stack, Dialog, IconButton } from '@mui/material';
import AuthModalContent from '../features/auth/AuthModalContent';
import { useGetMeQuery } from '../api/authApi';
import CategoryList from '../features/categories/CategoryList';
import PageTitle from '../components/PageTitle';
import Header from '../components/Header';
const HomePage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useGetMeQuery();
  const isAuthenticated = !!user;
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    if (!isAuthenticated) {
      setOpenAuthModal(true);
    } else {
      navigate(`/categories/${categoryId}/subcategories`);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <Header 
        onLoginClick={() => setOpenAuthModal(true)} 
        isAuthenticated={isAuthenticated}
        currentPage="home"
        user={user}
      />
      
      <PageTitle>קטגוריות למידה</PageTitle>
      
      <CategoryList onCategoryClick={handleCategoryClick} />


      <Dialog open={openAuthModal} onClose={() => {}} disableEscapeKeyDown>
        <AuthModalContent onClose={() => setOpenAuthModal(false)} />
      </Dialog>
    </Container>
  );
};

export default HomePage;
