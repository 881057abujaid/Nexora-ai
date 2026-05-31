import { Link } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#030307]">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />

            <div className="z-10 text-center px-4 max-w-5xl w-full flex flex-col items-center">
                <div className="w-24 h-24 mb-6 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 ring-1 ring-white/10 relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img src="/logo.png" alt="Nexora AI" className="w-full h-full object-cover" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
                    <Sparkles className="size-4" />
                    <span>The Next Generation AI Workspace</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                    Intelligence Amplified
                    <br />
                    <span className="text-4xl md:text-6xl font-bold bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent">
                        For Your Workflow
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Experience seamless conversations with specialized AI agents designed for education, finance, and science. Unlock your potential today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/register"
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started Free <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -ml-4" />
                    </Link>
                    
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/50 border border-slate-800 hover:bg-slate-800/80 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all w-full sm:w-auto"
                    >
                        Login to Workspace
                    </Link>
                </div>
                
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                    {[
                        { icon: Bot, title: "Specialized Agents", desc: "Expert models for every domain." },
                        { icon: Zap, title: "Lightning Fast", desc: "Real-time responses without delay." },
                        { icon: Sparkles, title: "Context Aware", desc: "Intelligent memory for continuity." }
                    ].map((feature, idx) => (
                        <div key={idx} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                            <feature.icon className="size-8 text-indigo-400 mb-4" />
                            <h3 className="text-lg font-bold text-slate-200 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;