import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import { api } from './api/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
