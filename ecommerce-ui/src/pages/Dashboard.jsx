import React from 'react';
import Container from '@mui/material/Container';
import FeaturedProduct from '../components/FeaturedPost';
import MainFeaturedPost from '../components/MainfeaturedPost';
import Checkout from '../components/Cart';

const Dashboard = () => {
    return (
        <div>
            <Container component="main">
                <MainFeaturedPost />
                <FeaturedProduct />

            </Container>
        </div>
    );
};

export default Dashboard;
