import { SMSService } from './../message/message.service';
import { isAdmin } from "./../../common/common.util";
import { ExpressResponse, ExpressError } from "express-methods";
import { authModel, loggedInModel } from "./auth.model";
import {
  hashPassword,
  createJwt,
  validateJwt,
  comparePassword
} from "../../common/common.util";
import { AuthDTO, userDTO } from "./auth.dto";
import { Request } from "express";
import { BadRequest } from "http-errors";
import {
  AuthRepository,
  LoggedInRepository,
  LogoutRepository
} from "./auth.repository";
import { Details } from "express-useragent";
import { EmailService } from "../mailer/mailer.service"
const Auth = new AuthRepository();
const LoggedIn = new LoggedInRepository();
const LogOut = new LogoutRepository();
export class AuthService {

  async login(req: Request, res: ExpressResponse, next) {
    try {
      const authPayload: AuthDTO = req.body;
      authPayload.password = await hashPassword(authPayload.password);
      const result = await Auth.find(authPayload);

      if (!result) {
        throw new ExpressError("User not found!", 400);
      }

      await comparePassword(result.password, authPayload.password);

      const token = await createJwt({
        userName: authPayload.userName,
        userId: result._id
      });

      const loggedInPayload = <Details>{
        ...req.useragent,
        userId: result._id,
        token
      };
      const loggedInResult = await LoggedIn.save(loggedInPayload);

      res.finish({ token, loggedIn: loggedInResult._id });
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: ExpressResponse, next) {
    let emailService = new EmailService();
    let messageService = new SMSService();
    try {
      const auth: AuthDTO = req.body;
      auth.password = await hashPassword(auth.password);

      await Auth.save(auth);
      if (auth.mobileNumber) {
        await messageService.sendSMS({ message: "You have been registered", mobileNumber: auth.mobileNumber })
      }
      if (auth.emailAddress) {
        await emailService.sendEmail({ message: "You have been registered", subject: "Registration", to: auth.emailAddress })
      }
      res.finish({}, "User Registered!");
    } catch (error) {
      next(error);
    }
  }

  async loggedInDevices(req: Request, res: ExpressResponse, next) {
    try {
      const admin = await isAdmin(req.query);
      let result = null;

      if (!admin) {
        result = await LoggedIn.findAll(req.query);
      } else {
        result = await LoggedIn.findAll({});
      }

      res.finish(result);
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: ExpressResponse, next) {
    try {
      await LogOut.add(req.headers.token);
      res.finish({});
    } catch (error) {
      next(error);
    }
  }
}
