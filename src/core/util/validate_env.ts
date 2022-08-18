import { cleanEnv, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    MONGO_URL: str(),
  });
};
export default validateEnv;
