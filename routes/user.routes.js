import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getCurrentUser);

export default userRouter;
