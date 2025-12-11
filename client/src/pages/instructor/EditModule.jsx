import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function EditModule() {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();

    const [moduleData, setModuleData] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);

    // Load module
    useEffect(() => {
        const loadModule = async () => {
            try {
                const res = await api.get(`/instructor/course/${courseId}/full`);
                const module = res.data.modules.find((m) => m._id === moduleId);
                if (!module) throw new Error("Module not found");

                // Always set default string values to avoid uncontrolled input warning
                setModuleData({
                    title: module.title || "",
                    description: module.description || ""
                });
            } catch (err) {
                console.error("Module Load Error:", err);
                alert("Failed to load module. Check console for details.");
            }
            setLoading(false);
        };
        loadModule();
    }, [courseId, moduleId]);

    const handleChange = (e) => {
        setModuleData({ ...moduleData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!moduleData.title.trim()) {
            alert("Title cannot be empty");
            return;
        }

        try {
            const res = await api.put(
                `/instructor/course/${courseId}/module/${moduleId}/edit`,
                moduleData,
                { headers: { "Content-Type": "application/json" } }
            );
            alert(res.data.message);
            navigate(`/instructor/course/${courseId}`);
        } catch (err) {
            console.error("Module Edit Error:", err);
            alert(err.response?.data?.message || "Failed to update module");
        }
    };

    if (loading) return <p className="p-6 text-center">Loading module...</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Module</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Module Title"
                    value={moduleData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Module Description"
                    value={moduleData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded h-32"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                    Save Module
                </button>
            </form>
        </div>
    );
}
