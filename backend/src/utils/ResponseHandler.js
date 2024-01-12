/**
 * Class to handle custom errors.
 */
class ErrorHandler extends Error {
  /**
   * Creates an instance of ErrorHandler.
   * @param {number} statusCode - The HTTP status code for the error.
   * @param {string} message - The error message.
   */
  constructor(statusCode = 500, message = "Something went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Feature to handle errors and send a JSON response with the error.
 * @param {Error} err - The error to handle.
 * @param {Object} res - The HTTP response object.
 */
const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

/**
 * Class to handle custom success responses.
 */
class SuccessHandler {
  /**
   * Sends a JSON response with a success message and optional data.
   * @param {Object} res - The HTTP response object.
   * @param {any} data - The data to send in the response.
   * @param {number} statusCode - The HTTP status code for the success response (default: 200).
   */
  static sendSuccess(res, data, statusCode = 200) {
    res.status(statusCode).json({
      status: "success",
      statusCode,
      data,
    });
  }
}

export { ErrorHandler, handleError, SuccessHandler };
