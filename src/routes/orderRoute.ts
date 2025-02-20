import { Router } from "express";
import productHandlers from "../controllers/productControllers";
import orderController from "../controllers/orderController";

export const router = Router();

/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: Sucsess.
 */
router.get("/", orderController.getOrders);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details.
 */
router.get("/:id", orderController.getOrder);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     tags:
 *       - Order
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
router.delete("/:id", orderController.deleteOrder);
