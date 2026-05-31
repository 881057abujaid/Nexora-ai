import { useNavigate } from "react-router-dom";
import { createChat } from "../../services/chatService";
import toast from "react-hot-toast";
import { useState } from "react";
import { MessageSquarePlus, Loader2 } from "lucide-react";

const BotCard = ({ bot }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleStart = async () => {
        try {
            setLoading(true);
            const chat = await createChat(bot.id);
            toast.success("Workspace ready");
            navigate(`/chat/${chat.chat._id}`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full flex flex-col bg-slate-950/80 backdrop-blur-xl rounded-[23px] p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white group-hover:ring-indigo-400 transition-all duration-300">
                        <bot.icon className="w-8 h-8" />
                    </div>
                </div>

                <div className="mb-6 flex-1">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{bot.title}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Optimized for specific tasks and workflows to boost your productivity.
                    </p>
                </div>

                <button
                    onClick={handleStart}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Initializing...</span>
                        </>
                    ) : (
                        <>
                            <span>Start Workspace</span>
                            <MessageSquarePlus className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BotCard;