import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(form);

      // After signup, redirect to login page
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-pink-400 via-purple-500 to-yellow-400 p-6">
      <form
        onSubmit={handleSignup}
        className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow">
          Create Account ✨
        </h2>

        <div className="mt-6 space-y-4 text-white font-semibold">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40 text-black"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl shadow-lg"
          >
            {loading ? "Creating Account..." : "Sign Up 🚀"}
          </button>

          <p className="text-center text-white text-sm">
            Already have an account?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
