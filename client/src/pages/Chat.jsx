import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages, sendMessage } from "../services/messageService";
import { getUserChats, deleteChat, renameChat } from "../services/chatService";
import toast from "react-hot-toast";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import TypingIndicator from "../components/chat/TypingIndicator";

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const messageEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        fetchChats();
        // Close mobile sidebar on route change
        setIsMobileOpen(false);
    }, [id]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const fetchMessages = async () => {
        try {
            const data = await getMessages(id);
            setMessages(data.messages);
        } catch (error) {
            toast.error("Failed to load messages");
        }
    };

    const fetchChats = async () => {
        try {
            const data = await getUserChats();
            setChats(data.chats);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleDeleteChat = async (chatId) => {
        try {
            await deleteChat(chatId);
            setChats((prev) => prev.filter((c) => c._id !== chatId));
            toast.success("Chat deleted successfully");
            if (id === chatId) {
                navigate("/bots");
            }
        } catch (error) {
            toast.error("Failed to delete chat");
        }
    };

    const handleRenameChat = async (chatId, newTitle) => {
        try {
            await renameChat(chatId, newTitle);
            setChats((prev) => prev.map((c) => (c._id === chatId ? { ...c, title: newTitle } : c)));
            toast.success("Chat renamed successfully");
        } catch (error) {
            toast.error("Failed to rename chat");
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        try {
            setLoading(true);
            const currentMessage = input;
            setInput("");
            const tempUserMessage = {
                sender: "user",
                content: currentMessage,
            };
            setMessages((prev) => [
                ...prev,
                tempUserMessage,
            ]);
            const data = await sendMessage(id, currentMessage);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    content: data.aiMessage.content,
                },
            ]);

            // Update chat title in the sidebar immediately if it was generated
            if (data.newTitle) {
                setChats((prevChats) =>
                    prevChats.map((c) =>
                        c._id === id ? { ...c, title: data.newTitle } : c
                    )
                );
            }
        } catch (error) {
            console.error("AI Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    content: "⚠️ **AI service temporarily unavailable.**\nPlease try again.",
                    isError: true
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const currentChat = chats.find((c) => c._id === id);

    return (
        <div className="flex h-screen bg-[#030307] text-slate-200 overflow-hidden relative">
            <ChatSidebar 
                chats={chats} 
                isMobileOpen={isMobileOpen} 
                setIsMobileOpen={setIsMobileOpen} 
                handleDeleteChat={handleDeleteChat} 
                handleRenameChat={handleRenameChat}
            />
            <main className="flex-1 flex flex-col min-w-0">
                <ChatHeader setIsMobileOpen={setIsMobileOpen} currentChat={currentChat} />
                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 max-w-4xl w-full mx-auto custom-scrollbar flex flex-col">
                    {messages.length === 0 && !loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center h-full mt-20">
                            <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/20">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-4">
                                How can I help you today?
                            </h2>
                            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                                Feel free to ask me anything. Our specialized AI models are ready to assist you with your tasks.
                            </p>
                        </div>
                    ) : (
                        <>
                            {Array.isArray(messages) && messages.map((message, index) => (
                                <MessageBubble key={index} message={message} />
                            ))}
                            {loading && <TypingIndicator />}
                            <div ref={messageEndRef}></div>
                        </>
                    )}
                </div>
                <MessageInput
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    loading={loading}
                />
            </main>
        </div>
    );
};

export default Chat;