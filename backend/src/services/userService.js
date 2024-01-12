import User from "../models/User.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/ResponseHandler.js";

/**
 * Create a new user in the database.
 *
 * @async
 * @param {string} username - Username of the new user.
 * @param {string} password - Password of the new user.
 * @param {string} role - Role of the new user.
 * @returns {Promise<Object>} The created user.
 * @throws {ErrorHandler} Error creating user.
 */
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

/**
 * Searches for a user by username in the database.
 *
 * @async
 * @param {string} username - Username to search for.
 * @returns {Promise<Object>} The user found.
 * @throws {ErrorHandler} Error searching for user or user not found.
 */
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
