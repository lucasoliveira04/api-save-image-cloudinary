import { Request, Response, Router } from "express";
import { Controller } from "../config/Controller";

export class IndexController extends Controller {

  protected initializeRoutes(): void {
    this.routes = [
      {
        method: "get",
        path: "/",
        handler: this.index.bind(this),
      },
    ];
  }

  async index(req: Request, res: Response): Promise<void> {
    res.send("Welcome to the Express server!");
  }
}
