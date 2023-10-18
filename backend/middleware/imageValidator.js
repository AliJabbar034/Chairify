import multer from "multer";

const storage = multer.memoryStorage();
export const uploadImage = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error(
          "Invalid file type. Only JPEG, PNG, and GIF files are allowed."
        )
      );
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
