import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a title"],
      trim: true,
    },
    description: String,
    rating: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.statics.calculateAverageRating = async function (productId) {
  let averageRating = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReview: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: averageRating[0]?.averageRating.toFixed(1) || 0,
        numOfReview: averageRating[0]?.numOfReview || 0,
      }
    );
  } catch (error) {}
};
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

export const Review = mongoose.model("Review", reviewSchema);
