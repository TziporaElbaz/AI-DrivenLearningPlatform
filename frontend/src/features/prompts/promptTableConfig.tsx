import React from 'react';
import { Chip, IconButton, Typography, Box } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import { TableColumn } from '../../components/GenericTable';
import { Prompt } from '../../types/models';

// Extended prompt type for display purposes
export interface PromptWithNames extends Prompt {
  category_name?: string;
  subcategory_name?: string;
}

export const createPromptColumns = (
  onPromptClick?: (prompt: PromptWithNames) => void
): TableColumn<PromptWithNames>[] => [
  {
    id: 'subcategory_name',
    label: 'נושא',
    width: '200px',
    render: (prompt) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {prompt.subcategory_name || `תת-קטגוריה ${prompt.sub_category_id}`}
        </Typography>
        <Chip 
          label={prompt.category_name || `קטגוריה ${prompt.category_id}`} 
          size="small" 
          sx={{ mt: 0.5 }} 
        />
      </Box>
    )
  },
  {
    id: 'prompt',
    label: 'השאלה',
    width: '400px',
    render: (prompt) => (
      <Typography 
        variant="body2" 
        sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 400,
          cursor: onPromptClick ? 'pointer' : 'default',
          '&:hover': onPromptClick ? {
            color: 'primary.main',
            textDecoration: 'underline'
          } : {}
        }}
        onClick={() => onPromptClick?.(prompt)}
      >
        {prompt.prompt}
      </Typography>
    )
  },
  {
    id: 'created_at',
    label: 'תאריך',
    width: '150px',
    render: (prompt) => (
      <Typography variant="body2" color="text.secondary">
        {new Date(prompt.created_at).toLocaleDateString('he-IL', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </Typography>
    )
  },
  {
    id: 'actions',
    label: 'פעולות',
    width: '120px',
    align: 'center',
    render: (prompt) => onPromptClick ? (
      <IconButton 
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onPromptClick(prompt);
        }}
        sx={{ color: 'primary.main' }}
        title="פתח שיחה זו"
      >
        <ChatIcon />
      </IconButton>
    ) : null
  }
];
