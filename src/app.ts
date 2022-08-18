import Route from "core/interfaces/routes.interface";
import express from "express";
import mongoose from "mongoose";

class App {
  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.initializeRoutes(routes);
    this.connectDb();
  }

  public app: express.Application;

  private port: string | number;

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
