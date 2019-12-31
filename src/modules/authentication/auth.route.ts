import { Router } from "express";
import { AuthService } from "./auth.service";

export const authRouter = Router();
const { login } = new AuthService()

authRouter
    .route("/login")
        .get(login)
