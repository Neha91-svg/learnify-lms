import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Mail, User, GraduationCap } from "lucide-react";

export default function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await api.get(`/admin/students/${id}`);
                setStudent(res.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load student details");
                navigate("/admin/students");
            }
            setLoading(false);
        };
        fetchStudent();
    }, [id]);

    if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;

    return (
        <div className="p-10 ml-64 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">{student.name}</h1>
            <div className="bg-white shadow rounded-xl p-6 space-y-4">
                <div className="flex gap-2 items-center">
                    <GraduationCap size={20} />
                    <span>Role: {student.role}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Mail size={20} />
                    <span>Email: {student.email}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <User size={20} />
                    <span>Courses Enrolled: {student.enrolledCourses?.length || 0}</span>
                </div>
                <div>Status: {student.isBlocked ? "Blocked" : "Active"}</div>
                <div>Registered On: {new Date(student.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    );
}
