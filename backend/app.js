import express, { json } from "express";
import { errorHandler } from "./middleware/errorHandler.js";

import morgan from "morgan";
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", function (err, req, res, next) {
  return next(new AppError("not found", 404));
});
app.use(errorHandler);
export default app;
