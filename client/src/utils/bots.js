import { Code2, DollarSign, Atom, Smile, Briefcase, Palette } from "lucide-react";

export const bots = [
    {
        id: "finance",
        title: "Finance bot",
        icon: DollarSign,
        description: "Investment & finance assistant",
        color: "from-purple-600 to-indigo-700"
    },
    {
        id: "it",
        title: "IT Support Bot",
        icon: Code2,
        description: "Tech troubleshooting & support assistant",
        color: "from-blue-600 to-indigo-600",
    },
    {
        id: "science",
        title: "Science Assistant Bot",
        icon: Atom,
        description: "Science learning assistant",
        color: "from-cyan-600 to-blue-600",
    },
    {
        id: "casual",
        title: "Casual Companion",
        icon: Smile,
        description: "Friendly chat & brainstorming",
        color: "from-pink-500 to-rose-500",
    },
    {
        id: "professional",
        title: "Professional Assistant",
        icon: Briefcase,
        description: "Business & formal tasks",
        color: "from-slate-600 to-gray-800",
    },
    {
        id: "creative",
        title: "Creative Muse",
        icon: Palette,
        description: "Storytelling & artistic ideas",
        color: "from-fuchsia-500 to-purple-600",
    },
];