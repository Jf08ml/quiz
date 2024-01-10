import * as userService from "../services/userService.js";
import { ErrorHandler, handleError } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { loginSchema } from "../validations/userValidation.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const savedUser = await userService.createUser(username, password, role);

    if (savedUser) {
      const token = jwt.sign(
        { id: savedUser._id, role: role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.status(201).send({ id: savedUser._id, token });
    }
  } catch (error) {
    handleError(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Username or password incorrect");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.send({ message: "Successful authentication", token });
  } catch (error) {
    handleError(error, res);
  }
};

export { registerUser, loginUser };
