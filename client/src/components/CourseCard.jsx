import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

// 🔥 Category Based Images
const categoryImages = {
    react: "https://source.unsplash.com/600x400/?reactjs,code",
    javascript: "https://source.unsplash.com/600x400/?javascript,web",
    python: "https://source.unsplash.com/600x400/?python,programming",
    node: "https://source.unsplash.com/600x400/?nodejs,backend",
    backend: "https://source.unsplash.com/600x400/?backend,api",
    frontend: "https://source.unsplash.com/600x400/?frontend,web",
    web: "https://source.unsplash.com/600x400/?webdevelopment",
    html: "https://source.unsplash.com/600x400/?html,css",
    css: "https://source.unsplash.com/600x400/?css,ui",
    ai: "https://source.unsplash.com/600x400/?artificialintelligence",
    data: "https://source.unsplash.com/600x400/?data,analytics",
};

const defaultImages = [
    "https://source.unsplash.com/600x400/?coding",
    "https://source.unsplash.com/600x400/?programming",
    "https://source.unsplash.com/600x400/?computer",
    "https://source.unsplash.com/600x400/?technology",
    "https://source.unsplash.com/600x400/?developer",
];

export default function CourseCard({ course, isEnrolled }) {
    const navigate = useNavigate();

    const title = course.title?.toLowerCase() || "";

    let selectedImage = null;

    Object.keys(categoryImages).forEach((key) => {
        if (title.includes(key)) {
            selectedImage = categoryImages[key];
        }
    });

    const thumbnail =
        course.thumbnail ||
        selectedImage ||
        defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const handleEnroll = async () => {
        try {
            await api.post(`/courses/${course._id}/enroll`);
            navigate(`/course/${course._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition duration-300">
            <img
                src={thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-4 cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)}
            />

            <h3
                className="text-lg font-bold mb-2 cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)}
            >
                {course.title}
            </h3>

            <p className="text-gray-600 mb-3 text-sm">
                {course.description?.slice(0, 70)}...
            </p>

            <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 font-semibold">
                    {course.price ? `₹${course.price}` : "Free"}
                </span>
                <span className="text-yellow-500 font-bold">
                    ⭐ {course.rating || "0.0"}
                </span>
            </div>

            {isEnrolled ? (
                <button
                    disabled
                    className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
                >
                    Already Enrolled
                </button>
            ) : (
                <button
                    onClick={handleEnroll}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Enroll Now
                </button>
            )}
        </div>
    );
}
