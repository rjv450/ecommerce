import { check, validationResult } from 'express-validator';

export const productValidation = [

    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric().withMessage('Price must be a number'),

    check('variants')
        .optional()
        .isArray().withMessage('Variants should be an array'),
    check('variants.*.color')
        .optional()
        .not().isEmpty().withMessage('Variant color is required'),
    check('variants.*.stock')
        .optional()
        .isNumeric().withMessage('Variant stock must be a number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
export const idValidation = [
    check('id', 'Invalid product ID').isMongoId(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateProductValidation = [
    check('name').optional().isString().withMessage('Name must be a string'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('price').optional().isNumeric().withMessage('Price must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];