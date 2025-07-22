import React from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { TableColumn } from '../../components/GenericTable';

interface Category {
  id: number;
  name: string;
}


export const createCategoryColumns = (
  onEdit: (category: Category) => void,
  onDelete: (id: number) => void
): TableColumn<Category>[] => [
  {
    id: 'name',
    label: 'שם הקטגוריה',
    render: (category: Category) => {
      return React.createElement(Typography, {
        variant: 'h6',
        fontWeight: 'medium',
        children: category.name
      });
    },
    width: '60%'
  },
  {
    id: 'id',
    label: 'מזהה',
    render: (category: Category) => `ID: ${category.id}`,
    width: '20%',
    align: 'center'
  },
  {
    id: 'actions',
    label: 'פעולות',
    render: (category: Category) => {
      return React.createElement('div', {
        style: { display: 'flex', gap: '8px', justifyContent: 'center' },
        children: [
          React.createElement(IconButton, {
            key: 'edit',
            color: 'primary',
            onClick: () => onEdit(category),
            sx: { '&:hover': { backgroundColor: 'primary.main', color: 'white' } },
            children: React.createElement(EditIcon)
          }),
          React.createElement(IconButton, {
            key: 'delete',
            color: 'error',
            onClick: () => onDelete(category.id),
            sx: { '&:hover': { backgroundColor: 'error.main', color: 'white' } },
            children: React.createElement(DeleteIcon)
          })
        ]
      });
    },
    width: '20%',
    align: 'center'
  }
];

export type { Category };
