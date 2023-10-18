import { User } from "../Model/user.js";
import AppError from "../utils/appError.js";
import catchAsyn from "../utils/catchAsyn.js";
import json from "jsonwebtoken";
const Authenticate = catchAsyn(async (req, res, next) => {
  const token = req.cookies.token;
 
console.log(token);
  if (!token) {
    return next(new AppError("Authentication failed", 401));
  }
  console.log('next token');
  const decode = await json.verify(token, process.env.jwtSecret);
  req.user = await User.findById({ _id: decode._id });
  next();
});

export default Authenticate;
