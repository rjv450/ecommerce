
import { check, validationResult } from 'express-validator';


export const validateCreateVariant = [
    check('color').isAlphanumeric().withMessage('Color must be alphanumeric'),
    check('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdateVariant = [

    check('color').optional().isAlphanumeric().withMessage('Color must be alphanumeric'),
    check('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

