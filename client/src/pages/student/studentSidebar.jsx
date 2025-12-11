import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, User, LogOut } from "lucide-react";

const StudentSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Home", path: "/student/home", icon: <Home size={20} /> },
        { name: "My Courses", path: "/student/my-courses", icon: <BookOpen size={20} /> },
        { name: "Profile", path: "/student/profile", icon: <User size={20} /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="h-screen w-64 bg-white border-r shadow-sm fixed left-0 top-0 px-6 py-8 flex flex-col">

            {/* Title */}
            <h2 className="text-2xl font-bold mb-10 tracking-tight text-gray-800">
                Student Panel
            </h2>

            {/* Menu */}
            <ul className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                                ${location.pathname === item.path
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-700 hover:bg-blue-100"
                                }
                            `}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Logout Button Bottom */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all mt-auto"
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
    );
};

export default StudentSidebar;
