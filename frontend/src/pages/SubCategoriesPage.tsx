import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { useGetMeQuery } from '../api/authApi';
import { useGetCategoriesQuery } from '../api/categoriesApi';
import SubCategoriesList from '../features/subcategories/SubCategoriesList';
import Header from '../components/Header';

const SubCategoriesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: categories } = useGetCategoriesQuery();
  const isAuthenticated = !!user;

  const category = categories?.find(c => c.id === Number(id));

  const handleSubCategoryClick = (subCategoryId: number) => {
    navigate(`/chat/${id}/${subCategoryId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 0 }}>
      <Header 
        onLoginClick={() => {}} 
        isAuthenticated={isAuthenticated}
        currentPage="home"
        user={user}
      />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {category?.name || 'תתי קטגוריות'}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            בחרו נושא ספציפי להתחיל ללמוד
          </Typography>
        </Box>

        <SubCategoriesList categoryId={Number(id)} onSubCategoryClick={handleSubCategoryClick} />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/')}
            size="large"
          >
            חזרה לדף הבית
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default SubCategoriesPage;
