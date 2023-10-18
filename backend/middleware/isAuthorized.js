import AppError from "../utils/appError.js";

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not authorized to access this resource. Please provide valid credentials",
          401
        )
      );
    }
    next();
  };
};
