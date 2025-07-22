import React from 'react';
import { Button, Chip } from '@mui/material';
import type { TableColumn } from '../../components/GenericTable';
import type { User } from '../../types/models';

export const createUserColumns = (
  onViewHistory: (userId: string) => void
): TableColumn<User>[] => [
  {
    id: 'name',
    label: 'שם',
    render: (user: User) => user.name,
    width: '25%'
  },
  {
    id: 'id',
    label: 'תעודת זהות',
    render: (user: User) => user.id,
    width: '20%'
  },
  {
    id: 'phone',
    label: 'טלפון',
    render: (user: User) => user.phone,
    width: '20%'
  },
  {
    id: 'status',
    label: 'סוג משתמש',
    render: (user: User) => {
      return React.createElement(Chip, {
        label: user.is_admin ? 'אדמין' : 'משתמש',
        color: user.is_admin ? 'primary' : 'default',
        size: 'small'
      });
    },
    width: '20%',
    align: 'center'
  },
  {
    id: 'actions',
    label: 'פעולות',
    render: (user: User) => {
      return React.createElement(Button, {
        size: 'small',
        variant: 'outlined',
        onClick: () => onViewHistory(user.id),
        children: 'צפה בהיסטוריה'
      });
    },
    width: '15%',
    align: 'center'
  }
];
