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
 *         description: Sucsess.
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details.
 *       404:
 *         description: Product not found.
 */
router.get("/:id", productHandlers.getProductDetails);

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *               productName:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               soldOut:
 *                 type: integer
 *               marketId:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Success Created
 */
router.post("/", productHandlers.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *               productName:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               soldOut:
 *                 type: integer
 *               marketId:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                     desc:
 *                       type: string
 *     responses:
 *       200:
 *         description: Success Edited
 */
router.put("/:id", productHandlers.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucsses Delete.
 */
router.delete("/:id", productHandlers.deleteProduct);
