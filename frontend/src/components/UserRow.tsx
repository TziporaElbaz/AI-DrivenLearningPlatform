import React, { memo } from 'react';
import { TableRow, TableCell, Button, Chip } from '@mui/material';
import type { User } from '../types/models';

interface UserRowProps {
  user: User;
  onViewHistory: (userId: string) => void;
}

const UserRow: React.FC<UserRowProps> = memo(({ user, onViewHistory }) => {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>
        <Chip 
          label={user.is_admin ? "אדמין" : "משתמש"} 
          color={user.is_admin ? "primary" : "default"}
        />
      </TableCell>
      <TableCell>
        <Button 
          size="small" 
          variant="outlined"
          onClick={() => onViewHistory(user.id)}
        >
          צפה בהיסטוריה
        </Button>
      </TableCell>
    </TableRow>
  );
});

UserRow.displayName = 'UserRow';

export default UserRow;
