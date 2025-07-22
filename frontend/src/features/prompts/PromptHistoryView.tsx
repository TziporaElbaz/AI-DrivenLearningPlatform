import React, { useCallback, useMemo, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
} from '@mui/material';
import { useGetUserPromptsQuery, useGetUserPromptsByUserIdQuery } from '../../api/promptsApi';

interface PromptHistoryViewProps {
  userId?: string;
  showNavigation?: boolean;
  title?: string;
  isAdminView?: boolean; // האם זה מצב אדמין
}

const PromptHistoryView: React.FC<PromptHistoryViewProps> = memo(({ 
  userId, 
  showNavigation = true,
  title = "נושאים שלמדת",
  isAdminView = false
}) => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [openConversationModal, setOpenConversationModal] = useState(false);
  
  // Use conditional hook based on whether userId is provided
  const userPromptsQuery = useGetUserPromptsQuery(undefined, {
    skip: !!userId // Skip this query if userId is provided
  });
  
  const userPromptsByIdQuery = useGetUserPromptsByUserIdQuery(userId!, {
    skip: !userId // Skip this query if userId is not provided
  });
  
  // Use the appropriate query result
  const { data: prompts, isLoading: promptsLoading, error } = userId 
    ? userPromptsByIdQuery 
    : userPromptsQuery;

  // Performance optimization: קיבוץ פרומפטים לשיחות לוגיות
  const conversationGroups = useMemo(() => {
    if (!prompts) return [];
    
    // קבץ לפי תת-קטגוריה ויום
    const grouped = prompts.reduce((acc: any, prompt: any) => {
      const date = new Date(prompt.created_at).toDateString();
      const key = `${prompt.category_id}-${prompt.sub_category_id}-${date}`;
      
      if (!acc[key]) {
        acc[key] = {
          categoryId: prompt.category_id,
          subCategoryId: prompt.sub_category_id,
          categoryName: prompt.category?.name || `קטגוריה ${prompt.category_id}`,
          subCategoryName: prompt.subCategory?.name || `תת-קטגוריה ${prompt.sub_category_id}`,
          date: date,
          prompts: []
        };
      }
      acc[key].prompts.push(prompt);
      return acc;
    }, {});
    
    // מיין לפי תאריך יצירה
    return Object.values(grouped)
      .map((group: any) => ({
        ...group,
        prompts: group.prompts.sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
        lastActivity: Math.max(...group.prompts.map((p: any) => new Date(p.created_at).getTime()))
      }))
      .sort((a: any, b: any) => b.lastActivity - a.lastActivity);
  }, [prompts]);

  // Performance optimization: פונקציה לפתיחת שיחה קיימת (רק למשתמש רגיל)
  const handleConversationClick = useCallback((conversation: any) => {
    if (showNavigation && !isAdminView) {
      // רק משתמש רגיל יכול להיכנס לצ'אט
      navigate(`/chat/${conversation.categoryId}/${conversation.subCategoryId}`, {
        state: { 
          conversationHistory: conversation.prompts,
          resumeConversation: true 
        }
      });
    } else if (isAdminView) {
      // אדמין - פתח מודל עם כל השיחה
      setSelectedConversation(conversation);
      setOpenConversationModal(true);
    }
  }, [navigate, showNavigation, isAdminView]);

  // Performance optimization: עיצוב תאריך
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  if (promptsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          שגיאה בטעינת ההיסטוריה
        </Typography>
      </Box>
    );
  }

  if (!prompts || prompts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {userId ? "המשתמש לא למד שום נושא עדיין" : "עדיין לא למדת שום נושא"}
        </Typography>
        {!userId && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            לך לעמוד הראשי ובחר נושא לימוד
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        {title} ({conversationGroups.length} שיחות)
      </Typography>
      
      {conversationGroups.map((conversation: any, index: number) => (
        <Card 
          key={`${conversation.categoryId}-${conversation.subCategoryId}-${conversation.date}`} 
          sx={{ 
            mb: 3, 
            cursor: showNavigation ? 'pointer' : 'default',
            opacity: isAdminView ? 0.9 : 1,
            border: isAdminView ? '1px solid #e0e0e0' : 'none',
            '&:hover': showNavigation ? { 
              boxShadow: isAdminView ? 2 : 3,
              transform: isAdminView ? 'translateY(-1px)' : 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            } : {}
          }}
          onClick={() => handleConversationClick(conversation)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {conversation.subCategoryName}
                </Typography>
                <Chip label={conversation.categoryName} size="small" sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label={`${conversation.prompts.length} הודעות`} 
                  color="primary" 
                  size="small" 
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {formatDate(conversation.prompts[conversation.prompts.length - 1].created_at)}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              תחילת השיחה:
            </Typography>
            
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%'
                    }}>
                      <strong>שאלה:</strong> {conversation.prompts[0].prompt}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      mt: 0.5
                    }}>
                      <strong>תשובה:</strong> {conversation.prompts[0].response}
                    </Typography>
                  }
                />
              </ListItem>
              
              {conversation.prompts.length > 1 && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="primary" sx={{ fontStyle: 'italic' }}>
                        + עוד {conversation.prompts.length - 1} הודעות בשיחה זו
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      ))}
      
      {/* מודל צפייה בשיחה מלאה - לאדמין */}
      <Dialog 
        open={openConversationModal} 
        onClose={() => setOpenConversationModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">
              {selectedConversation?.subCategoryName}
            </Typography>
            <Chip label={selectedConversation?.categoryName} size="small" />
            <Chip 
              label={`${selectedConversation?.prompts?.length || 0} הודעות`} 
              color="primary" 
              size="small" 
            />
          </Stack>
        </DialogTitle>
        
        <DialogContent sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          {selectedConversation && (
            <Stack spacing={3}>
              {selectedConversation.prompts.map((prompt: any, index: number) => (
                <Box key={prompt.id}>
                  {/* שאלת המשתמש */}
                  <Card sx={{ bgcolor: 'primary.main', color: 'white', mb: 1 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        👤 שאלה #{index + 1}:
                      </Typography>
                      <Typography variant="body1">
                        {prompt.prompt}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: 'block' }}>
                        {formatDate(prompt.created_at)}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  {/* תשובת ה-AI */}
                  <Card sx={{ bgcolor: 'grey.100' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        🤖 תשובה:
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {prompt.response}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenConversationModal(false)}>
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

PromptHistoryView.displayName = 'PromptHistoryView';

export default PromptHistoryView;
