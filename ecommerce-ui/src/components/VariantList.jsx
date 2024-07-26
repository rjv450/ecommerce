import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useUpdateVariantMutation, useGetVariantsQuery ,useAddVariantMutation} from '../services/products'; // Import the new mutation hook

const VariantList = ({ variants, onEdit, isEditMode, productId }) => {
  const [editingVariant, setEditingVariant] = useState(null);
  const [addingVariant, setAddingVariant] = useState(false); // State to handle adding variant
  const [newVariant, setNewVariant] = useState({ color: '', stock: '' }); // State for new variant data
  const [updateVariant] = useUpdateVariantMutation();
  const [addVariant] = useAddVariantMutation(); // Initialize the mutation hook for adding a variant
  const [variantsList, setVariants] = useState(variants);

  const { data: fetchedVariants, refetch, error, isLoading } = useGetVariantsQuery(productId);

  const handleEdit = (variant) => {
    setEditingVariant({ ...variant, productId });
  };

  const handleSave = async () => {
    if (editingVariant) {
      try {
        await updateVariant({
          productId,
          variantId: editingVariant._id,
          ...editingVariant
        }).unwrap();
        await refetch();
        setEditingVariant(null);
        if (onEdit) onEdit(editingVariant);
      } catch (error) {
        console.error('Failed to update variant:', error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      await addVariant({
        productId,
        ...newVariant
      }).unwrap();
      await refetch();
      setAddingVariant(false);
      setNewVariant({ color: '', stock: '' });
    } catch (error) {
      console.error('Failed to add variant:', error);
    }
  };

  const handleChange = (e) => {
    setEditingVariant({
      ...editingVariant,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewVariantChange = (e) => {
    setNewVariant({
      ...newVariant,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (fetchedVariants) {
      setVariants(fetchedVariants);
    }
  }, [fetchedVariants]);

  if (isLoading) return <div>Loading variants...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Variants
        </Typography>
        {isEditMode && !addingVariant && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => setAddingVariant(true)}
          >
            Add Variant
          </Button>
        )}
      </Box>
      {variantsList.map((variant) => (
        <Box key={variant._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            label="Color"
            variant="outlined"
            size="small"
            value={variant.color}
            InputProps={{
              readOnly: !(isEditMode && editingVariant && editingVariant._id === variant._id),
            }}
            sx={{ mr: 1 }}
          />
          <TextField
            label="Stock"
            variant="outlined"
            size="small"
            type="number"
            value={variant.stock}
            InputProps={{
              readOnly: !(isEditMode && editingVariant && editingVariant._id === variant._id),
            }}
          />
          {isEditMode && !editingVariant && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleEdit(variant)}
              sx={{ ml: 1 }}
            >
              Edit
            </Button>
          )}
        </Box>
      ))}
      {editingVariant && isEditMode && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Color"
            variant="outlined"
            fullWidth
            margin="normal"
            name="color"
            value={editingVariant.color}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            name="stock"
            value={editingVariant.stock}
            onChange={handleChange}
          />
          <Button onClick={handleSave} color="primary" variant="contained" sx={{ mt: 2 }}>
            Save Variant
          </Button>
        </Box>
      )}
      {addingVariant && isEditMode && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add New Variant
          </Typography>
          <TextField
            label="Color"
            variant="outlined"
            fullWidth
            margin="normal"
            name="color"
            value={newVariant.color}
            onChange={handleNewVariantChange}
          />
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            name="stock"
            value={newVariant.stock}
            onChange={handleNewVariantChange}
          />
          <Button onClick={handleAdd} color="primary" variant="contained" sx={{ mt: 2 }}>
            Add Variant
          </Button>
          <Button onClick={() => setAddingVariant(false)} color="secondary" variant="outlined" sx={{ mt: 2, ml: 1 }}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VariantList;
