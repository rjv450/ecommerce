import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../../services/carts'; // Adjust the path as needed

const initialState = {
  items: [], // Initialize as an empty array
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    addCartItem: (state, action) => {
      // Ensure items is an array before pushing
      if (Array.isArray(state.items)) {
        state.items.push(action.payload);
      } else {
        console.error('State items is not an array');
        state.items = [action.payload]; // Reset to array with the new item
      }
    },
    // Set cart items directly
    setCartItems: (state, action) => {
      // Ensure payload.items is an array
      if (Array.isArray(action.payload.items)) {
        state.items = action.payload.items;
      } else {
        console.error('Payload items is not an array:', action.payload.items);
        state.items = []; // Default to empty array if payload is invalid
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          // Handle payload to ensure items is an array
          if (Array.isArray(payload.items)) {
            state.items = payload.items;
          } else {
            console.error('Payload items is not an array:', payload.items);
            state.items = []; // Default to empty array if payload is invalid
          }
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        cartApi.endpoints.getCart.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        cartApi.endpoints.getCart.matchRejected,
        (state, { error }) => {
          state.status = 'failed';
          state.error = error.message;
        }
      )
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          // Ensure items is an array before pushing
          if (Array.isArray(state.items)) {
            state.items.push(payload);
          } else {
            console.error('State items is not an array');
            state.items = [payload]; // Reset to array with the new item
          }
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        cartApi.endpoints.addToCart.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        cartApi.endpoints.addToCart.matchRejected,
        (state, { error }) => {
          state.status = 'failed';
          state.error = error.message;
        }
      )
      .addMatcher(
        cartApi.endpoints.deleteCart.matchFulfilled,
        (state) => {
          state.items = []; // Clear the cart
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        cartApi.endpoints.deleteCart.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        cartApi.endpoints.deleteCart.matchRejected,
        (state, { error }) => {
          state.status = 'failed';
          state.error = error.message;
        }
      );
  },
});

export const { addCartItem, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
