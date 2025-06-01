import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/products/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure directory exists
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export default multer({ storage });
