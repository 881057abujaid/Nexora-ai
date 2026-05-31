import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/generateToken.js";
import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Get Token from cookie
    if (req.cookie && req.cookie.token) {
        token = req.cookie.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
        throw new AppError("Unauthorized access to this route", 401);
    }

    // Verify Token
    const decodedToken = await verifyToken(token);

    // Check if user exists
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
        throw new AppError("User with this token does not exist", 401);
    }

    req.user = user;
    next();
});