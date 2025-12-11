import { useEffect, useState } from "react";
import api from "../../utils/api";
import { BookOpen, User, Mail, XCircle } from "lucide-react";

export default function RejectedCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/admin/courses/rejected");
                setCourses(Array.isArray(res.data) ? res.data : res.data.courses);
            } catch (error) {
                console.log("Error fetching rejected courses:", error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-10 ml-64 min-h-screen bg-linear-to-br from-gray-100 via-white to-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">
                ❌ Rejected Courses
            </h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {courses.map((course, index) => (
                    <div
                        key={course._id}
                        className="rounded-2xl bg-white shadow-xl p-7 border border-gray-100
                        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                        bg-linear-to-br from-red-50 to-pink-50"
                    >
                        {/* Top Section */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="p-4 rounded-xl shadow 
                                    bg-linear-to-br from-red-500 to-pink-500 text-white">
                                    <BookOpen size={26} />
                                </div>

                                <span className="text-sm font-semibold text-red-600">
                                    Course #{index + 1}
                                </span>
                            </div>

                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs 
                                font-semibold rounded-full shadow-md">
                                Rejected
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            {course.title}
                        </h2>

                        {/* Instructor */}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <User size={18} className="text-red-500" />
                            <span className="font-medium">{course.instructor?.name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <Mail size={18} className="text-red-400" />
                            <span>{course.instructor?.email}</span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                            <XCircle size={20} />
                            <span className="capitalize">{course.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    No rejected courses found.
                </p>
            )}
        </div>
    );
}
