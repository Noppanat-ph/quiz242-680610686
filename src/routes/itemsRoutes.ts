import { Router, type Request, type Response } from "express";
// import Zod validators
import {
  zUserId,
  zItemId,
  zItemPostBody,
  zItemPutBody,
  zItemDeleteBody,
} from "../libs/zodValidators.js";
// import types
import type { CustomRequest, Item } from "../libs/types.ts";
// import database
import { items } from "../db/db.ts";
//import uuid
import { v4 as uuidv4 } from "uuid";

import { authenticateToken } from "../middlewares/authenMiddleware.ts";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.ts";
import { success } from "zod";

const router = Router();

// GET /api/vXXX/items/:userId
router.get(
  "/:userId",
  authenticateToken,
  checkRoleMiddleware,
  (req: CustomRequest, res: Response) => {
    try {
      const userId = req.params.userId;

      if (req.user?.userId === userId) {
        const userItem = items.filter((t) => t.userId === userId);
        return res.status(200).json({
          success: true,
          data: userItem,
        });
      }
      return res.status(403).json({
        ok: false,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something is wrong, please try again",
        error: err,
      });
    }
  },
);

// POST /api/vXXX/items/:userId, body = {new item data}
// add a new Item for userId
router.post("/", async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
  });
});

// Delete /api/vXXX/items/:userId

export default router;
