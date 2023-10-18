import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import json from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "name should be greater than 3"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: String,
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: {
      type: Number,
    },
    otp_expirey: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.getjwtToken = async function () {
  const token = await json.sign({ _id: this._id }, process.env.jwtSecret, {
    expiresIn: process.env.jwtExpiry,
  });
  return token;
};
export const User = mongoose.model("User", userSchema);
