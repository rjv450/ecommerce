import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, IconButton, Chip, FormControl, InputLabel, Select, MenuItem, Rating, Container } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetProductByIdQuery } from '../services/products';
import { useAddToCartMutation } from '../services/carts';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { fetchCartData } from '../store/reducers/cartSlice'; // Ensure correct path
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productItem, setProductItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { data, isLoading, error } = useGetProductByIdQuery(productId);
    const [addToCart] = useAddToCartMutation();

    useEffect(() => {
        if (data) {
            const sizes = ['XS', 'S', 'M', 'L', 'XL'];
            const availability = data.variants.some(variant => variant.stock > 0);
            const reviews = '150';
            const image = 'https://loremflickr.com/640/480/business';

            const colors = data.variants.map(variant => variant.color);

            setProductItem({
                image,
                title: data.name,
                reviews,
                availability,
                price: data.price,
                previousPrice: 599,
                description: data.description,
                size: sizes,
                color: colors,
            });

            if (sizes.length > 0) {
                setSelectedSize(sizes[0]);
            }
            if (colors.length > 0) {
                setSelectedColor(colors[0]);
            }
        }
    }, [data]);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (increment) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
    };

    const handleAddToCart = async () => {
        if (productItem && selectedSize && selectedColor) {
            const variant = data.variants.find(variant => variant.color === selectedColor);
            const newCartItem = {
                productId,
                variantId: variant?._id,
                quantity,
            };

            try {
                await addToCart(newCartItem).unwrap();
                setQuantity(1);
                navigate(`/product/${productId}`);

            } catch (error) {
                console.error('Failed to add item to cart:', error);
            }
        } else {
            console.log('Please select size and color before adding to cart');
        }
    };

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error fetching product data</Typography>;

    if (!productItem) return null;

    return (
        <Container maxWidth="md" sx={{ padding: 2 }}>
            <Box className="productDetailContainer">
                <IconButton onClick={() => navigate('/dashboard')} sx={{ marginBottom: 2 }}>
                    <ArrowBackIcon />
                </IconButton>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img src={productItem.image} alt={productItem.title} className="productImage" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {productItem.title}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Rating
                                name="product-rating"
                                value={3.5}
                                readOnly
                                precision={0.5}
                                size="large"
                                className="reactRaterStar"
                            />
                            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                ({productItem.reviews})
                            </Typography>
                        </Box>
                        <Typography variant="h6" color={productItem.availability ? 'green' : 'red'} mt={2}>
                            {productItem.availability ? 'In Stock' : 'Out of Stock'}
                        </Typography>
                        <Typography variant="h4" color="violet" mt={2}>
                            ${productItem.price} <Typography variant="body2" component="span" color="textSecondary" sx={{ textDecoration: 'line-through' }}>${productItem.previousPrice}</Typography>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" mt={2}>
                            {productItem.description}
                        </Typography>

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Size</InputLabel>
                            <Select
                                value={selectedSize}
                                onChange={handleSizeChange}
                                label="Size"
                            >
                                {productItem.size.map((size, index) => (
                                    <MenuItem key={index} value={size}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography variant="body2" color="textSecondary" mt={2}>
                            Color
                        </Typography>
                        <Box display="flex" mt={1}>
                            {productItem.color.map((color, index) => (
                                <Chip
                                    key={index}
                                    className="colorChip"
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                        marginRight: 8,
                                        marginBottom: 8,
                                        border: selectedColor === color ? '2px solid blue' : 'none',
                                    }}
                                    label=""
                                    onClick={() => handleColorChange(color)}
                                />
                            ))}
                        </Box>

                        <Box display="flex" alignItems="center" mt={2}>
                            <IconButton onClick={() => handleQuantityChange(-1)} className="plusMinusButton">−</IconButton>
                            <Box className="quantityDisplay">{quantity}</Box>
                            <IconButton onClick={() => handleQuantityChange(1)} className="plusMinusButton">+</IconButton>
                        </Box>

                        <Box display="flex" gap={2} mt={2}>
                            <Button variant="contained" color="primary" fullWidth startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ProductDetail;
