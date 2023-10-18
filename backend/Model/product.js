import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " title is required"],
    },
    description: {
      type: String,
      required: [true, " description is required"],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReview: {
      type: Number,
      default: 0,
    },

    colors: [
      {
        type: String,
        required: true,
        default: "black",
      },
    ],
    // images: [String],
    quantity: {
      type: Number,
      required: [true, " quantity is required"],
    },
    coverImage: {
      type: String,
      required: [true, " image is required"],
    },
    price: {
      type: Number,
      required: [true, " price is required"],
    },
    category: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.pre("deleteOne", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
  next();
});

export const Product = mongoose.model("Product", productSchema);
