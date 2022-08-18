import { validateEnv } from "@core/util";
import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@module/index";
import { UserRoute } from "@module/users";

validateEnv();
const routes = [new IndexRoute(), new UserRoute()];
const app = new App(routes);

app.listen();
