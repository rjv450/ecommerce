import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      // Add the token to the headers if it exists
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart',
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: 'cart',
        method: 'POST',
        body: item,
      }),
    }),
    deleteCart: builder.mutation({
      query: () => ({
        url: 'cart',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteCartMutation } = cartApi;
