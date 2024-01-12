import mongoose from "mongoose";

/**
 * User Model for the database.
 *
 * @typedef {Object} User
 * @ @property {string} username - User name, must be unique.
 * @ @property {string} password - User password.
 * @ @property {string} role - User role, can be 'admin', 'player' or 'moderator'.
 */

/**
 * Mongoose schema for the User model.
 * Defines the structure of a User document in the database.
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "player", "moderator"],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
