import boardModel from "../models/board.model.js";
import { sendErrorResponse, sendResponse } from "../utils/response.js";

async function getAllBoards(req, res) {
  try {
    if (!req.userId) return sendErrorResponse(res, 401, "User not logged in");
    const allData = await boardModel
      .find({ createdBy: req.userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "columns",
        populate: {
          path: "leads",
          options: { sort: { order: 1 } },
        },
      });
    return sendResponse(res, 200, null, allData);
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

async function createBoard(req, res) {
  try {
    const { name } = req.body;
    const exists = await boardModel.findOne({ createdBy: req.userId, name });
    if (exists) return sendErrorResponse(res, 409, `Board with name: ${name} already exists for the user`);
    const newBoard = await boardModel.create({ name, createdBy: req.userId });
    return sendResponse(res, 200, null, { ...newBoard, columns: [] });
  } catch (error) {
    return sendErrorResponse(res, 500, err.message);
  }
}

export { getAllBoards, createBoard };
