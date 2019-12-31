import { Router } from "express";
import { AuthService } from "./auth.service";

export const authRouter = Router();
const { login, register } = new AuthService();

authRouter.post("/login", login);

authRouter.post("/register", register);

// authRouter.post("/forgetPassword", login)
