export const runtime = "nodejs"; // ✅ important

import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

// 2. Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  if (!file) return null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "omnimart_groceries",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }
          resolve(result?.secure_url ?? null);
        },
      );

      Readable.from(buffer).pipe(stream);
    });
  } catch (error) {
    console.error("Upload Logic Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
