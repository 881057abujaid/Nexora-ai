import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import getGroq from "../services/groqService.js";
import { chatbotPrompts } from "../utils/chatbotPrompts.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;

    // Check if content is provided
    if (!content || content.trim() === "") {
        throw new AppError("Please provide message content", 400);
    }

    // Check if chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new AppError("Chat not found", 404);
    }

    let newTitle = null;

    if (chat.title === `${chat.botType} Chat`) {
        try {
            const groq = getGroq();
            const titleResponse = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: "system", content: "Generate a short, concise 3-5 word title for the following message. Do not include quotes or extra text. Just the title." },
                    { role: "user", content: content }
                ],
                temperature: 0.7,
                max_tokens: 15
            });
            newTitle = titleResponse.choices[0]?.message?.content?.replace(/['"]/g, '').trim() || content.slice(0, 30) + "...";
        } catch (error) {
            newTitle = content.slice(0, 30) + "...";
        }
        chat.title = newTitle;
        await chat.save();
    }

    // Save user message
    const userMessage = await Message.create({
        chat: chatId,
        sender: "user",
        content,
    });

    // Get bot prompt
    const systemPrompt = chatbotPrompts[chat.botType];

    // Groq request
    const groq = getGroq();
    const result = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: content }
        ],
    });

    // Get AI response
    const aiResponse = result.choices[0]?.message?.content || "";

    // Save AI response
    const aiMessage = await Message.create({
        chat: chatId,
        sender: "ai",
        content: aiResponse,
    });

    res.status(200).json({
        success: true,
        userMessage,
        aiMessage,
        newTitle
    });
});

// Get Messages
export const getMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    if (!chatId) {
        throw new AppError("Chat ID is required", 400);
    }

    const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        messages,
    });
});

// Get User saved chats
export const getUserChats = asyncHandler(async (req, res) => {
    const user = req.user._id;

    const chats = await Chat.find({ user }).sort({ updatedAt: -1 });

    res.status(200).json({
        success: true,
        message: "User chats fetched successfully",
        chats,
    });
});

// Rate Message
export const rateMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    if (![1, -1, 0].includes(rating)) {
        throw new AppError("Invalid rating value", 400);
    }

    const message = await Message.findById(id);

    if (!message) {
        throw new AppError("Message not found", 404);
    }

    message.rating = rating;
    await message.save();

    res.status(200).json({
        success: true,
        message: "Message rating updated",
        data: message
    });
});