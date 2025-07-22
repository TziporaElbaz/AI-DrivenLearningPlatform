import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: { success: boolean; message: string }) => ({ message: response.message }),
    }),
    register: builder.mutation<User, { idNumber: string; name: string; phone: string }>({
      query: ({ idNumber, name, phone }) => ({
        url: `users/register?id=${encodeURIComponent(idNumber)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: { success: boolean; data: User }) => response.data,
    }),
    login: builder.mutation<{ user: User; token: string }, { idNumber: string }>({
      query: ({ idNumber }) => ({
        url: `users/login?id=${encodeURIComponent(idNumber)}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: { success: boolean; data: { user: User; token: string } }) => response.data,
    }),
    getMe: builder.query<User, void>({
      query: () => 'users/me',
      providesTags: ['User'],
      transformResponse: (response: { success: boolean; data: User }) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
