// src/pages/admin/ApprovedCourses.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { BookOpen, User, Mail } from "lucide-react";

export default function ApprovedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/admin/courses/approved");
                setCourses(res.data || []);
            } catch (error) {
                console.log("Error fetching approved courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-10 ml-64 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">
                ✅ Approved Courses
            </h1>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {/* Gradient Icon */}
                                <div className="bg-linear-to-br from-green-400 to-green-600 text-white p-3 rounded-xl shadow">
                                    <BookOpen size={26} />
                                </div>

                                <span className="text-gray-500 text-sm font-semibold">
                                    Course #{index + 1}
                                </span>
                            </div>

                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold shadow">
                                {course.status}
                            </span>
                        </div>

                        {/* Course Title */}
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            {course.title}
                        </h2>

                        {/* Instructor Name */}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <User size={18} />
                            <span className="font-medium">{course.instructor?.name}</span>
                        </div>

                        {/* Instructor Email */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={18} />
                            <span>{course.instructor?.email}</span>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    No approved courses available.
                </p>
            )}
        </div>
    );
}
