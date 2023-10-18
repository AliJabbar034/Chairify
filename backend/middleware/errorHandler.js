export function errorHandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "INTERNAL ERROR";
  error.status = error.status || "ERROR";

  res.status(error.statusCode).json({
    message: error.message,
    staus: error.status,
  });
}
