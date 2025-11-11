import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendCookieResponse, sendErrorResponse, sendResponse } from "../utils/response.js";
import userModel from "../models/user.model.js";
import boardModel from "../models/board.model.js";
import columnModel from "../models/column.model.js";

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const exists = await userModel.findOne({ username });
    if (exists) sendErrorResponse(res, 409, "Username already exists");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await userModel.create({ username, password: hashedPassword });
    if (!user) sendErrorResponse(res, 500, "Couid not register user");
    creatDefaultData(user.id);
    return sendResponse(res, 201, "User registered successfully");
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return sendErrorResponse(res, 401, "Invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendErrorResponse(res, 401, "Invalid credentials");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return sendCookieResponse(res, 200, "Login successful", null, "access_token", token);
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

export function logout(_, res) {
  return res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json({ message: "User has been logged out" });
}

async function creatDefaultData(userId) {
  const existing = await boardModel.findOne({ name: "Leads", createdBy: userId });
  if (existing) {
    return;
  }
  const board = await boardModel.create({ name: "Leads", createdBy: userId });
  const columnNames = ["new leads", "qualified", "negotiation", "closed"];

  const columnDesc = [
    "Recently captured leads that need to be contacted and qualified.",
    "Leads that have shown interest and meet initial qualification criteria.",
    "Leads currently in pricing discussions, proposal review, or contract negotiation.",
    "Deals successfully closed and converted into customers.",
  ];
  await Promise.all(
    columnNames.map((name, i) =>
      columnModel.create({
        name,
        description: columnDesc[i],
        createdBy: userId,
        board: board.id,
      }),
    ),
  );
}
