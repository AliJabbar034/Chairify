import express from "express";
import Authenticate from "../middleware/Authenticate.js";
import { createReview, getAllReviews } from "../Controller/reviews.js";

const reviewRouter = express.Router();

reviewRouter.route("/:productId/review").post(Authenticate, createReview).get(getAllReviews);

export default reviewRouter;
