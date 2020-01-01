import { ExpressResponse, ExpressError } from "express-methods";
import { authModel, loggedInModel } from "./auth.model";
import { hashPassword, createJwt, validateJwt, comparePassword } from "../../common/common.util";
import { AuthDTO } from "./auth.dto";
import { Request } from "express";
import { BadRequest } from "http-errors";
import { AuthRepository, LoggedInRepository } from "./auth.repository";
import { Details } from 'express-useragent'

const Auth = new AuthRepository()
const LoggedIn = new LoggedInRepository()
export class AuthService {
  async login(req: Request, res: ExpressResponse, next) {
    try {
      const authPayload: AuthDTO = req.body;
      authPayload.password = await hashPassword(authPayload.password);
      const result = await Auth.find(authPayload)

      if (!result) {
        throw new ExpressError("User not found!", 400)
      }

      await comparePassword(result.password, authPayload.password)

      const loggedInPayload = <Details>{
        ...req.useragent,
        userId: result._id
      }
      const loggedInResult = await LoggedIn.save(loggedInPayload)

      const token = await createJwt({ userName: authPayload.userName });

      res.finish({ token, loggedIn: loggedInResult._id });
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: ExpressResponse, next) {
    try {
      const auth: AuthDTO = req.body;
      auth.password = await hashPassword(auth.password);

      await Auth.save(auth)

      res.finish({}, "User Registered!");
    } catch (error) {
      next(error);
    }
  }

  async loggedInDevices(req: Request, res: ExpressResponse, next) {
    try {
      const result = await LoggedIn.findAll(req.query)
      res.finish(result)
    } catch (error) {
      next(error)
    }
  }

}
