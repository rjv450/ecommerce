
import Product from '../models/Product.js';


export const createVariant = async (req, res) => {


    const { productId } = req.params;
    const { color, stock } = req.body;
    console.log(req.params);
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newVariant = { color, stock };
        product.variants.push(newVariant);
        await product.save();

        res.status(201).json(newVariant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating variant', error: error.message });
    }
};


export const getVariants = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.variants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching variants', error: error.message });
    }
};

// Update a variant for a product
export const updateVariant = async (req, res) => {


    const { productId, variantId } = req.params;
    const { color, stock } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const variant = product.variants.id(variantId);
        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        variant.color = color || variant.color;
        variant.stock = stock !== undefined ? stock : variant.stock;
        await product.save();

        res.status(200).json(variant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating variant', error: error.message });
    }
};


export const deleteVariant = async (req, res) => {
    const { productId, variantId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find and remove the variant from the product's variants array
        const variantIndex = product.variants.findIndex(variant => variant._id.toString() === variantId);
        if (variantIndex === -1) {
            return res.status(404).json({ message: 'Variant not found' });
        }
        product.variants.splice(variantIndex, 1);
        await product.save();

        res.status(200).json({ message: 'Variant deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting variant', error: error.message });
    }
};
