import express from "express";
import validate from "../middlewares/validateRequest.js";
import { registerSchema } from "../validations/userValidation.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

/**
 * Routes for user management.
 */

// POST /register: Register a new user.
// Use the 'validate' middleware to validate the data according to 'registerSchema'.
router.post("/register", validate(registerSchema), registerUser);

// POST /login: Log in with an existing user.
router.post("/login", loginUser);

export default router;
