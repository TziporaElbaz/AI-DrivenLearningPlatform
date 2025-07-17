import React from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useGetCategoriesQuery } from '../../api/categoriesApi';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  onCategoryClick: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryClick }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        שגיאה בטעינת הקטגוריות
      </Alert>
    );
  }

  return (
    <Box 
      display="flex" 
      flexWrap="wrap" 
      gap={3} 
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          onClick={() => onCategoryClick(category.id)}
        />
      ))}
    </Box>
  );
};

export default CategoryList;
