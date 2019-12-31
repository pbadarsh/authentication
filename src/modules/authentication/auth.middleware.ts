import { authModel } from "./auth.model";
import { Unauthorized } from "http-errors";
import { AuthDTO } from "./auth.dto";
import { ExpressResponse } from "express-methods";
import { validateJwt } from "../../common/common.util";

export const authMiddleware = async (req, res: ExpressResponse, next) => {
  try {
    const token = req.header("token");
    await validateJwt(token);
    next();
  } catch (error) {
    next(new Unauthorized());
  }
};
