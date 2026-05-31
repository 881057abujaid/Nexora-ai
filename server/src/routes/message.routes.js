import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage, getUserChats, rateMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, getMessages);
router.get("/", protect, getUserChats);
router.put("/:id/rate", protect, rateMessage);

export default router;