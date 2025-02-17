import { Router } from "express";
import marketController from "../controllers/marketController";

export const router = Router();

/**
 * @swagger
 * /market:
 *   get:
 *     tags:
 *       - Market
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", marketController.getMarkets);

/**
 * @swagger
 * /market/{id}:
 *   get:
 *     tags:
 *       - Market
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", marketController.getMarketById);

/**
 * @swagger
 * /market:
 *   post:
 *     tags:
 *       - Market
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrl
 *               - displayName
 *               - bio
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "string"
 *               displayName:
 *                 type: string
 *                 example: "string"
 *               bio:
 *                 type: string
 *                 example: "string"
 *               email:
 *                 type: string
 *                 example: "string"
 *               phoneNumber:
 *                 type: string
 *                 example: "string"
 *               password:
 *                 type: string
 *                 example: "string"
 *               address:
 *                 type: object
 *                 properties:
 *                   streetName:
 *                     type: string
 *                     example: "string"
 *                   rt:
 *                     type: string
 *                     example: "string"
 *                   rw:
 *                     type: string
 *                     example: "string"
 *                   city:
 *                     type: string
 *                     example: "string"
 *                   province:
 *                     type: string
 *                     example: "string"
 *                   country:
 *                     type: string
 *                     example: "string"
 *     responses:
 *       201:
 *         description: Success
 */

router.post("/", marketController.createMarket);

/**
 * @swagger
 * /market/{id}:
 *   delete:
 *     tags:
 *       - Market
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

router.delete("/:id", marketController.deleteMarket);
