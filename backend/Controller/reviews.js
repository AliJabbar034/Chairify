import { Review } from "../Model/review.js";
import AppError from "../utils/appError.js";
import catchAsyn from "../utils/catchAsyn.js";
import mongoose
 from "mongoose";
export const createReview = catchAsyn(async (req, res, next) => {
  console.log('review');
  const user = req.user;
  const { title, description, rating } = req.body;
  const { productId } = req.params;
  
  if (!title || !rating) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const review = await Review.create({
    title,
    description,
    rating,
    product: productId,
    user,
  });
  console.log(review);

  res.status(200).json({
    review,
  });
});

export const getAllReviews = catchAsyn(async (req, res, next) => {

  const { productId } = req.params;

  const reviews = await Review.find({ product: productId }).populate({path:'user' , select:'name'});
  if( ! reviews){
    return next(new AppError("No reviews found", 404));
  }
  res.status(200).json({
    reviews,
  });

})
