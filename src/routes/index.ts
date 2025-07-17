import { Router } from "express";
import { IndexController } from "../controller/IndexController";

export class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const indexController = new IndexController();
    this.router.use("/", indexController.getRouter());
  }

  getRoutes() {
    return this.router;
  }
}
