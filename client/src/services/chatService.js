import api from "../lib/axios";

export const createChat = async (botType) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    const response = await api.post(
        "/chats",
        { botType },
        { 
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const getUserChats = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/messages", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

export const deleteChat = async (chatId) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/chats/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
};

export const renameChat = async (chatId, title) => {
    const token = localStorage.getItem("token");
    const response = await api.put(
        `/chats/${chatId}/rename`,
        { title },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};