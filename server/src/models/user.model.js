import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        theme: {
            type: String,
            enum: ['dark', 'light'],
            default: 'dark'
        },
        defaultBotName: {
            type: String,
            default: 'Nexora AI'
        }
    }
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;