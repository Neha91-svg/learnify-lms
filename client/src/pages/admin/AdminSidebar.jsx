import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    UserRound,
    BookOpen,
    CheckCircle,
    XCircle,
    Layers,
    Settings,
    LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {

    const { logout } = useAuth(); // 🔥 AUTH CONTEXT LOGOUT

    const menuClass =
        "flex items-center gap-2 p-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-200";

    const activeClass =
        "flex items-center gap-2 p-2 rounded-lg text-white bg-gray-900 transition-all duration-200";

    return (
        <div className="w-64 h-screen bg-black text-white fixed p-5 overflow-y-auto flex flex-col">

            {/* Logo */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            </div>

            {/* Dashboard */}
            <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? activeClass : menuClass)}
            >
                <LayoutDashboard size={20} /> Dashboard
            </NavLink>

            {/* Users */}
            <p className="text-gray-400 text-xs uppercase mt-6 mb-1 tracking-wide">Users</p>

            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <Users size={18} /> All Users
            </NavLink>

            <NavLink to="/admin/students" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <UserRound size={18} /> Students
            </NavLink>

            <NavLink to="/admin/instructors" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <UserCheck size={18} /> Instructors
            </NavLink>

            {/* Courses */}
            <p className="text-gray-400 text-xs uppercase mt-6 mb-1 tracking-wide">Courses</p>

            <NavLink to="/admin/courses/pending" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <BookOpen size={18} /> Pending Courses
            </NavLink>

            <NavLink to="/admin/courses" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <Layers size={18} /> All Courses
            </NavLink>

            <NavLink to="/admin/courses/approved" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <CheckCircle size={18} /> Approved
            </NavLink>

            <NavLink to="/admin/courses/rejected" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <XCircle size={18} /> Rejected
            </NavLink>

            {/* Modules */}
            <p className="text-gray-400 text-xs uppercase mt-6 mb-1 tracking-wide">Content</p>

            <NavLink to="/admin/modules" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <Layers size={18} /> Modules
            </NavLink>

            {/* Settings */}
            <p className="text-gray-400 text-xs uppercase mt-6 mb-1 tracking-wide">Settings</p>

            <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <Settings size={18} /> Site Settings
            </NavLink>

            {/* Account */}
            <p className="text-gray-400 text-xs uppercase mt-6 mb-1 tracking-wide">Account</p>

            <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? activeClass : menuClass)}>
                <UserRound size={18} /> Profile
            </NavLink>

            {/* LOGOUT BUTTON  🔥🔥 */}
            <button
                onClick={logout}
                className="flex items-center gap-2 p-2 rounded-lg text-red-400 
                           hover:bg-red-600 hover:text-white transition-all duration-200 mt-4"
            >
                <LogOut size={18} /> Logout
            </button>

        </div>
    );
}
