import React from 'react';
import { useGetProductsQuery } from './../services/products'; // Adjust the import path as needed
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

function MainFeaturedPost() {
    const { data: products, error, isLoading } = useGetProductsQuery({ limit: 1 });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const product = products?.products?.[0];
    const placeholderImage = 'https://loremflickr.com/640/480/business';

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${product ? placeholderImage : 'defaultImageURL'})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {product && <img style={{ display: 'none' }} src={placeholderImage} alt={product.name} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {product?.name || 'Default Title'}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {product?.description || `Default Description `}
                        </Typography>
                        <Link
                            variant="subtitle1"
                            component={RouterLink}
                            to={`/product/${product?._id}`} // Redirect to ProductDetail page
                        >
                            Learn more
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MainFeaturedPost;
