import express from "express";
import { createProduct, getProductById, getProducts } from "../Controller/product.js";
import { uploadImage } from "../middleware/imageValidator.js";
import Authenticate from "../middleware/Authenticate.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const productRouter = express.Router();

productRouter
  .route("/createProduct")
  .post(
    Authenticate,
    isAuthorized("admin"),
    uploadImage.single("coverImage"),
    createProduct
  );


productRouter.route("/getProducts").get(getProducts);
productRouter.route('/:productId').get(getProductById);

export default productRouter;
