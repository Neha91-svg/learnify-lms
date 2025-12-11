import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    LogOut,
} from "lucide-react";

export default function InstructorSidebar() {
    const { logout } = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { theme } = useTheme();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/instructor/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Create Course",
            path: "/instructor/create-course",
            icon: <PlusCircle size={20} />,
        },
        {
            name: "Profile",
            path: "/instructor/profile",
            icon: <Settings size={20} />,
        },
    ];

    return (
        <div
            className={`
                h-screen border-r shadow-lg transition-all duration-300 relative 
                ${collapsed ? "w-20" : "w-72"} 
                ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black"}
            `}
        >
            {/* Sidebar Header */}
            <div className="p-6 font-extrabold text-2xl text-purple-700 dark:text-purple-400 tracking-wide">
                {!collapsed ? "Instructor" : "INS"}
            </div>

            {/* Menu */}
            <div className="px-4 mt-4">
                {menuItems.map((item, index) => (
                    <Link key={index} to={item.path}>
                        <div
                            className={`
                                flex items-center gap-4 p-3 rounded-lg mb-2 transition-all cursor-pointer
                                ${location.pathname === item.path
                                    ? "bg-purple-100 text-purple-700 font-semibold shadow-sm dark:bg-gray-800 dark:text-purple-300"
                                    : theme === "dark"
                                        ? "hover:bg-gray-800 text-gray-300"
                                        : "hover:bg-gray-100 text-gray-700"
                                }
                            `}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.name}</span>}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Logout */}
            <div className="absolute bottom-6 w-full px-5">
                <button
                    onClick={logout}
                    className={`
                        flex items-center gap-4 p-3 w-full rounded-lg transition-all
                        ${theme === "dark" ? "text-red-400 hover:bg-gray-800" : "text-red-600 hover:bg-red-50"}
                    `}
                >
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
