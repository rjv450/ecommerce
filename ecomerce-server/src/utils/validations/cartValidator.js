// middlewares/validators/cartValidator.js
import { body, param, validationResult } from 'express-validator';

// Validation rules
export const addToCartValidator = [
    body('productId')
        .isMongoId().withMessage('Invalid product ID'),
    body('variantId')
        .isMongoId().withMessage('Invalid variant ID'),
    body('quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateCartItemValidator = [
    param('itemId')
        .isMongoId().withMessage('Invalid item ID'),
    body('quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
