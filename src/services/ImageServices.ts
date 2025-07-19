import { CloudinaryConfig } from "../config/Cloudinary";
import { GetImageByIdService } from "./GetImage";
import { GetPublicIdsService } from "./GetPublicIds";
import { ImageUploadService } from "./UploadImage";

export class ImageServices {
  private uploadImageService: ImageUploadService;
  private getPublicIdsService: GetPublicIdsService;
  private getImageByIdService: GetImageByIdService;

  constructor() {
    this.uploadImageService = new ImageUploadService(new CloudinaryConfig());
    this.getPublicIdsService = new GetPublicIdsService(new CloudinaryConfig());
    this.getImageByIdService = new GetImageByIdService(new CloudinaryConfig());
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return this.uploadImageService.uploadImage(file);
  }

  async getPublicIds(): Promise<string[]> {
    return this.getPublicIdsService.getPublicIds();
  }

  async getImageById(publicId: string): Promise<string> {
    return this.getImageByIdService.getImageById(publicId);
  }
}
