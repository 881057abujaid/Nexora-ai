import api from "../lib/axios";

export const sendMessage = async (chatId, content) => {
    const token = localStorage.getItem("token");

    const response = await api.post("/messages", {
        chatId,
        content
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

export const getMessages = async (chatId) => {
    const token = localStorage.getItem("token");

    const response = await api.get(`/messages/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

export const rateMessage = async (messageId, rating) => {
    const token = localStorage.getItem("token");
    const response = await api.put(
        `/messages/${messageId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};