import { Request, Response } from "express";
import multer from "multer";
import { Controller } from "../config/Controller";
import { ImageServices } from "../services/ImageServices";

const upload = multer({ storage: multer.memoryStorage() });

export class IndexController extends Controller {
  private imageServices: ImageServices;

  constructor() {
    super();
    this.imageServices = new ImageServices();
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
      {
        method: "get",
        path: "/getImage/:id",
        handler: [this.getImageById.bind(this)],
      },
    ];
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    const publicId = req.params.id;

    if (!publicId) {
      res.status(400).send("Public ID is required");
      return;
    }

    try {
      const imageUrl = await this.imageServices.getImageById(publicId);
      res.status(200).send({
        message: "Image retrieved successfully",
        url: imageUrl,
      });
    } catch (error: unknown) {
      console.error("Error retrieving image:", error);
      res.status(500).send({
        message: "Failed to retrieve image",
        error: error instanceof Error ? error.message : String(error),
      });
    }
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
      const imageUrl = await this.imageServices.uploadImage(file);
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
      const images = await this.imageServices.getPublicIds();
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
