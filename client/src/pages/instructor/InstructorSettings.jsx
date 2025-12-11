import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function InstructorSettings() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        avatar: "",
    });

    const [previewImage, setPreviewImage] = useState("");

    // Load Instructor Profile
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await api.get("/instructor/profile");
                setProfile(res.data.profile || {});
                setPreviewImage(res.data.profile?.avatar);
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        loadProfile();
    }, []);

    // Image select preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setProfile({ ...profile, avatar: file });
        }
    };

    // Handle Input
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Submit updated data
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

            await api.put("/instructor/profile/update", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Instructor Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Profile Image */}
                <div className="flex items-center gap-4">
                    <img
                        src={previewImage || "/default-avatar.png"}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border"
                    />

                    <div>
                        <label className="block text-sm font-medium">Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2"
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
                        className="w-full p-3 border rounded-xl"
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
                        className="w-full p-3 border rounded-xl"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block font-medium mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl h-32"
                        placeholder="Write something about yourself…"
                    ></textarea>
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
