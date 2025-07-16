import { configureStore } from '@reduxjs/toolkit';

import { usersApi } from './api/usersApi';
import { categoriesApi } from './api/categoriesApi';
import { promptsApi } from './api/promptsApi';
import { authApi } from './api/authApi';
import { subCategoriesApi } from './api/subCategoriesApi';  

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [promptsApi.reducerPath]: promptsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(subCategoriesApi.middleware)
      .concat(promptsApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
