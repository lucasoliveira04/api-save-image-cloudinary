import { Router, Request, Response } from "express";

type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";

export interface RouteDefinition {
  method: HTTPMethod;
  path: string;
  handler: (req: Request, res: Response) => Promise<void> | void;
}

export abstract class Controller {
  protected router: Router;
  protected routes: RouteDefinition[] = [];

  constructor() {
    this.router = Router();
    this.initializeRoutes(); 
    this.registerRoutes(); 
  }


  protected abstract initializeRoutes(): void;

  private registerRoutes() {
    for (const route of this.routes) {
      this.router[route.method](route.path, route.handler.bind(this));
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
