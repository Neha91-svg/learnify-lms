import { useEffect, useState } from "react";
import api from "../../utils/api";
import { User, Mail, Shield } from "lucide-react";

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/admin/users");
                setUsers(Array.isArray(res.data) ? res.data : res.data.users);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const roleColors = {
        admin: "bg-purple-100 text-purple-700",
        instructor: "bg-blue-100 text-blue-700",
        student: "bg-green-100 text-green-700",
    };

    return (
        <div className="p-10 ml-64 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
                👥 All Users
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 
                        hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Icon + Index */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-linear-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl shadow">
                                    <User size={26} />
                                </div>
                                <span className="text-gray-500 font-semibold text-sm">
                                    User #{index + 1}
                                </span>
                            </div>

                            <span
                                className={
                                    "px-3 py-1 text-xs font-semibold rounded-full shadow " +
                                    (roleColors[user.role] || "bg-gray-100 text-gray-600")
                                }
                            >
                                {user.role}
                            </span>
                        </div>

                        {/* User Name */}
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {user.name}
                        </h2>

                        {/* Email */}
                        <div className="flex gap-2 items-center text-gray-600 mb-4">
                            <Mail size={18} />
                            <span>{user.email}</span>
                        </div>

                        {/* Role Info */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <Shield size={18} className="text-gray-700" />
                            <span className="font-medium capitalize">{user.role}</span>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No users found.</p>
            )}
        </div>
    );
}
