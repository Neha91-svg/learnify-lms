import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function AddModule() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/instructor/course/${courseId}/module/add`, { title, description });
            navigate(`/instructor/course/${courseId}`);
        } catch (err) {
            alert("Failed to add module");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Add Module</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Module Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <textarea
                    placeholder="Module Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Add Module
                </button>
            </form>
        </div>
    );
}
