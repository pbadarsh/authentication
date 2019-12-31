import { authModel } from "./auth.model";
import httpErrors from "http-errors";
import { AuthDTO } from "./auth.dto";
import { ExpressResponse } from "express-methods";

export const authMiddleware = async (req, res: ExpressResponse, next) => {
  try {
    const { userName, password } = <AuthDTO>req.query;
    const result = await authModel.findOne({ userName, password });
    if (!result) {
      throw new httpErrors.Unauthorized();
    }
    next();
  } catch (error) {
    next(error);
  }
};
