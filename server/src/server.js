import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

import app from "./app.js";

// MongoDB Connection
connectDB();

// Server Port
const PORT = process.env.PORT || 8080;

// Start Server
app.listen(PORT, () => {
    console.log(`Nexora AI Server Running on http://localhost:${PORT}`);
});