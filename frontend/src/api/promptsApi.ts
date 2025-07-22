import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Prompt } from '../types/models';

export const promptsApi = createApi({
  reducerPath: 'promptsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    credentials: 'include', 
  }),
  tagTypes: ['Prompt'],
  endpoints: (builder) => ({
    createPrompt: builder.mutation<Prompt, { categoryId: number; subCategoryId: number; promptText: string }>({
      query: (body) => ({
        url: 'prompts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Prompt'],
      transformResponse: (response: { success: boolean; data: Prompt }) => response.data,
    }),
    getUserPrompts: builder.query<Prompt[], void>({
      query: () => 'prompts/my',
      providesTags: ['Prompt'],
      transformResponse: (response: { success: boolean; data: Prompt[] }) => response.data,
    }),
    getAllPrompts: builder.query<Prompt[], void>({
      query: () => 'prompts',
      providesTags: ['Prompt'],
      transformResponse: (response: { success: boolean; data: Prompt[] }) => response.data,
    }),
    getUserPromptsByUserId: builder.query<Prompt[], string>({
      query: (userId) => `prompts/user/${userId}`,
      providesTags: ['Prompt'],
      transformResponse: (response: { success: boolean; data: Prompt[] }) => response.data,
    }),
  }),
});

export const {
  useCreatePromptMutation,
  useGetUserPromptsQuery,
  useGetAllPromptsQuery,
  useGetUserPromptsByUserIdQuery,
} = promptsApi;