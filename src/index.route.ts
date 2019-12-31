import { ExpressResponse, expressErrorHandler } from "express-methods";
import { NotFound } from "http-errors";
import { authRouter } from "./modules/authentication/auth.route";

export const appRoutes = app => {
  app.get("/", (req, res: ExpressResponse, next) => {
    res.finish({}, "Authentication Server!");
  });

  app.use("/authentication", authRouter);

  app.all("*", (req, res, next) => {
    try {
      throw new NotFound();
    } catch (error) {
      next(error);
    }
  });

  app.use(expressErrorHandler);
};
