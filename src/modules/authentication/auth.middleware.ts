import { authModel, Roles } from "./auth.model";
import { Unauthorized } from "http-errors";
import { AuthDTO } from "./auth.dto";
import { ExpressResponse, ExpressError } from "express-methods";
import { validateJwt, isAdmin } from "../../common/common.util";
import { LogoutRepository, AuthRepository } from "./auth.repository";

const LogOut = new LogoutRepository()
const Auth = new AuthRepository()

export const authMiddleware = async (req, res: ExpressResponse, next) => {
  try {
    const { token } = req.headers;
    const result = await LogOut.get(token)

    if (result) {
      return next({
        statusCode: 401,
        message: `User has logged out`
      })
    }

    // req = { ...req,... await validateJwt(token) };
    next();
  } catch (error) {
    next(new Unauthorized());
  }
};


export const isAdminMiddleware = async (req, res: ExpressResponse, next) => {
  try {
    const admin = await isAdmin(req.query)

    if (!admin) {
      throw new Unauthorized()
    }
    next();
  } catch (error) {
    next(error)
  }
};
