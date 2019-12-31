import { ExpressResponse } from "express-methods";
import { authModel } from "./auth.model";
import { hashPassword, createJwt, validateJwt } from "../../common/common.util";
import { AuthDTO } from "./auth.dto";
import { Request } from "express";
import { BadRequest } from "http-errors";
export class AuthService {
  async login(req: Request, res: ExpressResponse, next) {
    try {
      const auth: AuthDTO = req.body;
      auth.password = await hashPassword(auth.password);
      const result = await authModel.findOne(auth);

      if (!result) {
        throw new BadRequest();
      }

      const token = await createJwt({ user: auth.userName });

      res.finish({ token });
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: ExpressResponse, next) {
    try {
      const auth: AuthDTO = req.body;
      auth.password = await hashPassword(auth.password);

      await new authModel(auth).save();

      res.finish({}, "User Registered!");
    } catch (error) {
      next(error);
    }
  }
}
