import multer from "multer";
import path from "path";
import fs from "fs"

const uploadDir = path.join("uploads", "products")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the folder exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir)
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
export default multer({ storage });
