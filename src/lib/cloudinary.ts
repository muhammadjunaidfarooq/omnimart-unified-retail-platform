import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  if (!file) return null;

  try {
    // 1. Convert Blob to Buffer for Node.js compatibility
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      // 2. Create the upload stream instance
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "omnimart_groceries" }, // Added folder for organization
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result?.secure_url ?? null);
          }
        },
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Upload Logic Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
