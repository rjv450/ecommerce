import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Place an Order
export const placeOrder = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let totalAmount = 0;
        const itemsWithPrice = await Promise.all(cart.items.map(async item => {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error('Invalid product ID');
            }

            const variant = product.variants.id(item.variantId);
            if (!variant) {
                throw new Error('Invalid variant ID for the specified product');
            }

            const price = variant.price; // Assuming price is stored in variant
            totalAmount += item.quantity * price;

            return {
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price,
            };
        }));

        const order = new Order({
            userId,
            items: itemsWithPrice,
            totalAmount,
        });

        await order.save();
        await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

// View Orders
export const viewOrders = async (req, res) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        order.updatedAt = Date.now();
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};
