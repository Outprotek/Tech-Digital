import { Router } from "express";
import cateogoryController from "../controllers/cateogoryController";

export const router = Router();

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", cateogoryController.getCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", cateogoryController.getCategoryById);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *             properties:
 *               label:
 *                 type: string
 *                 example: "string"
 *               desc:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       201:
 *         description: Success
 */

router.post("/", cateogoryController.createCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 */

router.delete("/:id", cateogoryController.deleteCategory);
