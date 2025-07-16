import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import { usersApi } from './api/usersApi';
import { categoriesApi } from './api/categoriesApi';
import { promptsApi } from './api/promptsApi';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [promptsApi.reducerPath]: promptsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(promptsApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
