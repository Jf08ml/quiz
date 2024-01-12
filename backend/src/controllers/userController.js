import * as userService from "../services/userService.js";
import {
  ErrorHandler,
  handleError,
  SuccessHandler,
} from "../utils/ResponseHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginSchema } from "../validations/userValidation.js";

/**
 * Driver to register a new user.
 *
 * @param {Object} req - HTTP request object with user data in 'req.body'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} Registered user data and token in a JSON response.
 */
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const savedUser = await userService.createUser(username, password, role);

    if (savedUser) {
      const token = jwt.sign(
        { id: savedUser._id, role: role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const data = { id: savedUser._id, token };
      SuccessHandler.sendSuccess(res, data);
    } else {
      throw new ErrorHandler(500, "User could not be created");
    }
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Handler to authenticate a user and generate an access token.
 *
 * @param {Object} req - HTTP request object with the login data in 'req.body'.
 * @param {Object} res - HTTP response object.
 * @returns {Promise<void>} Access token in a JSON response.
 */
const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ErrorHandler(401, "Username or password incorrect");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const data = { token };
    SuccessHandler.sendSuccess(res, data);
  } catch (error) {
    handleError(error, res);
  }
};

export { registerUser, loginUser };
