import { Router } from "express";
import { AuthService } from "./auth.service";
import { Query } from "express-methods";
import { userIdDTO } from "./auth.dto";

export const authRouter = Router();
const { login, register, loggedInDevices } = new AuthService();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.get("/loggedInDevices", Query(userIdDTO), loggedInDevices)

// authRouter.post("/forgetPassword", login)
