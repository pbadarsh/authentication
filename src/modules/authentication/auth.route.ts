import { Router } from "express";
import { AuthService } from "./auth.service";
import { Query } from "express-methods";
import { userDTO } from "./auth.dto";
import { authMiddleware } from "./auth.middleware";

export const authRouter = Router();
const { login, register, loggedInDevices, logout } = new AuthService();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.get("/loggedInDevices", authMiddleware, loggedInDevices);

authRouter.post("/logout", authMiddleware, logout);

// authRouter.post("/forgetPassword", login)
