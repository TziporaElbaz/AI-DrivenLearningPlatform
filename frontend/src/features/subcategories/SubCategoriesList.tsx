import React from 'react';
import { useGetSubCategoriesQuery } from '../../api/subCategoriesApi';
import SubCategoryCard from './SubCategoryCard';
import { Box, CircularProgress, Alert, Stack } from '@mui/material';

interface SubCategoriesListProps {
  categoryId: number;
  onSubCategoryClick: (subCategoryId: number) => void;
}

const SubCategoriesList: React.FC<SubCategoriesListProps> = ({ categoryId, onSubCategoryClick }) => {
  const { data: subCategories, isLoading, error } = useGetSubCategoriesQuery(categoryId);

  if (isLoading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">שגיאה בטעינת תתי קטגוריות</Alert>;

  return (
    <Stack direction="row" flexWrap="wrap" spacing={3} justifyContent="center">
      {subCategories && subCategories.length > 0 ? (
        subCategories.map((sub) => (
          <SubCategoryCard key={sub.id} name={sub.name} onClick={() => onSubCategoryClick(sub.id)} />
        ))
      ) : (
        <Alert severity="info">לא נמצאו תתי קטגוריות</Alert>
      )}
    </Stack>
  );
};

export default SubCategoriesList;
