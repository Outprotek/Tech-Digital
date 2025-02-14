import { Router } from "express";
import userControllers from "../controllers/userControlllers";

export const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     description: Retrieve a list of all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", userControllers.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     description: Retrieve a single user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get("/:id", userControllers.getUser);
