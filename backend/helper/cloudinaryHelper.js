import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadImageCloudanary = async (filePath, foldername) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(filePath, {
      folder: foldername,
    });
     fs.unlinkSync(filePath);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};
