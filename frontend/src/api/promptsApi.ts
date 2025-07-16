import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Prompt } from '../types/models';

export const promptsApi = createApi({
  reducerPath: 'promptsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5433/api',
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    createPrompt: builder.mutation<Prompt, { categoryId: number; subCategoryId: number; promptText: string }>({
      query: (body) => ({
        url: 'prompts',
        method: 'POST',
        body,
      }),
    }),
    getUserPrompts: builder.query<Prompt[], void>({
      query: () => 'prompts/user',
    }),
    getAllPrompts: builder.query<Prompt[], void>({
      query: () => 'prompts',
    }),
  }),
});

export const {
  useCreatePromptMutation,
  useGetUserPromptsQuery,
  useGetAllPromptsQuery,
} = promptsApi;