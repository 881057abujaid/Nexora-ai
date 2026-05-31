import { GoogleGenAI } from "@google/genai";

let genAIInstance = null;

const getGenAI = () => {
    if (!genAIInstance) {
        genAIInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return genAIInstance;
};

export default getGenAI;
