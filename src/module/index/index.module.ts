import Route from "core/interfaces/routes.interface";
import { Router } from "express";
import IndexController from "./index.controller";

export default class IndexRoute implements Route {
  public path: string = "/";
  public router = Router();

  public IndexController = new IndexController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.IndexController.index);
  }
}
