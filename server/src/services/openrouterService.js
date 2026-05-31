import OpenAI from "openai";

let openrouterInstance = null;

const getOpenRouter = () => {
    if (!openrouterInstance) {
        openrouterInstance = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: "https://openrouter.ai/api/v1"
        });
    }
    return openrouterInstance;
};

export default getOpenRouter;