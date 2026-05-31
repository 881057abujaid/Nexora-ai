import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import Chat from "../models/chat.model.js";

// Create Chat
export const createChat = asyncHandler(async (req, res) => {
    const { botType } = req.body;

    if (!botType) {
        throw new AppError("Bot type is required", 400);
    }

    const chat = await Chat.create({
        user: req.user._id,
        botType,
        title: `${botType} Chat`,
    });

    res.status(201).json({
        success: true,
        message: "Chat created successfully.",
        chat,
    });
});

// Delete Chat
export const deleteChat = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const chat = await Chat.findById(id);

    if (!chat) {
        throw new AppError("Chat not found", 404);
    }

    // Verify chat belongs to user
    if (chat.user.toString() !== req.user._id.toString()) {
        throw new AppError("Not authorized to delete this chat", 403);
    }

    // Delete all messages associated with this chat
    // Requires importing Message model at the top
    const Message = (await import("../models/message.model.js")).default;
    await Message.deleteMany({ chat: id });

    // Delete the chat itself
    await chat.deleteOne();

    res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
    });
});

// Rename Chat
export const renameChat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === "") {
        throw new AppError("Title is required", 400);
    }

    const chat = await Chat.findById(id);

    if (!chat) {
        throw new AppError("Chat not found", 404);
    }

    // Verify chat belongs to user
    if (chat.user.toString() !== req.user._id.toString()) {
        throw new AppError("Not authorized to rename this chat", 403);
    }

    chat.title = title.trim();
    await chat.save();

    res.status(200).json({
        success: true,
        message: "Chat renamed successfully",
        chat,
    });
});