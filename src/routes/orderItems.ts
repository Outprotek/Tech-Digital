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
 * /orderitems:
 *   post:
 *     tags:
 *       - OrderItems
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - orderId
 *               - productId
 *               - quantity
 *               - totalPrice
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "string"
 *               orderId:
 *                 type: string
 *                 example: "string"
 *               productId:
 *                 type: string
 *                 example: "string"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               totalPrice:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Success
 */

router.post("/", orderItems.createOrder);

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
