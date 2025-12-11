import { useEffect, useState } from "react";
import api from "../../utils/api";
import { GraduationCap, Mail, User } from "lucide-react";

export default function AllStudents() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blockingId, setBlockingId] = useState(null); // for loading state

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get("/admin/students");
                setStudents(Array.isArray(res.data) ? res.data : res.data.students);
            } catch (error) {
                console.log("Error fetching students:", error);
            }
            setLoading(false);
        };
        fetchStudents();
    }, []);

    const handleBlockToggle = async (student) => {
        if (!window.confirm(`${student.isBlocked ? "Unblock" : "Block"} this student?`)) return;
        setBlockingId(student._id); // loading state for button

        try {
            // Call the backend API
            const res = await api.put(`/admin/students/block/${student._id}`);
            // Update local state
            setStudents(prev =>
                prev.map(s =>
                    s._id === student._id ? { ...s, isBlocked: !s.isBlocked } : s
                )
            );
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert("Failed to update student status");
        }

        setBlockingId(null);
    };

    if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;

    return (
        <div className="p-10 ml-64 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">
                🎓 All Students
            </h1>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student, index) => (
                    <div
                        key={student._id}
                        className={`bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-300
                        ${student.isBlocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:-translate-y-1"}`}
                    >
                        {/* Top Row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg--to-br from-pink-400 to-purple-500 text-white p-3 rounded-xl shadow">
                                    <GraduationCap size={26} />
                                </div>
                                <span className="text-gray-500 font-semibold text-sm">
                                    Student #{index + 1}
                                </span>
                            </div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow 
                                ${student.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                {student.isBlocked ? "Blocked" : "Student"}
                            </span>
                        </div>

                        {/* Name */}
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{student.name}</h2>

                        {/* Email */}
                        <div className="flex gap-2 items-center text-gray-600 mb-3">
                            <Mail size={18} />
                            <span>{student.email}</span>
                        </div>

                        {/* Role */}
                        <div className="flex gap-2 items-center text-gray-700 mb-4">
                            <User size={18} />
                            <span className="capitalize font-medium">{student.role}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setSelectedStudent(student)}
                                className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                            >
                                View Details
                            </button>
                           <button
  onClick={() => handleBlockToggle(student)}
  className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700 transition"
  disabled={blockingId === student._id}
>
  {blockingId === student._id
    ? "Processing..."
    : student.isBlocked
    ? "Unblock"
    : "Block"}
</button>

                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-96 relative shadow-lg">
                        <button
                            onClick={() => setSelectedStudent(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-bold mb-4">{selectedStudent.name}</h2>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                        <p><strong>Role:</strong> {selectedStudent.role}</p>
                        <p><strong>Registered On:</strong> {new Date(selectedStudent.createdAt).toLocaleDateString()}</p>
                        <p><strong>Courses Enrolled:</strong> {selectedStudent.courses?.length || 0}</p>
                        <p><strong>Status:</strong> {selectedStudent.isBlocked ? "Blocked" : "Active"}</p>
                        {/* Add more fields as needed */}
                    </div>
                </div>
            )}
        </div>
    );
}
