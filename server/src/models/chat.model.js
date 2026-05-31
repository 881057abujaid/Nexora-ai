import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    botType: {
        type: String,
        enum: ["finance", "it", "science", "casual", "professional", "creative"],
        required: true,
    },
    title: {
        type: String,
        default: "New Chat"
    },
},
{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;