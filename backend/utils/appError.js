class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4")
      ? "fail"
      : "Internal Server Error";
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
