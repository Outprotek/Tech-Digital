import { Router } from "express";
import orderItems from "../controllers/orderItems";

export const router = Router();

/**
 * @swagger
 * /orderitems:
 *   get:
 *     tags:
 *       - OrderItems
 *     responses:
 *       200:
 *         description: Sucsess.
 */
router.get("/", orderItems.getOrders);

/**
 * @swagger
 * /orderitems/{id}:
 *   get:
 *     tags:
 *       - OrderItems
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
router.get("/:id", orderItems.getOrder);

/**
 * @swagger
 * /orderitems/{id}:
 *   delete:
 *     tags:
 *       - OrderItems
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
router.delete("/:id", orderItems.deleteOrder);
