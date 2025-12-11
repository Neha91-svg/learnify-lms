import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import CourseDetails from "./CourseDetails";

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCourse, setActiveCourse] = useState(null);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                // Correct student route
                const res = await api.get("/student/my-courses");

                //  Backend returns array, so directly store it
                setCourses(res.data || []);
            } catch (err) {
                console.error("Error fetching my courses:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    const openCourse = async (courseId) => {
        try {
            const res = await api.get(`/student/course/${courseId}/full`);

            //  backend returns { course }
            setActiveCourse(res.data.course);
        } catch (err) {
            console.error("Error fetching course:", err);
            alert("Failed to load course");
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-10 text-gray-500 text-lg">
                Loading your courses...
            </p>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100">
            {!activeCourse ? (
                <>
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 drop-shadow">
                        My Courses
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="rounded-2xl shadow-lg border border-white/40 bg-white/60 backdrop-blur-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer p-5"
                            >
                                <h3 className="text-xl font-bold text-gray-800">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {course.description?.slice(0, 90)}...
                                </p>

                                <button
                                    onClick={() => openCourse(course._id)}
                                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow"
                                >
                                    Go to Course
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={() => setActiveCourse(null)}
                        className="text-blue-700 hover:underline mb-5 font-medium"
                    >
                        ← Back to My Courses
                    </button>

                    {/* Pass activeCourse as prop */}
                    <CourseDetails course={activeCourse} />
                </>
            )}
        </div>
    );
}
