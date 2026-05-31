import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}