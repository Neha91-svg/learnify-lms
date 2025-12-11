import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(form);

      if (user.role === "instructor") navigate("/instructor/dashboard");
      else if (user.role === "student") navigate("/student/home");
      else navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-yellow-300 via-pink-400 to-purple-500 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white">Login ✨</h2>

        <div className="mt-6 space-y-4 text-white font-semibold">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/40"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-pink-700 font-bold py-3 rounded-xl shadow-lg"
          >
            {loading ? "Logging in..." : "Login ✨"}
          </button>
        </div>

        <p className="text-center text-white mt-4">
          Don’t have an account?
          <Link to="/signup" className="font-bold text-yellow-300 ml-1 underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
