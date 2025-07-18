import { v2 } from "cloudinary";
import { CloudinaryConfig } from "../config/Cloudinary";

export class ImageUploadService {
  private cloudinaryConfig: CloudinaryConfig;
  constructor(cloudinaryConfig: CloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.cloudinaryConfig.getConfig()) {
      throw new Error("Cloudinary is not configured");
    }

    const id = Math.random().toString(36).substring(2, 15);

    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const uploadResult = await v2.uploader.upload(dataUri, {
      resource_type: "auto",
      public_id: id,
    });

    if (!uploadResult) {
      throw new Error("Image upload failed");
    }

    return Promise.resolve(uploadResult.secure_url);
  }
}
