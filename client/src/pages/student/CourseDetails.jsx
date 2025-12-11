import React, { useState } from "react";
import StudentSidebar from "./studentSidebar";
import LessonPlayer from "../../components/LessonPlayer"; 

export default function CourseDetails({ course }) {
    const [activeLesson, setActiveLesson] = useState(null);

    if (!course)
        return (
            <p className="text-center mt-10 text-lg font-medium text-gray-700">
                No course data found.
            </p>
        );

    return (
        <div className="flex min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100">
            <StudentSidebar />

            <div className="ml-64 flex-1 p-8">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-600 via-pink-500 to-red-500 mb-4">
                        {course.title}
                    </h1>
                    <p className="text-gray-700 text-lg mb-6">{course.description}</p>

                    <div className="bg-purple-50 p-5 rounded-xl shadow mb-10">
                        <p className="text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-purple-700">₹{course.price}</p>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Modules & Lessons
                    </h2>

                    {course.modules?.length ? (
                        <div className="space-y-6">
                            {course.modules.map((module) => (
                                <div key={module._id} className="border rounded-2xl p-6 bg-purple-50 shadow">
                                    <h3 className="text-xl font-bold mb-2 text-purple-800">
                                        {module.title}
                                    </h3>

                                    {module.lessons?.length ? (
                                        <ul className="space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <li
                                                    key={lesson._id}
                                                    onClick={() => setActiveLesson(lesson)}
                                                    className="cursor-pointer p-3 rounded-lg bg-white shadow hover:bg-purple-100 transition"
                                                >
                                                    <p className="font-semibold">{lesson.title}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No lessons yet.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No modules added yet.</p>
                    )}

                    {activeLesson && (
                        <div className="mt-10 p-6 bg-white rounded-2xl shadow-lg border">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                {activeLesson.title}
                            </h3>

                            {activeLesson.videoUrl ? (
                                <LessonPlayer videoUrl={activeLesson.videoUrl.trim()} />
                            ) : (
                                <p className="text-gray-500">No video available for this lesson.</p>
                            )}

                            <p className="mt-4 text-gray-700">{activeLesson.content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
