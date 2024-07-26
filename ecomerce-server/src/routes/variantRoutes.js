import express from 'express';

import { createVariant, getVariants, updateVariant, deleteVariant } from '../controllers/variantController.js';
import { authicatedUser } from '../middlewares/authMiddleware.js';
import { validateCreateVariant, validateUpdateVariant } from '../utils/validations/variantValidator.js';

const router = express.Router();

/**
 * @openapi
 * /api/product/{productId}/variants:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new variant for a product
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product to create a variant for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variant'
 *     responses:
 *       201:
 *         description: Variant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post('/:productId/variants', authicatedUser,validateCreateVariant, createVariant);

/**
 * @openapi
 * /api/product/{productId}/variants:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all variants for a product
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product to get variants for
 *     responses:
 *       200:
 *         description: List of variants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variant'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:productId/variants', authicatedUser, getVariants);

/**
 * @openapi
 * /api/product/{productId}/variants/{variantId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a variant for a product
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the variant to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variant'
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or variant not found
 *       500:
 *         description: Server error
 */
router.put('/:productId/variants/:variantId', authicatedUser,validateUpdateVariant, updateVariant);

/**
 * @openapi
 * /api/product/{productId}/variants/{variantId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a variant for a product
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the product
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the variant to delete
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or variant not found
 *       500:
 *         description: Server error
 */
router.delete('/:productId/variants/:variantId', authicatedUser, deleteVariant);

export default router;
