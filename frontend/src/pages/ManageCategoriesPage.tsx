import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useGetMeQuery } from '../api/authApi';
import { useGetCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation, useCreateCategoryMutation } from '../api/categoriesApi';
import Header from '../components/Header';
import GenericTable from '../components/GenericTable';
import CategoryFormModal from '../components/CategoryFormModal';
import { createCategoryColumns, type Category } from '../features/categories/categoryTableConfig';

const ManageCategoriesPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  // State for modals - מאוחד למודאל אחד
  const [modalState, setModalState] = useState<{
    mode: 'add' | 'edit';
    open: boolean;
    category?: Category;
  }>({ mode: 'add', open: false });

  // Performance optimization: פונקציות נוצרות רק פעם אחת
  const handleDeleteCategory = useCallback(async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      try {
        await deleteCategory(String(id)).unwrap();
      } catch (error) {
        console.error('שגיאה במחיקת קטגוריה:', error);
      }
    }
  }, [deleteCategory]);

  const handleEditCategory = useCallback((category: Category) => {
    setModalState({ mode: 'edit', open: true, category });
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setModalState({ mode: 'add', open: true });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ mode: 'add', open: false });
  }, []);

  const handleSubmitCategory = useCallback(async (name: string) => {
    try {
      if (modalState.mode === 'add') {
        await createCategory({ name }).unwrap();
      } else if (modalState.category) {
        await updateCategory({
          id: String(modalState.category.id),
          name
        }).unwrap();
      }
      handleCloseModal();
    } catch (error) {
      console.error('שגיאה בשמירת קטגוריה:', error);
    }
  }, [modalState, createCategory, updateCategory, handleCloseModal]);

  // Performance optimization: עמודות הטבלה נוצרות רק כשהפונקציות משתנות
  const categoryColumns = useMemo(() => {
    return createCategoryColumns(handleEditCategory, handleDeleteCategory);
  }, [handleEditCategory, handleDeleteCategory]);

  if (isLoading) {
    return (
      <>
        <Header 
          variant="admin"
          isAuthenticated={true}
          user={user}
          showBackButton={true}
          backTo="/admin"
          title="ניהול קטגוריות"
        />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography>טוען...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header 
        variant="admin"
        isAuthenticated={true}
        user={user}
        showBackButton={true}
        backTo="/admin"
        title="ניהול קטגוריות"
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* כותרת וכפתור הוספה */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CategoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              ניהול קטגוריות
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{ borderRadius: 2 }}
          >
            הוסף קטגוריה חדשה
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            שגיאה בטעינת הקטגוריות
          </Alert>
        )}

        {/* טבלת קטגוריות ממוטבת עם GenericTable */}
        <GenericTable
          data={categories}
          columns={categoryColumns}
          keyExtractor={(category) => String(category.id)}
          title={`קטגוריות קיימות (${categories?.length || 0})`}
          isLoading={isLoading}
          error={error}
          emptyMessage="אין קטגוריות במערכת"
          stickyHeader={true}
        />

        {/* מודאל מאוחד לAdd ו-Edit */}
        <CategoryFormModal
          mode={modalState.mode}
          open={modalState.open}
          onClose={handleCloseModal}
          onSubmit={handleSubmitCategory}
          initialValue={modalState.category?.name || ''}
        />
      </Container>
    </>
  );
});

ManageCategoriesPage.displayName = 'ManageCategoriesPage';

export default ManageCategoriesPage;
