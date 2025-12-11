import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { FaEnvelope, FaUserTag, FaCalendarAlt } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile"); // new route
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.length > 1
      ? names[0][0] + names[1][0]
      : names[0][0];
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;
  if (!user) return <p className="text-center mt-8">User not found.</p>;

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center md:w-1/3">
            <div className="w-32 h-32 rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {getInitials(user.name)}
            </div>
            <p className="mt-4 text-gray-700 text-center font-medium">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>

          {/* Info Section */}
          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <p className="text-gray-700 font-medium">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <FaUserTag className="text-green-500" />
              <p className="text-gray-700 font-medium capitalize">{user.role}</p>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-purple-500" />
              <p className="text-gray-700 font-medium">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
