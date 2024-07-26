import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartQuery } from '../services/carts'; // Adjust the path
import { setCartItems } from '../store/reducers/cartSlice'; // Adjust the path

const CartUpdater = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get the token from auth state
  const { data: cartData, isLoading, error } = useGetCartQuery(token, {
    skip: !token, // Skip the query if there's no token
  });

  useEffect(() => {
    if (cartData) {
      dispatch(setCartItems(cartData));
    }
  }, [cartData, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching cart data</div>;

  return null; // Or return your component if needed
};

export default CartUpdater;
