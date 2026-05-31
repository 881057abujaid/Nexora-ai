import { Link, useParams, useNavigate } from 'react-router-dom';
import { DollarSign, Code2, Atom, MessageSquare, Sparkles, User, LogOut, X, Trash2, Search, Pencil, Settings } from "lucide-react";
import { useEffect, useState } from 'react';
import { getMe, logout } from '../../services/authService';
import toast from 'react-hot-toast';
import SettingsModal from './SettingsModal';

const ChatSidebar = ({ chats, isMobileOpen, setIsMobileOpen, handleDeleteChat, handleRenameChat }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [editingChatId, setEditingChatId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                const fetchedUser = data.user || data;
                setUser(fetchedUser);
                
                // Apply theme globally
                if (fetchedUser?.preferences?.theme === "light") {
                    document.body.classList.add("light");
                } else {
                    document.body.classList.remove("light");
                }
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            // Some apps don't require an API call for logout if just removing token, 
            // but we'll call the logout service if it exists.
            try { await logout(); } catch (e) {} 
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const filteredChats = chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRenameSubmit = (chatId) => {
        if (editTitle.trim() && handleRenameChat) {
            handleRenameChat(chatId, editTitle.trim());
        }
        setEditingChatId(null);
    };

    return (
        <>
            {showSettings && (
                <SettingsModal 
                    user={user} 
                    onClose={() => setShowSettings(false)} 
                    onUpdateUser={(updatedUser) => setUser(updatedUser)}
                />
            )}

            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-[#0a0a0f] border border-slate-800/60 rounded-3xl p-6 w-full max-w-sm shadow-2xl shadow-indigo-500/10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0 ring-1 ring-red-500/20">
                                <LogOut className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Logout</h3>
                                <p className="text-sm text-slate-400">Are you sure you want to logout?</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-2.5 rounded-xl text-white font-medium bg-red-500/10 hover:bg-red-500 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)] ring-1 ring-red-500/20 hover:ring-red-500 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800/60 bg-[#05050a] flex flex-col overflow-hidden transition-transform duration-300 md:relative md:translate-x-0 ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/5 blur-[50px] pointer-events-none" />
                
                <div className="p-6 border-b border-slate-800/60 relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 flex-shrink-0">
                            <img src="/logo.png" alt="Nexora AI Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 truncate">
                            {user?.preferences?.defaultBotName || "Nexora AI"}
                        </h1>
                    </div>
                    <button 
                        onClick={() => setIsMobileOpen(false)}
                        className="p-2 -mr-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-800/50 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

            <div className="px-4 pt-4 pb-2 relative z-10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Search className="h-4 w-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600"
                    />
                </div>
            </div>

            <div className="px-4 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider relative z-10">
                Your Workspaces
            </div>

            <div className="flex-1 overflow-y-auto px-3 space-y-1.5 custom-scrollbar pb-4 relative z-10">
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) =>(
                        <Link
                            key={chat._id}
                            to={`/chat/${chat._id}`}
                            className={`block px-3 py-3 rounded-2xl text-sm transition-all duration-200 group flex items-center justify-between ${
                                id === chat._id
                                ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 shadow-sm"
                                : "hover:bg-slate-800/40 border border-transparent"
                            }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden flex-1">
                                <span className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                                    id === chat._id ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800/50 text-slate-400 group-hover:text-slate-300"
                                }`}>
                                    {chat.botType === "finance" ? <DollarSign className="size-4" /> : 
                                     chat.botType === "education" ? <Code2 className="size-4" /> : 
                                     chat.botType === "science" ? <Atom className="size-4" /> : 
                                     <MessageSquare className="size-4" />}
                                </span>
                                {editingChatId === chat._id ? (
                                    <input
                                        type="text"
                                        autoFocus
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        onBlur={() => handleRenameSubmit(chat._id)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleRenameSubmit(chat._id);
                                            if (e.key === "Escape") setEditingChatId(null);
                                        }}
                                        className="bg-transparent border-b border-indigo-500 text-indigo-100 font-medium w-full focus:outline-none"
                                    />
                                ) : (
                                    <span className={`truncate font-medium transition-colors ${
                                        id === chat._id ? "text-indigo-100" : "text-slate-400 group-hover:text-slate-200"
                                    }`}>
                                        {chat.title}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setEditingChatId(chat._id);
                                        setEditTitle(chat.title);
                                    }}
                                    className={`p-1.5 rounded-lg ${
                                        id === chat._id ? "hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-100" : "hover:bg-slate-700/50 text-slate-500 hover:text-slate-300"
                                    }`}
                                    title="Rename Chat"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (handleDeleteChat) handleDeleteChat(chat._id);
                                    }}
                                    className={`p-1.5 rounded-lg ${
                                        id === chat._id ? "hover:bg-indigo-500/20 text-indigo-300 hover:text-red-400" : "hover:bg-slate-700/50 text-slate-500 hover:text-red-400"
                                    }`}
                                    title="Delete Chat"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-6 text-slate-500 text-sm">
                        No conversations found
                    </div>
                )}
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-t border-slate-800/60 bg-[#05050a] relative z-10">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800/80 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="truncate flex-1">
                            {user ? (
                                <>
                                    <p className="text-sm font-medium text-slate-200 truncate">{user.name}</p>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{user.email}</p>
                                </>
                            ) : (
                                <div className="space-y-1.5 w-full">
                                    <div className="h-3.5 bg-slate-800 rounded animate-pulse w-24"></div>
                                    <div className="h-2.5 bg-slate-800/80 rounded animate-pulse w-32"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button 
                            onClick={() => setShowSettings(true)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setShowLogoutConfirm(true)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
        </>
    );
};

export default ChatSidebar;