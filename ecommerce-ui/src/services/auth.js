import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = import.meta.env.VITE_API_URL;
// Define the API slice
export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }), // Base URL for your API
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    // Removed the logout endpoint
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useRegisterMutation } = authApi;
