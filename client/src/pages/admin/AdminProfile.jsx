import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminProfile() {
    const [admin, setAdmin] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);

    const [updateData, setUpdateData] = useState({ name: "", email: "" });
    const [password, setPassword] = useState("");

    const loadProfile = async () => {
        try {
            const res = await api.get("/admin/profile");
            setAdmin(res.data.admin);
            setUpdateData({
                name: res.data.admin.name,
                email: res.data.admin.email,
            });
        } catch (err) {
            alert("Error loading profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put("/admin/profile/update", updateData);
            alert("Profile updated!");
            setAdmin(res.data.admin);
        } catch {
            alert("Failed to update profile");
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        if (!password || password.length < 6)
            return alert("Password must be at least 6 characters!");

        try {
            await api.put("/admin/profile/change-password", { newPassword: password });
            alert("Password changed!");
            setPassword("");
        } catch {
            alert("Failed to change password");
        }
    };

    if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;

    return (
        <div className="ml-64 max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Profile</h1>

            {/* --------------------
                PROFILE UPDATE CARD
            -------------------- */}
            <div className="bg-white border rounded-xl p-5 shadow-sm mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Update Profile
                </h2>

                <form onSubmit={updateProfile} className="space-y-3">

                    <div>
                        <label className="block text-sm mb-1 text-gray-600">Name</label>
                        <input
                            type="text"
                            value={updateData.name}
                            onChange={(e) =>
                                setUpdateData({ ...updateData, name: e.target.value })
                            }
                            className="w-full p-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            value={updateData.email}
                            onChange={(e) =>
                                setUpdateData({ ...updateData, email: e.target.value })
                            }
                            className="w-full p-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </form>
            </div>

            {/* --------------------
                PASSWORD CHANGE
            -------------------- */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Change Password
                </h2>

                <form onSubmit={changePassword} className="space-y-3">

                    <div>
                        <label className="block text-sm mb-1 text-gray-600">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 text-sm border rounded-lg focus:ring focus:ring-green-200"
                            placeholder="Enter new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}
