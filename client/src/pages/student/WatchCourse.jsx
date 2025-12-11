import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import StudentSidebar from "./studentSidebar";

export default function WatchCourse() {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [courseLessons, setCourseLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const lessonRes = await api.get(`/lesson/${lessonId}`);
                setLesson(lessonRes.data);

                // Fetch all lessons of this course
                const lessonsRes = await api.get(`/courses/${lessonRes.data.course._id}/lessons`);
                setCourseLessons(lessonsRes.data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (lessonId) fetchLessonData();
    }, [lessonId]);

    if (loading) return <p className="text-center mt-8">Loading lesson...</p>;
    if (!lesson) return <p className="text-center mt-8">Lesson not found.</p>;

    return (
        <div className="flex">
            <StudentSidebar />

            <div className="ml-64 p-6 w-full flex gap-6">

                {/* Video */}
                <div className="w-3/4 bg-white p-5 rounded-xl shadow">
                    <h1 className="text-2xl font-bold mb-3">{lesson.title}</h1>
                    {lesson.videoUrl ? (
                        <video controls className="w-full rounded-xl shadow mb-5">
                            <source src={lesson.videoUrl} type="video/mp4" />
                        </video>
                    ) : (
                        <p className="text-gray-600">No video available</p>
                    )}
                    <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
                </div>

                {/* Lesson List */}
                <div className="w-1/4 bg-white p-4 rounded-xl shadow h-[85vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                        All Lessons
                    </h3>
                    <ul className="space-y-2">
                        {courseLessons.map((l, index) => (
                            <li key={l._id}>
                                <Link
                                    to={`/watch/${l._id}`}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition 
                                        ${l._id === lessonId ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}
                                    `}
                                >
                                    <span className="font-bold">{index + 1}.</span>
                                    <span>{l.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}
