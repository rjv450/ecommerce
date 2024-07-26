// src/features/product/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../../services/products';

const initialState = {
  products: [],
  total: 0,
  page: 1,
  limit: 10,
  sortby: 'name',
  order: 'asc',
  search: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.sortby = action.payload.sortby;
      state.order = action.payload.order;
      state.search = action.payload.search;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload.products;
        state.total = payload.total;
        state.page = payload.page;
        state.limit = payload.limit;
        state.sortby = payload.sortby;
        state.order = payload.order;
        state.search = payload.search;
      }
    );
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
