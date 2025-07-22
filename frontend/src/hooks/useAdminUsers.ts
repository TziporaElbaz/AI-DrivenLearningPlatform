import { useMemo } from 'react';
import { useGetUsersQuery } from '../api/usersApi';
import type { User } from '../types/models';

interface UserStats {
  total: number;
  admins: number;
  regular: number;
}

interface UseAdminUsersReturn {
  users: User[] | undefined;
  userStats: UserStats;
  isLoading: boolean;
  error: any;
}

export const useAdminUsers = (): UseAdminUsersReturn => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const userStats = useMemo((): UserStats => {
    if (!users) {
      return { total: 0, admins: 0, regular: 0 };
    }

    const total = users.length;
    const admins = users.filter(user => user.is_admin).length;
    const regular = total - admins;

    return { total, admins, regular };
  }, [users]);

  return {
    users,
    userStats,
    isLoading,
    error
  };
};
