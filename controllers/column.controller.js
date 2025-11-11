import boardModel from "../models/board.model.js";
import columnModel from "../models/column.model.js";
import userModel from "../models/user.model.js";
import leadModel from "../models/lead.model.js";
import { sendErrorResponse, sendResponse } from "../utils/response.js";

async function createColumn(req, res) {
  try {
    const { name, description, boardId } = req.body;
    const boardExists = await boardModel.findById(boardId).populate("columns");
    if (!boardExists) return sendErrorResponse(res, 404, "Board not found");
    const exists = boardExists.columns.find((b) => b.name === name);
    if (exists) return sendErrorResponse(res, 409, `column with name ${name} already exists for this user`);
    const column = await columnModel.create({
      name,
      description,
      createdBy: req.userId,
      board: boardId,
    });
    return sendResponse(res, 201, "column successfully created", { ...column.toJSON(), leads: [] });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, 500, err.message);
  }
}

async function updateColumn(req, res) {
  try {
    const { columnId } = req.params;
    if (!columnId) return sendErrorResponse(res, 400, "column ID required for update");
    const { name, description } = req.body;
    const exists = await columnModel.findByIdAndUpdate(columnId, { name, description });
    if (!exists) return sendErrorResponse(res, 404, `column with name ${name} not found`);
    return sendResponse(res, 200, "Column updated successfully");
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, 500, err.message);
  }
}

async function deleteColumn(req, res) {
  try {
    const { columnId } = req.params;
    if (!columnId) return sendErrorResponse(res, 400, "column ID required for deletion");
    const deleted = await columnModel.findByIdAndDelete(columnId);
    if (!deleted) return sendErrorResponse(res, 404, "column not found");
    else {
      await leadModel.deleteMany({
        column: deleted._id,
      });
      return sendResponse(res, 200, "column deleted successfully");
    }
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

async function getColumn(req, res) {
  try {
    const { id } = req.params;
    if (!id) return sendErrorResponse(res, 400, "column ID missing");
    const user = await userModel.findById(req.userId);
    if (!user) return sendErrorResponse(res, 401, "user not found");
    const column = await columnModel.findById(id).populate("leads");
    return sendResponse(res, 200, null, column);
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

export { createColumn, updateColumn, deleteColumn, getColumn };
