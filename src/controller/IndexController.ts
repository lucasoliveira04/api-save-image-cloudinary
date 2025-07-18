import { Request, Response } from "express";
import multer from "multer";
import { Controller } from "../config/Controller";
import { ImageUploadService } from "../services/UploadImage";
import { CloudinaryConfig } from "../config/Cloudinary";
import { GetPublicIdsService } from "../services/GetPublicIds";

const upload = multer({ storage: multer.memoryStorage() });

export class IndexController extends Controller {
  private uploadImageService: ImageUploadService;
  private getPublicIdsService: GetPublicIdsService;

  constructor() {
    super();
    this.uploadImageService = new ImageUploadService(new CloudinaryConfig());
    this.getPublicIdsService = new GetPublicIdsService(new CloudinaryConfig());
  }

  protected initializeRoutes(): void {
    this.routes = [
      {
        method: "post",
        path: "/uploadFile",
        handler: [upload.single("file"), this.upload.bind(this)],
      },

      {
        method: "get",
        path: "/getListAllImages",
        handler: [this.getPublicIds.bind(this)],
      },
    ];
  }

  async upload(req: Request, res: Response): Promise<void> {
    const file = req.file;

    if (!file) {
      res.status(400).send("No file provided");
      return;
    }

    const imageObject: {
      originalname: string;
      typeImage: string;
      size: number;
      url?: string;
    } = {
      originalname: file.originalname,
      typeImage: file.mimetype,
      size: file.size,
    };

    try {
      const imageUrl = await this.uploadImageService.uploadImage(file);
      imageObject.url = imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    res.status(200).send({
      message: "File received successfully",
      file: {
        image_properties: imageObject,
      },
    });
  }

  async getPublicIds(req: Request, res: Response): Promise<void> {
    try {
      const images = await this.getPublicIdsService.getPublicIds();
      res.status(200).send({
        message: "List of images retrieved successfully",
        public_ids: images,
      });
    } catch (error: unknown) {
      console.error("Error retrieving images:", error);
      res.status(500).send({
        message: "Failed to retrieve images",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
