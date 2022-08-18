import { Route } from "@core/interfaces/index.interface";
import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "@core/middlewares";
import bodyParser from "body-parser";

class App {
  public app: express.Application;
  private port: string | number;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.production = process.env.NODE_ENV == "production" ? true : false;
    this.connectDb();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
  }

  private initializeMiddleware() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan("combined"));
      this.app.use(cors({ origin: "your.domain.com", credentials: true }));
    } else {
      this.app.use(morgan("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectDb(): any {
    try {
      const url = process.env.MONGO_URL;
      if (!url) {
        return;
      }
      mongoose.connect(url);
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  }
}

export default App;
