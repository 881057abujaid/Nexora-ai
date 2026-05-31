import { MoreVertical, Share2, Activity, Menu, DollarSign, Code2, Atom, MessageSquare } from "lucide-react";

const ChatHeader = ({ setIsMobileOpen, currentChat }) => {
    const renderIcon = () => {
        if (!currentChat) return <img src="/logo.png" alt="Nexora AI" className="w-full h-full object-cover" />;
        
        const props = { className: "w-5 h-5 text-indigo-400" };
        switch (currentChat.botType) {
            case "finance": return <DollarSign {...props} />;
            case "education": return <Code2 {...props} />;
            case "science": return <Atom {...props} />;
            default: return <MessageSquare {...props} />;
        }
    };

    return (
        <header className="h-16 border-b border-slate-800/60 bg-[#05050a]/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm sticky top-0 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-slate-800/50 overflow-hidden shadow-sm ring-1 ring-indigo-500/30">
                    {renderIcon()}
                </div>
                <div>
                    <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {currentChat ? currentChat.title : "Nexora AI Workspace"}
                    </h1>
                    <p className="text-[10px] sm:text-xs text-indigo-400 font-medium">
                        {currentChat ? `${currentChat.botType.charAt(0).toUpperCase() + currentChat.botType.slice(1)} Assistant` : "AI-powered conversation environment"}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;