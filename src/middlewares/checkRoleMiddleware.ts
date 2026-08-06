import { type Request, type Response, type NextFunction } from "express";
import { type CustomRequest, type User } from "../libs/types.js";
import { users } from "../db/db.ts";

export const checkRoleMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // get payload and token from (custom) request
  const payload = req.user;
  const token = req.token;

  const user = users.find((u: User) => u.username === payload?.username);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  next();
};
