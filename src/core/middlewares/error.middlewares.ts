import { HttpException } from "@core/exceptions";
import { NextFunction, Response, Request } from "express";

const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  console.dir("errorMiddleware", err);
  console.dir("errorMiddleware", status);
  console.dir("errorMiddleware", message);
  res.status(status).json({
    "created by": "errorMiddleware",
    time: new Date(),
    message,
  });
};

export default errorMiddleware;
