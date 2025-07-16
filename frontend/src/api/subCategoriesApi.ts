import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SubCategory } from '../types/models';

export const subCategoriesApi = createApi({
  reducerPath: 'subCategoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5433/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // שליפת כל הסאבקטגוריות לקטגוריה מסוימת
    getSubCategories: builder.query<SubCategory[], number>({
      query: (categoryId) => `subcategories/${categoryId}`,
    }),
    // יצירת סאבקטגוריה (רק לאדמין)
    createSubCategory: builder.mutation<SubCategory, { name: string; category_id: number }>({
      query: (body) => ({
        url: 'subcategories',
        method: 'POST',
        body,
      }),
    }),
    // עדכון סאבקטגוריה (רק לאדמין)
    updateSubCategory: builder.mutation<SubCategory, { id: number; name: string; category_id: number }>({
      query: ({ id, ...body }) => ({
        url: `subcategories/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    // מחיקת סאבקטגוריה (רק לאדמין)
    deleteSubCategory: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `subcategories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoriesApi;