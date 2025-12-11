import { useEffect, useState } from "react";
import api from "../../utils/api";
import { BookOpen, User, Mail, Clock } from "lucide-react";

export default function PendingCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchPendingCourses = async () => {
            try {
                const res = await api.get("/admin/courses/pending");
                setCourses(Array.isArray(res.data) ? res.data : res.data.courses);
            } catch (error) {
                console.log("Error fetching pending courses:", error);
            }
        };

        fetchPendingCourses();
    }, []);

    return (
        <div className="p-10 ml-64 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">
                ⏳ Pending Courses
            </h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100
                                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-linear-to-br from-purple-500 to-pink-400 text-white p-3 rounded-xl shadow">
                                    <BookOpen size={26} />
                                </div>
                                <span className="text-gray-500 font-semibold text-sm">
                                    Course #{index + 1}
                                </span>
                            </div>

                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full shadow">
                                Pending
                            </span>
                        </div>

                        {/* Course Title */}
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            {course.title}
                        </h2>

                        {/* Instructor Name */}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <User size={18} />
                            <span className="font-medium">
                                {course.instructor?.name}
                            </span>
                        </div>

                        {/* Instructor Email */}
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <Mail size={18} />
                            <span>{course.instructor?.email}</span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-gray-700 mt-3">
                            <Clock size={18} />
                            <span className="font-semibold capitalize">{course.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                    No pending courses found.
                </p>
            )}
        </div>
    );
}
