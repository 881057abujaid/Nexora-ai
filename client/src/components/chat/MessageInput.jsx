import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MessageInput = ({ input, setInput, handleSend, loading }) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [input]);

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && !loading){
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t border-slate-800/60 bg-[#05050a]/80 backdrop-blur-xl relative z-20">
            <div className="max-w-4xl mx-auto">
                <div className={`rounded-2xl bg-slate-900/80 p-2 flex items-end gap-2 transition-all duration-300 ${
                    isFocused 
                    ? "ring-2 ring-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] border-transparent" 
                    : "border border-slate-700/50 hover:border-slate-600/50"
                }`}>
                    <button className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mb-1">
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={onKeyDown}
                        placeholder="Ask anything..."
                        rows={1}
                        className="flex-1 max-h-32 bg-transparent outline-none text-sm text-slate-100 placeholder-slate-500 resize-none py-3 custom-scrollbar"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading || input.trim() === ""}
                        className="p-3 mb-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {loading ? (
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        ) : (
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        )}
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-500">Nexora AI can make mistakes. Consider verifying important information.</p>
                </div>
            </div>
        </div>
    );
};

export default MessageInput;