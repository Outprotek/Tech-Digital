import { Router } from "express";
import userControllers from "../controllers/userControlllers";

export const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - name: userId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:userId?", userControllers.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
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
router.get("/:id", userControllers.getUser);

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - displayName
 *               - email
 *               - phoneNumber
 *               - age
 *               - password
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "string"
 *               userName:
 *                 type: string
 *                 example: "string"
 *               displayName:
 *                 type: string
 *                 example: "string"
 *               email:
 *                 type: string
 *                 example: "string"
 *               phoneNumber:
 *                 type: string
 *                 example: "string"
 *               age:
 *                 type: integer
 *                 example: 0
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

router.post("/", userControllers.createUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
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

router.delete("/:id", userControllers.deleteUser);
