import mongoose from "mongoose";

export const makeConnection = async () => {
  try {
    const url = `${process.env.MONGO_URL}`.replace(
      "<password>",
      process.env.MONGO_PASS
    );

    const connected = await mongoose.connect(url);
    console.log("connected successfully");
  } catch (error) {
    console.log("error connecting to Database: " + error.message);
    process.exit(1);
  }
};
