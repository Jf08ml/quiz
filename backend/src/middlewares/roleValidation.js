import jwt from "jsonwebtoken";

/**
 * Middleware to validate user role based on JWT token.
 *
 * This middleware checks if the JWT token provided in the request headers
 * contains a role that is among the roles allowed to access a specific resource.
 *
 * @param {string[]} rolesAllowed - Array of roles allowed to access the resource.
 * @returns {Function} A middleware function used by Express.
 */
const roleValidation = (rolesAllowed) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied: no token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decoded.role;

      if (rolesAllowed.includes(userRole)) {
        next();
      } else {
        res.status(403).json({
          message:
            "Access Denied: You do not have sufficient permissions to perform this action",
        });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default roleValidation;
