import express from "express";
import validate from "../middlewares/validateRequest.js";
import { registerSchema } from "../validations/userValidation.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", loginUser);

export default router;
