import { Router } from "express";
import authRouter from "./auth.routes.js";
import columnRouter from "./column.routes.js";
import verifyToken from "../middlewares/jwt.middleware.js";
import userRouter from "./user.routes.js";
import boardRouter from "./board.routes.js";
import validateUserId from "../middlewares/isUserIdValid.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/column", verifyToken, validateUserId, columnRouter);
router.use("/user", verifyToken, validateUserId, userRouter);
router.use("/board", verifyToken, validateUserId, boardRouter);

export default router;
