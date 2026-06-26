import { AppError } from "../utils/error.utils.js";
import { verifyAccessToken } from "../utils/token.utils.js";
import { asyncHandler } from "../utils/error.utils.js";

export const userAuth = asyncHandler(async (req, res, next) => {

  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) throw new AppError(400, "No refresh token found.")
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new AppError(401, "Not authenticated");

  const decoded = verifyAccessToken(token);
  req.user = decoded;
  req.refresh_token = refresh_token;
  next();
})
