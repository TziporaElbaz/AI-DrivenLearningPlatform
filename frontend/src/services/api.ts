import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category, User, Prompt } from '../types/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5433/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getPrompts: builder.query<Prompt[], void>({
      query: () => 'prompts',
    }),
    login: builder.mutation<{ token: string }, { username: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // ניתן להוסיף כאן עוד endpoints לפי הצורך
  }),
});

export const {
  useGetCategoriesQuery,
  useGetUsersQuery,
  useGetPromptsQuery,
  useLoginMutation,
} = api;
