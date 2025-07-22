import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types/models';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users/all',
      transformResponse: (response: { success: boolean; data: User[] }) => response.data,
    }),
    getUser: builder.query<User, void>({
      query: () => 'users/me',
      transformResponse: (response: { success: boolean; data: User }) => response.data,
    }),
    register: builder.mutation<User, { id: string; name: string; phone: string }>({
      query: ({ id, name, phone }) => ({
        url: `users/register?id=${id}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
        method: 'POST',
      }),
      transformResponse: (response: { success: boolean; data: User }) => response.data,
    }),
    login: builder.mutation<{ user: User; token: string }, { id: string }>({
      query: ({ id }) => ({
        url: `users/login?id=${id}`,
        method: 'POST',
      }),
      transformResponse: (response: { success: boolean; data: { user: User; token: string } }) => response.data,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
} = usersApi;