import userModel from "../models/user.model.js";

async function validateUserId(req, res, next) {
  const userId = req.userId;
  const exists = await userModel.findById(userId);
  if (!exists)
    return res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(404)
      .json({ message: "User not found" });
  next();
}

export default validateUserId;
