import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types/models';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5433/api',
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getUser: builder.query<User, void>({
      query: () => 'users/me',
    }),
    register: builder.mutation<User, { id: string; name: string; phone: string }>({
      query: ({ id, name, phone }) => ({
        url: `users/register?id=${id}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
        method: 'POST',
      }),
    }),
    login: builder.mutation<{ user: User; token: string }, { id: string }>({
      query: ({ id }) => ({
        url: `users/login?id=${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
} = usersApi;