import { v2 as cloudinary } from "cloudinary";

const dotenv = require("dotenv").config();

export class CloudinaryConfig {
  CLOUDINARY_CLOUD_NAME = dotenv.parsed.NODE_CLOUDINARY_CLOUD_NAME;
  CLOUDINARY_API_KEY = dotenv.parsed.NODE_CLOUDINARY_API_KEY;
  CLOUDINARY_API_SECRET = dotenv.parsed.NODE_CLOUDINARY_API_SECRET;
  getConfig(): boolean {
    const connect = cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET,
    });

    return !!connect;
  }

  initialize(): boolean {
    if (!this.getConfig()) {
      throw new Error("Cloudinary configuration failed");
    }
    console.log("Cloudinary configured successfully");
    return true;
  }
}
