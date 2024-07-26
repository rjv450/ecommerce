// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useGetProductsQuery, useGetProductByIdQuery, useUpdateProductMutation } from '../services/products';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import VariantList from './VariantList';

const ProductList = () => {
  const { data, error, isLoading, refetch } = useGetProductsQuery({ page: 1, limit: 10 });
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const { data: fetchedProductDetails, error: productError, isLoading: productLoading } = useGetProductByIdQuery(selectedProductId, {
    skip: !selectedProductId, // Skip the query if no ID is selected
  });
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (fetchedProductDetails) {
      setProductDetails(fetchedProductDetails);
    }
  }, [fetchedProductDetails]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', type: 'number', width: 110 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row._id)}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{ ml: 1 }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  const handleView = (id) => {
    setSelectedProductId(id);
    setOpenView(true);
  };

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProductId(null);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedProductId(null);
  };

  const handleSave = async () => {
    if (productDetails) {
      try {
        const updatedProduct = {
          name: productDetails.name,
          description: productDetails.description,
          price: productDetails.price,
        };

        await updateProduct({ id: selectedProductId, ...updatedProduct }).unwrap();
        refetch();
        handleCloseEdit();
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  const handleVariantEdit = (updatedVariant) => {
    console.log('Updating variant for product:', selectedProductId, updatedVariant);
    // Implement update logic for the variant, including the product ID
  };

  const rows = data.products.map((product, index) => ({
    _id: product._id,
    id: index + 1, // Sequential ID starting from 1
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.variants.reduce((total, variant) => total + variant.stock, 0),
  }));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />

      {/* Edit Product Modal */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {productLoading ? (
            <div>Loading product details...</div>
          ) : productError ? (
            <div>Error: {productError.message}</div>
          ) : (
            productDetails && (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={productDetails.name}
                  onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={productDetails.description}
                  onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={productDetails.price}
                  onChange={(e) => setProductDetails({ ...productDetails, price: parseFloat(e.target.value) })}
                />
                <VariantList variants={productDetails.variants} onEdit={handleVariantEdit} isEditMode={true} productId={productDetails._id} />
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={openView} onClose={handleCloseView} fullWidth>
        <DialogTitle>View Product</DialogTitle>
        <DialogContent>
          {productLoading ? (
            <div>Loading product details...</div>
          ) : productError ? (
            <div>Error: {productError.message}</div>
          ) : (
            productDetails && (
              <Box component="div" sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={productDetails.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={productDetails.description}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={productDetails.price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  <h4>Variants:</h4>
                  <VariantList variants={productDetails.variants} onEdit={() => {}} isEditMode={false} productId={productDetails._id} /> {/* Disable editing */}
                </Box>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
