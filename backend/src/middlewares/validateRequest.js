/**
 * Middleware to validate the request body (req.body) against a given schema.
 *
 * This middleware takes a validation scheme as an argument and uses it to validate
 * the incoming data in the request body (req.body). If the data does not comply with
 * the scheme, a response is sent with status 400 and details of the error.
 *
 * @param {Object} schema - Validation schema for the request body.
 * @returns {Function} A middleware function used by Express.
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error, message: error.details[0].message });
    }

    next();
  };
};

export default validate;
