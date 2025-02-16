import { Router } from "express";
import reviewControllers from "../controllers/reviewControllers";

export const router = Router();

/**
 * @swagger
 * /review:
 *   get:
 *     tags:
 *       - Review
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", reviewControllers.getReviews);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     tags:
 *       - Review
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
router.get("/:id", reviewControllers.getReviewById);

/**
 * @swagger
 * /review:
 *   post:
 *     tags:
 *       - Review
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - userId
 *               - imageUrl
 *             properties:
 *               text:
 *                 type: string
 *                 example: "string"
 *               userId:
 *                 type: string
 *                 example: "string"
 *               imageUrl:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       201:
 *         description: Success
 */

router.post("/", reviewControllers.createReview);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     tags:
 *       - Review
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

router.delete("/:id", reviewControllers.deleteReview);
