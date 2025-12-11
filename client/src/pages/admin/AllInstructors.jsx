import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../utils/api";
import { User } from "lucide-react";

export default function AllInstructors() {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get("/admin/instructors");
        setInstructors(res.data || []);
      } catch (error) {
        console.log("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  if (!Array.isArray(instructors)) return <div className="ml-64 p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 ml-64 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide">
        🎓 All Instructors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor, index) => (
          <div
            key={instructor._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md text-white">
                  <User size={24} />
                </div>
                <span className="text-gray-500 font-semibold text-sm">#{index + 1}</span>
              </div>

              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full shadow">
                {instructor.role}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-1">{instructor.name}</h3>

            {/* Email */}
            <p className="text-gray-600 text-sm mb-4">{instructor.email}</p>

            {/* Action Button */}
            <button
              onClick={() => navigate(`/admin/instructor/${instructor._id}`)}  
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {instructors.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No instructors found.
        </p>
      )}
    </div>
  );
}
