import jwt from "jsonwebtoken";

const roleValidation = (rolesAllowed) => {
  return (req, res, next) => {
    const token = req.headers.authorization

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
        res
          .status(403)
          .json({
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
