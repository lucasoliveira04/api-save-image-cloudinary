import { Router, Request, Response, RequestHandler } from "express";

type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";

export interface RouteDefinition {
  method: HTTPMethod;
  path: string;
  handler: RequestHandler | RequestHandler[];
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
      if (Array.isArray(route.handler)) {
        this.router[route.method](route.path, ...route.handler);
      } else {
        this.router[route.method](route.path, route.handler);
      }
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
