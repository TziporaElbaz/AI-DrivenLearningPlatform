import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useGetMeQuery } from '../api/authApi';
import { useGetCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation, useCreateCategoryMutation } from '../api/categoriesApi';
import LogoutButton from '../features/auth/LogoutButton';
import StatCard from '../components/StatCard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  // Debug - בואי נראה מה קורה
  console.log('AdminDashboard render:', { user, isAdmin: user?.is_admin });

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{id: number, name: string} | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  // State for add modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      try {
        await deleteCategory(String(id)).unwrap();
      } catch (error) {
        console.error('שגיאה במחיקת קטגוריה:', error);
      }
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
    setEditModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      try {
        await updateCategory({
          id: String(editingCategory.id),
          name: editCategoryName
        }).unwrap();
        setEditModalOpen(false);
        setEditingCategory(null);
        setEditCategoryName('');
      } catch (error) {
        console.error('שגיאה בעדכון קטגוריה:', error);
      }
    }
  };

  const handleAddCategory = async () => {
    try {
      await createCategory({ name: newCategoryName }).unwrap();
      setAddModalOpen(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('שגיאה בהוספת קטגוריה:', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            דשבורד אדמין - {user?.name}
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ברוך הבא, {user?.name}
        </Typography>
        
        {/* כרטיסי סטטיסטיקות */}
        <Box 
          display="flex" 
          flexWrap="wrap" 
          gap={3} 
          sx={{ mb: 4 }}
        >
          <StatCard 
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
            title="משתמשים"
            value="-"
            color="primary"
          />
          
          <StatCard 
            icon={<CategoryIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />}
            title="קטגוריות"
            value={categories?.length || 0}
            color="secondary"
          />
          
          <StatCard 
            icon={<AnalyticsIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />}
            title="שיחות"
            value="-"
            color="success"
          />
          
          <StatCard 
            icon={<SettingsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />}
            title="מערכת"
            value={<Chip label="פעיל" color="success" />}
          />
        </Box>

        {/* פעולות ניהול */}
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          gap={3}
          sx={{ mb: 3 }}
        >
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              ניהול תוכן
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<CategoryIcon />}
                fullWidth
                onClick={() => {/* TODO: נווט לניהול קטגוריות */}}
              >
                ניהול קטגוריות וסאב-קטגוריות
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth
                onClick={() => {/* TODO: נווט לניהול תוכן */}}
              >
                ניהול תוכן ותבניות
              </Button>
            </Stack>
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              ניהול משתמשים
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<PeopleIcon />}
                fullWidth
                onClick={() => navigate('/admin/users')}
              >
                צפייה בכל המשתמשים
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth
                onClick={() => {/* TODO: נווט להרשאות */}}
              >
                ניהול הרשאות
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* קטגוריות אחרונות */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              קטגוריות במערכת
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setAddModalOpen(true)}
            >
              הוסף קטגוריה
            </Button>
          </Box>
          {categories && categories.length > 0 ? (
            <List>
              {categories.slice(0, 5).map((category) => (
                <ListItem key={category.id} divider>
                  <ListItemText 
                    primary={category.name}
                    secondary={`מזהה: ${category.id}`}
                  />
                  <Stack direction="row" spacing={1}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="primary"
                      onClick={() => handleEditCategory(category)}
                    >
                      עריכה
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      מחיקה
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              אין קטגוריות במערכת
            </Typography>
          )}
        </Paper>

        {/* Edit Category Modal */}
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>עריכת קטגוריה</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="שם הקטגוריה"
              fullWidth
              variant="outlined"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>
              ביטול
            </Button>
            <Button onClick={handleUpdateCategory} variant="contained">
              עדכן
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Category Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <DialogTitle>הוספת קטגוריה חדשה</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="שם הקטגוריה"
              fullWidth
              variant="outlined"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddModalOpen(false)}>
              ביטול
            </Button>
            <Button onClick={handleAddCategory} variant="contained">
              הוסף
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminDashboard;
