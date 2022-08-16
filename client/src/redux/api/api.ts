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

export interface Contact {
  id: number
  name: string
  phone: string
  email: string
}

export const api = createApi({
  tagTypes: ['Contacts'],
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
    getAllContacts: builder.query<Contact[], void>({
      query: () => ({ url: '/contacts' }),
      providesTags: (result, error, arg) => (result
        ? [...result.map(({ id }) => ({ type: 'Contacts' as const, id })), 'Contacts']
        : ['Contacts']),
    }),
    editContact: builder.mutation<Contact[], Contact>({
      query: ({ id, ...newData }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: newData,
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation<Contact[], Contact>({
      query: (newData) => ({
        url: '/contacts',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation<Contact[], Contact>({
      query: ({ id, ...data }) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetAllContactsQuery,
  useEditContactMutation,
  useAddContactMutation,
  useDeleteContactMutation,
} = api;
