import { User } from "../Model/user.js";
import AppError from "../utils/appError.js";
import catchAsyn from "../utils/catchAsyn.js";
import sendToken from "../utils/sendToken.js";

export const createUser = catchAsyn(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return next(new AppError("Provide all required parameters", 400));
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new AppError("Already user exist", 409));
  }
  
  const user = await User.create({
    name,
    email,
    password,
  });

  await sendToken(user, 200, res);
});

export const getmessage = catchAsyn(async (req, res) => {
  res.status(200).json({
    message: "Hello",
    user: req.user,
  });
});

export const loginUser = catchAsyn(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please enter a valid email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Invalid password or email", 401));
  }

  await sendToken(user, 200, res);
});


export const userProfile= catchAsyn(async (req, res) => {
  res.status(200).json({
    
    user: req.user,
  });
})

export const logOut = catchAsyn(async (req, res) => {
  const options = 
  res.status(200).cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    user:{}
  })

})