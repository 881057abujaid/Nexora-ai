import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createChat, deleteChat, renameChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, createChat);
router.delete("/:id", protect, deleteChat);
router.put("/:id/rename", protect, renameChat);

export default router;