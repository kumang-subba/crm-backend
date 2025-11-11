import { Router } from "express";
import { createColumn, deleteColumn, getColumn, updateColumn } from "../controllers/column.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { columnValidator } from "../validators/column.validator.js";
import leadRouter from "./lead.routes.js";

const columnRouter = Router();

columnRouter.post("/create", validate(columnValidator), createColumn);
columnRouter.put("/:columnId", validate(columnValidator), updateColumn);
columnRouter.get("/:id", getColumn);
columnRouter.delete("/:columnId", deleteColumn);
columnRouter.use("/:columnId/lead", leadRouter);

export default columnRouter;
