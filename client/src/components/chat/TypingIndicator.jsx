const TypingIndicator = () => {
    return (
        <div className="flex justify-start">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 items-center gap-1.5">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-0"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></span>
            </div>
        </div>
    );
};

export default TypingIndicator;