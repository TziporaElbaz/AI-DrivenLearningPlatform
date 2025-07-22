import React, { memo } from 'react';
import {
  Paper,
  Typography,
  Stack,
  Chip
} from '@mui/material';

interface ChatHeaderProps {
  categoryName?: string;
  subCategoryName?: string;
  description?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = memo(({ 
  categoryName,
  subCategoryName,
  description = "למידה אישית עם AI מתמחה"
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {categoryName && (
          <Chip 
            label={categoryName} 
            color="primary" 
            variant="outlined" 
          />
        )}
        {categoryName && subCategoryName && (
          <Typography variant="body2">→</Typography>
        )}
        {subCategoryName && (
          <Chip 
            label={subCategoryName} 
            color="secondary" 
          />
        )}
      </Stack>
      
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </Paper>
  );
});

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;
