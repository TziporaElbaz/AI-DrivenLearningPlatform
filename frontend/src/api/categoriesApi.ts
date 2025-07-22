import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category } from '../types/models';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
      providesTags: ['Category'],
      transformResponse: (response: { success: boolean; data: Category[] }) => response.data,
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
      transformResponse: (response: { success: boolean; data: Category }) => response.data,
    }),
    updateCategory: builder.mutation<Category, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Category'],
      transformResponse: (response: { success: boolean; data: Category }) => response.data,
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;