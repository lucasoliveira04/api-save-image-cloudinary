import { Request, Response } from "express";
import multer from "multer";
import { Controller } from "../config/Controller";

const upload = multer({ storage: multer.memoryStorage() });

export class IndexController extends Controller {
  protected initializeRoutes(): void {
    this.routes = [
      {
        method: "post",
        path: "/uploadFile",
        handler: [upload.single("file"), this.index.bind(this)],
      },
    ];
  }

  async index(req: Request, res: Response): Promise<void> {
    const file = req.file;

    if (!file) {
      res.status(400).send("No file provided");
      return;
    }

    const imageObject = {
      originalname: file.originalname,
      typeImage: file.mimetype,
      size: file.size,
    };

    res.status(200).send({
      message: "File received successfully",
      file: {
        image_properties: imageObject,
      },
    });
  }
}
