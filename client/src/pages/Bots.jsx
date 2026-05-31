import { bots } from "../utils/bots";
import BotCard from "../components/bots/BotCard";
import { Bot, Sparkles } from "lucide-react";

const Bots = () => {
    return (
        <div className="min-h-screen bg-[#030307] p-6 md:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
                        <Sparkles className="w-3 h-3" />
                        <span>Select Your Workspace</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Assistant</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-sm md:text-base">
                        Select a specialized agent tailored to your workflow. Each assistant is optimized for specific domains to provide the most accurate and helpful responses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bots.map((bot) => (
                        <BotCard
                            key={bot.id}
                            bot={bot}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bots;