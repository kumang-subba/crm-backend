import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginValidator, registerValidator } from "../validators/auth.validators.js";
import { login, logout, register } from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/jwt.middleware.js";
import validateUserId from "../middlewares/isUserIdValid.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidator), register);
authRouter.post("/login", validate(loginValidator), login);
authRouter.post("/logout", verifyToken, validateUserId, logout);

export default authRouter;
