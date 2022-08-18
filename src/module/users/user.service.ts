import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/util";
import { dataInToken, tokenData } from "@module/auth";
import createUserDto from "./dto/createUser.dto";
import UserSchema from "./schema/user.schema";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import interfaceUser from "./interface/user.interface";
import jwt from "jsonwebtoken";

export default class UserService {
  public userSchema = UserSchema;

  public async createUser(user: any): Promise<tokenData> {
    console.log("createUser", user);
    if (isEmptyObject(user)) {
      throw new HttpException(400, "User data is empty");
    }
    const data = await this.userSchema.findOne({ email: user.email });
    if (data) {
      throw new HttpException(409, "User already exists");
    }
    const avatar = gravatar.url(user.email!, {
      s: "200",
      r: "g",
      d: "mm",
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password!, salt);
    const newUser = await this.userSchema.create({
      ...user,
      avatar,
      password: hashedPassword,
    });
    return this.createToken(newUser);
  }

  private createToken(data: interfaceUser): tokenData {
    const dataToken: dataInToken = { id: data._id };
    const secret: string = process.env.JWT_SECRET!;
    const expiresIn = "1h";
    console.log("createToken", expiresIn);
    return {
      token: jwt.sign(dataToken, secret, { expiresIn }),
    };
  }
}
