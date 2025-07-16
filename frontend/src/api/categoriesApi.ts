import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category } from '../types/models';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5433/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<Category, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;