import { Router } from "express";
import productHandlers from "../controllers/productControllers";

export const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   price:
 *                     type: integer
 */
router.get("/", productHandlers.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to retrieve details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed product information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 price:
 *                   type: integer
 *       404:
 *         description: Product not found
 */
router.get("/:id", productHandlers.getProductDetails);
