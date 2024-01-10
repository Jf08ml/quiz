import User from "../models/User.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const createUser = async (username, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    return await user.save();
  } catch (error) {
    console.error(error);
    throw new ErrorHandler(500, "Error creating user");
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  } catch (error) {
    throw new ErrorHandler(500, "Error searching for user");
  }
};

export { createUser, findUserByUsername };
