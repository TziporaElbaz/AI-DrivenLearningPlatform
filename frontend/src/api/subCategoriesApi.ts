import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SubCategory } from '../types/models';

export const subCategoriesApi = createApi({
  reducerPath: 'subCategoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    getSubCategories: builder.query<SubCategory[], number>({
      query: (categoryId) => `subcategories/${categoryId}`,
      transformResponse: (response: { success: boolean; data: SubCategory[] }) => response.data,
    }),
  
    createSubCategory: builder.mutation<SubCategory, { name: string; category_id: number }>({
      query: (body) => ({
        url: 'subcategories',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { success: boolean; data: SubCategory }) => response.data,
    }),

    updateSubCategory: builder.mutation<SubCategory, { id: number; name: string; category_id: number }>({
      query: ({ id, ...body }) => ({
        url: `subcategories/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { success: boolean; data: SubCategory }) => response.data,
    }),

    deleteSubCategory: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `subcategories/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({ message: response.message }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoriesApi;