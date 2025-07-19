import { v2 } from "cloudinary";
import { CloudinaryConfig } from "../config/Cloudinary";

export class GetImageByIdService {
  private cloudinaryConfig: CloudinaryConfig;

  constructor(cloudinaryConfig: CloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
  }

  async getImageById(publicId: string): Promise<string> {
    if (!this.cloudinaryConfig.initialize()) {
      throw new Error("Cloudinary is not configured");
    }

    const resource = await v2.api.resource(publicId, {
      type: "upload",
      resource_type: "image",
      url: true,
    });

    if (!resource || !resource.secure_url) {
      throw new Error("Image not found");
    }

    return resource.secure_url;
  }
}
