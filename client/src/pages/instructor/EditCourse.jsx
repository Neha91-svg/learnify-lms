import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  // Load course on mount
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await api.get(`/instructor/course/${courseId}/full`);
        const data = res.data;

        setCourse({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadCourse();
  }, [courseId]);

  // Handle inputs
  const handleChange = (e) =>
    setCourse({ ...course, [e.target.name]: e.target.value });

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("price", course.price);

      // No thumbnail field now

      await api.put(`/instructor/course/${courseId}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/instructor/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-2 border"
        />

        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border"
        />

        {/* Thumbnail removed */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}
