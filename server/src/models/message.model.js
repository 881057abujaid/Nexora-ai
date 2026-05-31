import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: String,
        enum: ["user", "ai"],
        default: "user",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        enum: [1, -1, 0],
        default: 0
    },
},
{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;