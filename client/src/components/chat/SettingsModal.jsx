import { useState } from "react";
import { X, Moon, Sun, Save } from "lucide-react";
import toast from "react-hot-toast";
import { updatePreferences } from "../../services/authService";

const SettingsModal = ({ user, onClose, onUpdateUser }) => {
    const [theme, setTheme] = useState(user?.preferences?.theme || "dark");
    const [botName, setBotName] = useState(user?.preferences?.defaultBotName || "Nexora AI");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const data = await updatePreferences({ theme, defaultBotName: botName });
            toast.success("Preferences updated successfully");
            onUpdateUser(data.user);
            
            // Apply theme globally
            if (theme === "light") {
                document.body.classList.add("light");
            } else {
                document.body.classList.remove("light");
            }
            
            onClose();
        } catch (error) {
            toast.error("Failed to update preferences");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-[#0a0a0f] border border-slate-800/60 rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-indigo-500/10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Personalization</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="space-y-6">
                    {/* Theme Toggle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Theme Preference</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setTheme("dark")}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                                    theme === "dark" 
                                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" 
                                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"
                                }`}
                            >
                                <Moon className="w-4 h-4" />
                                <span>Dark</span>
                            </button>
                            <button
                                onClick={() => setTheme("light")}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                                    theme === "light" 
                                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" 
                                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"
                                }`}
                            >
                                <Sun className="w-4 h-4" />
                                <span>Light</span>
                            </button>
                        </div>
                    </div>

                    {/* Chatbot Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Default Chatbot Name</label>
                        <input
                            type="text"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                            placeholder="e.g. Nexora AI"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save Settings</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
