// src/pages/admin/InstructorDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { User, Mail, BookOpen } from "lucide-react";

export default function InstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await api.get(`/admin/instructors/${id}`);
        setInstructor(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load instructor details");
        navigate("/admin/instructors");
      }
      setLoading(false);
    };
    fetchInstructor();
  }, [id]);

  if (loading) return <div className="ml-64 p-10 text-center text-xl">Loading...</div>;

  return (
    <div className="p-10 ml-64 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">{instructor.name}</h1>
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex gap-2 items-center">
          <User size={20} />
          <span>Role: {instructor.role}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Mail size={20} />
          <span>Email: {instructor.email}</span>
        </div>
        <div className="flex gap-2 items-center">
          <BookOpen size={20} />
          <span>Enrolled Courses: {instructor.enrolledCourses?.length || 0}</span>
        </div>
        <div>Registered On: {new Date(instructor.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
