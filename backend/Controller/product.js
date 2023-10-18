import { Product } from "../Model/product.js";
import AppError from "../utils/appError.js";
import catchAsyn from "../utils/catchAsyn.js";
import cloudinary from "cloudinary";
import ApiFeatures from "../utils/find.js";

export const createProduct = catchAsyn(async (req, res, next) => {
  const user = req.user;
  const { title, description, quantity, price, colors, category } = req.body;

  if (
    (!colors || !description || !quantity || !price || !title || !req.file,
    !category)
  ) {
    return next(new AppError("PLeas Provide all Required Fields", 400));
  }

  let coverImage;
  cloudinary.v2.uploader
    .upload_stream({ folder: "coverImage" }, async (error, result) => {
      if (error) {
        return res.status(500).json({
          success: 'fil',
        });
      } else {
        coverImage = result.secure_url;

        const product = await Product.create({
          title,
          description,
          colors,
          price,
          quantity,
          coverImage,
          category,
          user,
        });

        res.status(200).json({
          message: "Product created successfully",
          product,
        });
      }
    })
    .end(req.file.buffer);
});

export const getProducts = catchAsyn(async (req, res, next) => {
  
 console.log(req.query);
  const findApi= new ApiFeatures(Product.find(),req.query).filter().Sort();
  const products = await findApi.query;
  if (!products) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "sccuessful",
    products,
  });
});


export const getProductById = catchAsyn(async (req, res, next) => {
  const {productId} = req.params;
  console.log(productId);

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));

  }

  res.status(200).json({
    product,
  })
})