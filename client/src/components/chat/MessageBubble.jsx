import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { rateMessage } from "../../services/messageService";

const MessageBubble = ({ message }) => {
    const isUser = message.sender === "user";
    const [copied, setCopied] = useState(false);
    const [rating, setRating] = useState(message.rating || 0);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        toast.success("Message copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRate = async (newRating) => {
        if (!message._id) return; // If message is just a temporary state without ID
        const updatedRating = rating === newRating ? 0 : newRating;
        setRating(updatedRating);
        try {
            await rateMessage(message._id, updatedRating);
        } catch (error) {
            toast.error("Failed to rate message");
            setRating(rating); // revert on error
        }
    };

    return (
        <div className={`message-enter flex w-full ${ isUser ? "justify-end" : "justify-start" } mb-6`}>
            <div className={`flex max-w-[85%] gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                
                <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-sm">
                            <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                    )}
                </div>

                <div className={`group relative rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm flex-1 overflow-hidden ${
                    isUser
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-indigo-500/10"
                    : message.isError
                        ? "bg-red-500/10 border border-red-500/20 text-red-200 rounded-tl-none backdrop-blur-md"
                        : "bg-slate-800/60 backdrop-blur-md border border-slate-700/50 text-slate-200 rounded-tl-none shadow-xl"
                }`}>
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <div className="flex flex-col">
                            <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl max-w-none">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                            <div className="mt-3 flex items-center justify-end gap-2">
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleRate(1)}
                                        className={`p-1.5 rounded-lg transition-colors ${rating === 1 ? 'text-green-400 bg-green-500/10' : 'text-slate-400 hover:text-green-400 hover:bg-slate-700/50'}`}
                                        title="Good response"
                                    >
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleRate(-1)}
                                        className={`p-1.5 rounded-lg transition-colors ${rating === -1 ? 'text-red-400 bg-red-500/10' : 'text-slate-400 hover:text-red-400 hover:bg-slate-700/50'}`}
                                        title="Bad response"
                                    >
                                        <ThumbsDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="w-px h-3 bg-slate-700 mx-1 opacity-0 group-hover:opacity-100"></div>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1.5 text-xs"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                            <span className="text-green-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;