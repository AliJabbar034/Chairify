import { config } from "dotenv";
import app from "./app.js";
import { makeConnection } from "./config/database.js";
import cloudinary from "cloudinary";
config({
  path: "backend/config/config.env",
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const port = process.env.PORT || 2000;

await makeConnection();

app.listen(port, () => {
  console.log("Server listening on port ", port);
});
