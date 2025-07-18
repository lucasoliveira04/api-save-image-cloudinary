import { Router } from "express";
import { IndexController } from "../controller/IndexController";

export class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const PREFIX: string = "/api";

    const indexController = new IndexController();
    this.router.use(`${PREFIX}/`, indexController.getRouter());
  }

  getRoutes() {
    return this.router;
  }
}
