import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useGetProductsQuery } from './../services/products'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function FeaturedProduct() {
    const navigate = useNavigate(); // Initialize useNavigate
    const { data: products, error, isLoading } = useGetProductsQuery({ limit: 10 });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Function to generate a unique image URL
    const getRandomImageUrl = () => `https://loremflickr.com/640/480/business?${new Date().getTime()}`;

    // Handle card click
    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`); // Redirect to ProductDetail page
    };

    return (
        <Grid container spacing={4}>
            {products?.products?.map((product) => (
                <Grid item xs={12} md={6} key={product._id}>
                    <CardActionArea onClick={() => handleCardClick(product._id)}>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Learn more
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image={getRandomImageUrl()} // Use the function to get a unique image URL
                                alt={product.name}
                            />
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
    );
}

export default FeaturedProduct;
