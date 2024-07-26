import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, sortby = 'name', order = 'asc', search = '' }) => ({
        url: 'product',
        params: { page, limit, sortby, order, search },
      }),
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: productData,
      }),
    }),
    updateVariant: builder.mutation({
      query: ({ productId, variantId, ...variantData }) => ({
        url: `product/${productId}/variants/${variantId}`,
        method: 'PUT',
        body: variantData,
      }),
    }),
    getVariants: builder.query({
      query: (productId) => `product/${productId}/variants`,
    }),
    // New endpoint for adding a variant
    addVariant: builder.mutation({
      query: ({ productId, color, stock }) => ({
        url: `product/${productId}/variants`,
        method: 'POST',
        body: { color, stock },
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery, 
  useUpdateProductMutation, 
  useUpdateVariantMutation,
  useGetVariantsQuery,
  useAddVariantMutation 
} = productsApi;
