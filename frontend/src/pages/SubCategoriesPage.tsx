import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSubCategoriesQuery } from '../api/subCategoriesApi';
import { Box, Typography, Button } from '@mui/material';
import SubCategoriesList from '../features/subcategories/SubCategoriesList';

const SubCategoriesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleSubCategoryClick = (subCategoryId: number) => {
    navigate(`/chat/${subCategoryId}`);
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h5" color="primary" mb={3} textAlign="center">
        תתי קטגוריות
      </Typography>
      <SubCategoriesList categoryId={Number(id)} onSubCategoryClick={handleSubCategoryClick} />
      <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={() => navigate(-1)}>
        חזרה לקטגוריות
      </Button>
    </Box>
  );
};

export default SubCategoriesPage;
