import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation<User, { idNumber: string; name: string; phone: string }>({
      query: ({ idNumber, name, phone }) => ({
        url: `users/register?id=${encodeURIComponent(idNumber)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
        method: 'POST',
      }),
    }),
    login: builder.mutation<User, { idNumber: string }>({
      query: ({ idNumber }) => ({
        url: `users/login?id=${encodeURIComponent(idNumber)}`,
        method: 'POST',
      }),
    }),
    getMe: builder.query<User, void>({
  query: () => 'users/me',
}),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
