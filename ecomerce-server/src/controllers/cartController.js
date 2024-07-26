import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// View Cart
export const viewCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json([]);
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};

// Add to Cart
export const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, variantId, quantity } = req.body;

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Check if the variant exists within the product
        const variantExists = product.variants.some(variant => variant._id.toString() === variantId);
        if (!variantExists) {
            return res.status(400).json({ message: 'Invalid variant ID for the specified product' });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.variantId.toString() === variantId);
        
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, variantId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

// Update Cart Item
export const updateCartItem = async (req, res) => {
    const userId = req.user._id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

// Clear Cart
export const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};
