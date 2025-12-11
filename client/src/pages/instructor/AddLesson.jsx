import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AddLesson() {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState({
        title: "",
        content: "",
        videoUrl: "",
    });

    const handleChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(
                `/instructor/course/${courseId}/module/${moduleId}/lesson/add`,
                lesson
            );

            navigate(`/instructor/course/${courseId}`);
        } catch (err) {
            console.error("Lesson Add Error:", err);
            alert("Failed to add lesson");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Add Lesson</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Lesson Title"
                    value={lesson.title}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />

                <textarea
                    name="content"
                    placeholder="Lesson Content"
                    value={lesson.content}
                    onChange={handleChange}
                    className="p-2 border rounded h-32"
                    required
                />

                <input
                    type="text"
                    name="videoUrl"
                    placeholder="Enter Video URL (YouTube / MP4)"
                    value={lesson.videoUrl}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />


                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Lesson
                </button>
            </form>
        </div>
    );
}
