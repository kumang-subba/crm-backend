import { Router } from "express";
import { createBoard, getAllBoards } from "../controllers/board.controller.js";

const boardRouter = Router();

boardRouter.get("/", getAllBoards);
boardRouter.post("/create", createBoard);

export default boardRouter;
