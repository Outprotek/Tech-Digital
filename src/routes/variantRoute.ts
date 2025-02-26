import { Router } from "express";
import variantController from "../controllers/variantController";

const router = Router();

/**
 * @swagger
 * /variant:
 *   get:
 *     tags:
 *       - Variant
 *     parameters:
 *       - name: productId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", variantController.getVariants);

/**
 * @swagger
 * /variant/{id}:
 *   get:
 *     tags:
 *       - Variant
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", variantController.getVariantById);

/**
 * @swagger
 * /variant:
 *   post:
 *     tags:
 *       - Variant
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - price
 *               - stock
 *               - productId
 *             properties:
 *               label:
 *                 type: string
 *                 example: "string"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 0
 *               stock:
 *                 type: integer
 *                 example: 0
 *               productId:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       201:
 *         description: Success
 */
router.post("/", variantController.createVariant);

/**
 * @swagger
 * /variant/{id}:
 *   delete:
 *     tags:
 *       - Variant
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:id", variantController.deleteVariant);

export default router;
