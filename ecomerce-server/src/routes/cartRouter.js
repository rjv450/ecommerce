
import express from 'express';
import { viewCart, addToCart, updateCartItem, clearCart } from '../controllers/cartController.js';
import {  authicatedUser } from '../middlewares/authMiddleware.js';
import { addToCartValidator, updateCartItemValidator } from '../utils/validations/cartValidator.js';

const router = express.Router();

router.get('/', authicatedUser, viewCart);
router.post('/', authicatedUser,addToCartValidator, addToCart);
router.put('/items/:itemId', authicatedUser,updateCartItemValidator, updateCartItem);
router.delete('/', authicatedUser, clearCart);

export default router;
