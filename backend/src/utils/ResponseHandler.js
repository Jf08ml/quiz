class ErrorHandler extends Error {
  constructor(statusCode = 500, message = "Something went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

class SuccessHandler {
  static sendSuccess(res, data, statusCode = 200) {
      res.status(statusCode).json({
          status: 'success',
          statusCode,
          data,
      });
  }
}

export { ErrorHandler, handleError, SuccessHandler };
