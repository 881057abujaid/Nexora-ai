import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// Register new User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if(!name|| !email || !password) {
        throw new AppError("Please fill all the fields", 400);
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("User already exists. Please login to your account.", 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        message: "User registration successfull",
        user
    });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        throw new AppError("Please fill all the fields", 400);
    }

    // Check user exists or not
    const user = await User.findOne({ email });
    if(!user) {
        throw new AppError("Uses doesn't exists. Please register first.", 404);
    }

    // Check password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
        throw new AppError("Invalid credentials. Please try again.", 401);
    }

    // Generate Token
    const token = generateToken(user._id);

    // Set cookie
    const cookieOpton = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.status(200).cookie("token", token, cookieOpton).json({
        success: true,
        message: "User logged in successfull",
        user,
        token
    });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User logged out successfull"
    });
});

// Get current logged in user
export const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        user: req.user
    });
});

// Update user preferences
export const updatePreferences = asyncHandler(async (req, res) => {
    const { theme, defaultBotName } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) {
        throw new AppError("User not found", 404);
    }
    
    if (!user.preferences) {
        user.preferences = {};
    }
    
    if (theme) user.preferences.theme = theme;
    if (defaultBotName) user.preferences.defaultBotName = defaultBotName;
    
    await user.save();
    
    res.status(200).json({
        success: true,
        message: "Preferences updated successfully",
        user
    });
});
