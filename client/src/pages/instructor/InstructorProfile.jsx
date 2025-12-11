import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function InstructorProfile() {
    const { theme } = useTheme();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        avatar: "",
    });
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(true);

    // Load profile from backend
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await api.get("/instructor/profile");
                const data = res.data.profile;
                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    bio: data.bio || "",
                    avatar: data.avatar || "",
                });
                setPreviewImage(data.avatar || "/default-avatar.png");
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle avatar selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setProfile({ ...profile, avatar: file });
        }
    };

    // Submit updated profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("email", profile.email);
            formData.append("bio", profile.bio);
            if (profile.avatar instanceof File) {
                formData.append("avatar", profile.avatar);
            }

            const res = await api.put("/instructor/profile/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updated = res.data.profile;
            setProfile({
                name: updated.name,
                email: updated.email,
                bio: updated.bio,
                avatar: updated.avatar,
            });
            setPreviewImage(`${updated.avatar}?t=${new Date().getTime()}`); // Force reload image
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        }
    };

    if (loading)
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-linear-to-br from-pink-100 via-purple-100 to-sky-100 text-gray-800"
                    }`}
            >
                Loading...
            </div>
        );

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${theme === "dark"
                    ? "bg-gray-900 text-gray-200"
                    : "bg-linear-to-br from-pink-100 via-purple-100 to-sky-100 text-gray-800"
                }`}
        >
            <div
                className={`w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 ${theme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white/30 backdrop-blur-md border border-white/20"
                    }`}
            >
                <h1
                    className={`text-2xl sm:text-3xl font-extrabold text-center mb-6 drop-shadow-sm ${theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                >
                    Instructor Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <img
                            src={previewImage || "/default-avatar.png"}
                            alt="Avatar"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-2 w-full text-sm text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                }`}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                }`}
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block font-medium mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-xl border h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                }`}
                            placeholder="Write something about yourself…"
                        ></textarea>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 font-semibold rounded-xl shadow-md transition transform hover:scale-105 ${theme === "dark"
                                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                                : "bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-sky-600"
                            }`}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
