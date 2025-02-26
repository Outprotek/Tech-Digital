import { Router } from "express";
import cartController from "../controllers/cartController";

const router = Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: userId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucsess.
 */
router.get("/", cartController.getCarts);

/**
 * @openapi
 * /cart/{id}:
 *   get:
 *     tags:
 *       - Cart
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
router.get("/:id", cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "string"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     variantId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Success
 */
router.post("/", cartController.createCart);

/**
 * @openapi
 * /cart:
 *   put:
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "string"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     variantId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/", cartController.createCart);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
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
router.delete("/:id", cartController.deleteCart);

export default router;
