import { v2 } from "cloudinary";
import { CloudinaryConfig } from "../config/Cloudinary";

export class GetPublicIdsService {
  private cloudinaryConfig: CloudinaryConfig;

  constructor(cloudinaryConfig: CloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
  }

  async getPublicIds(): Promise<string[]> {
    if (!this.cloudinaryConfig.initialize()) {
      throw new Error("Cloudinary is not configured");
    }

    const resourcesRetrivel = await v2.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 30,
    });

    if (!resourcesRetrivel) {
      throw new Error("Failed to retrieve images");
    }

    const publicIds = resourcesRetrivel.resources.map(
      (resource: { public_id: string }) => {
        return resource.public_id;
      }
    );

    return Promise.resolve(publicIds);
  }
}
