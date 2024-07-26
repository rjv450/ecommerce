import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
// import { useGetCartQuery, useDeleteCartMutation } from '../services/cartApi'; // Update the path as needed
import { setCartItems } from '../../src/store/reducers/cartSlice'; // Update the path as needed
import {  useGetCartQuery } from '../services/carts';

const Info = ({ totalPrice }) => {
  const { data, error, isLoading } = useGetCartQuery();
 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.carts.items);

  React.useEffect(() => {
    if (data && Array.isArray(data.items)) {
      dispatch(setCartItems(data));
    }
  }, [data, dispatch]);

  const handleDelete = async () => {
    try {
      // await deleteCart().unwrap();
      console.log(1);
    } catch (err) {
      console.error('Failed to delete the cart: ', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const calculatedTotalPrice = products
    .reduce((total, { productId, quantity }) => total + productId.price * quantity, 0)
    .toFixed(2);

  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${calculatedTotalPrice}
      </Typography>
      <List disablePadding>
        {products.map(({ productId, quantity }) => (
          <ListItem key={productId._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={productId.name}
              secondary={`${productId.description} - ${quantity} pcs`}
            />
            <Typography variant="body1" fontWeight="medium">
              ${(productId.price * quantity).toFixed(2)}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
