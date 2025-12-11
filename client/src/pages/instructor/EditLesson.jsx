import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function EditLesson() {
    const { courseId, moduleId, lessonId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState({
        title: "",
        content: "",
        videoUrl: "",
    });

    // Load the specific lesson
    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get(`/instructor/course/${courseId}/full`);

                const module = res.data.modules.find((m) => m._id === moduleId);
                if (!module) return;

                const foundLesson = module.lessons.find(
                    (l) => String(l._id) === String(lessonId)
                );

                if (foundLesson) {
                    setLesson({
                        title: foundLesson.title,
                        content: foundLesson.content,
                        videoUrl: foundLesson.videoUrl,
                    });
                }
            } catch (err) {
                console.error("Load lesson error:", err);
            }
        };

        load();
    }, [courseId, moduleId, lessonId]);

    const handleChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(
                `/instructor/course/${courseId}/module/${moduleId}/lesson/${lessonId}/edit`,
                {
                    title: lesson.title,
                    content: lesson.content,
                    videoUrl: lesson.videoUrl,
                }
            );

            alert("Lesson updated successfully!");
            navigate(`/instructor/course/${courseId}/manage`);
        } catch (err) {
            console.error("Lesson update error:", err);
            alert("Failed to update lesson");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={lesson.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Lesson Title"
                />

                <textarea
                    name="content"
                    value={lesson.content}
                    onChange={handleChange}
                    className="w-full border p-2 rounded h-32"
                    placeholder="Lesson Content"
                />

                <input
                    type="text"
                    name="videoUrl"
                    value={lesson.videoUrl}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Video URL"
                />

                <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
