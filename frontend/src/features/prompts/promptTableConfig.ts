import React from 'react';
import { Button, Chip, Typography, Box } from '@mui/material';
import type { TableColumn } from '../../components/GenericTable';
interface Prompt {
  id: number;
  prompt: string;
  response: string;
  category_id: number;
  sub_category_id: number;
  created_at: string;
  category?: { name: string };
  subCategory?: { name: string };
}

export const createPromptColumns = (
  onViewChat?: (categoryId: number, subCategoryId: number) => void
): TableColumn<Prompt>[] => [
  {
    id: 'prompt',
    label: 'השאלה',
    render: (prompt: Prompt) => {
      return React.createElement(Typography, {
        variant: 'body2',
        sx: { 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '300px'
        },
        children: prompt.prompt
      });
    },
    width: '40%'
  },
  {
    id: 'category',
    label: 'קטגוריה',
    render: (prompt: Prompt) => {
      return React.createElement(Box, {
        children: [
          React.createElement(Chip, {
            key: 'category',
            label: prompt.category?.name || 'לא ידוע',
            size: 'small',
            sx: { mb: 0.5 }
          }),
          React.createElement('br', { key: 'br' }),
          React.createElement(Typography, {
            key: 'subcategory',
            variant: 'caption',
            color: 'text.secondary',
            children: prompt.subCategory?.name || 'לא ידוע'
          })
        ]
      });
    },
    width: '25%',
    align: 'center'
  },
  {
    id: 'date',
    label: 'תאריך',
    render: (prompt: Prompt) => {
      const formattedDate = new Date(prompt.created_at).toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      return React.createElement(Typography, {
        variant: 'body2',
        color: 'text.secondary',
        children: formattedDate
      });
    },
    width: '20%',
    align: 'center'
  },
  {
    id: 'actions',
    label: 'פעולות',
    render: (prompt: Prompt) => {
      if (!onViewChat) return null;
      
      return React.createElement(Button, {
        size: 'small',
        variant: 'outlined',
        onClick: () => onViewChat(prompt.category_id, prompt.sub_category_id),
        children: 'המשך צ\'אט'
      });
    },
    width: '15%',
    align: 'center'
  }
];

export type { Prompt };
