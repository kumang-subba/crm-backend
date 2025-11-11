import { sendErrorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.cookies?.access_token;
  if (!token) return sendErrorResponse(res, 401, "Unauthorized");
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .clearCookie("access_token", { sameSite: "none", secure: true })
        .status(500)
        .json({ message: "Invalid token" });

    req.userId = decoded.id;
  });
  next();
}

export default verifyToken;
