import React, { useState } from "react";
import api from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const { theme } = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/instructor/course/create", form);
      alert("Course created successfully!");
      setForm({ title: "", description: "", price: 0 });
    } catch {
      alert("Failed to create course");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-linear-to-br from-pink-100 via-purple-100 to-sky-100 text-gray-800"
        }`}
    >
      <div
        className={`w-full max-w-lg rounded-2xl shadow-lg p-8 transition-all duration-300 ${theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white/30 backdrop-blur-md border border-white/20"
          }`}
      >
        <h1
          className={`text-3xl font-extrabold text-center mb-6 drop-shadow-sm ${theme === "dark" ? "text-white" : "text-gray-800"
            }`}
        >
          Create New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
              }`}
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={form.description}
            onChange={handleChange}
            className={`w-full border rounded-xl p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
              }`}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleChange}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${theme === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
              }`}
            min={0}
            required
          />

          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-xl shadow-md transition transform hover:scale-105 ${theme === "dark"
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-sky-600"
              }`}
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
