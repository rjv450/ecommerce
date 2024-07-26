import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/products';
import { authApi } from '../services/auth';
import authReducer from '../store/reducers/authSlice';
import productReducer from '../store/reducers/productSlice';
import cartReducer from '../store/reducers/cartSlice';
import { cartApi } from '../services/carts';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    carts: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware).concat(cartApi.middleware),
});

setupListeners(store.dispatch); // Set up listeners for RTK Query

export default store;
