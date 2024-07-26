// routes/orderRoutes.js
import express from 'express';
import { placeOrder, viewOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authicatedUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Place an order
router.post('/', authicatedUser, placeOrder);

// View orders for a user
router.get('/', authicatedUser, viewOrders);

// Update order status
router.put('/status', authicatedUser, updateOrderStatus);

export default router;
