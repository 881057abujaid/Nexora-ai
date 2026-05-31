import express from "express";
import cors  from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

// Middlewares
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());

// Default Route
app.get("/", (req, res) => {
    res.send("Nexora AI Server Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

export default app;