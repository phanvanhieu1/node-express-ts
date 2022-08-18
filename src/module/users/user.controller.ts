import UserService from "./user.service";
import createUserDto from "./dto/createUser.dto";
import { tokenData } from "@module/auth";
import { ResponseUtils } from "@core/util";
import { Request, Response, NextFunction } from "express";
export default class UsersController {
  private userService = new UserService();
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: createUserDto = req.body;
      const rs: tokenData = await this.userService.createUser(model);
      res.status(200).json(rs);
    } catch (error) {
      next(error);
    }
  };
}
