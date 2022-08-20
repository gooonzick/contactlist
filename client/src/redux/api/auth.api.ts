import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CustomError } from '../../models/CustomError';
import { RootState } from '../store';

export interface User {
  name: string
  email:string
}

export interface UserResponse {
  user: User
  token: string
}

export interface SigninRequest {
  email: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
}

export interface TokenValidation {
  errorMessage?: string
  isValid?: boolean
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HOST ?? 'http://localhost:3010/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError >,
  endpoints: (builder) => ({
    signIn: builder.mutation<UserResponse, SigninRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<UserResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkToken: builder.query<TokenValidation, void>({
      query: () => ({ url: '/auth/token' }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useCheckTokenQuery,
} = authApi;
