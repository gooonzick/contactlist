import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { CustomError } from '../../models/CustomError';
import { RootState } from '../store';

export interface Contact {
    id: number
    name: string
    phone: string
    email: string
  }

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
  useGetAllContactsQuery,
  useEditContactMutation,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
