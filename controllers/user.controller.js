import userModel from "../models/user.model.js";
import { sendErrorResponse, sendResponse } from "../utils/response.js";

async function getUserById(req, res) {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) return sendErrorResponse(res, 404, "User not found");
    return sendResponse(res, 200, null, user);
  } catch (error) {
    console.error("[getUserById]: Error", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return sendErrorResponse(res, 404, "User not found");
    return sendResponse(res, 200, null, user);
  } catch (error) {
    console.error("[getUserById]: Error", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
}

export { getUserById, getCurrentUser };
