import UsersController from "./user.controller";
import { Route } from "@core/interfaces/index.interface";
import { Router } from "express";

export default class UserRoute implements Route {
  public path: string = "/api/user";
  public router = Router();

  private usersController = new UsersController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.usersController.registerUser);
  }
}
