import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import LessonPlayer from "../../components/LessonPlayer"; // ✅ Add LessonPlayer

export default function ModuleLessons() {
    const { moduleId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const res = await api.get(`/admin/lessons/${moduleId}`);
                setData(res.data); // data should contain { module: "Module Name", lessons: [...] }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };

        loadLessons();
    }, [moduleId]);

    if (loading) 
        return <div className="ml-64 p-6">Loading...</div>;

    if (!data) 
        return <div className="ml-64 p-6 text-red-500">No module data found.</div>;

    return (
        <div className="ml-64 p-6 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">
                Lessons of Module: {data.module}
            </h1>

            <div className="space-y-6">
                {data.lessons.map((lsn) => (
                    <div key={lsn._id} className="bg-white border shadow rounded-lg p-6">
                        <h2 className="text-lg font-bold mb-2">{lsn.title}</h2>
                        <p className="text-gray-600 mb-4">{lsn.description}</p>

                        {/* Video Player */}
                        {lsn.videoUrl ? (
                            <LessonPlayer videoUrl={lsn.videoUrl.trim()} />
                        ) : (
                            <p className="text-gray-500">No video available for this lesson.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
