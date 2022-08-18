import { Request, Response, NextFunction } from "express";

export default class IndexController {
  public index(req: Request, res: Response, next: NextFunction): void {
    try {
      res.send("Hello World!");
    } catch (err) {
      next(err);
    }
  }
}
