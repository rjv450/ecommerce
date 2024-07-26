import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Typography, Paper, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBack icon
import ProductList from '../components/ProductList';


const ProductManagementDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackClick = () => {
    navigate('/dashboard'); // Redirect to the dashboard
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Box sx={{ mb: 2 }}>
        <IconButton onClick={handleBackClick} color="primary">
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" gutterBottom>
        Product Management Dashboard
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <ProductList />
      </Paper>
    </Container>
  );
};

export default ProductManagementDashboard;
