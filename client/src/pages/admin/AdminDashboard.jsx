import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  Users,
  BookOpen,
  UserCheck
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInstructors: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/admin/analytics");
        setStats(res.data);
      } catch (error) {
        console.log("Analytics Error:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const pieData = [
    { name: "Students", value: stats.totalUsers },
    { name: "Instructors", value: stats.totalInstructors },
    { name: "Courses", value: stats.totalCourses },
  ];

  const COLORS = ["#b388ff", "#ff8aa4", "#ffd3b6"];

  return (
    <div className="ml-64 p-8 min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-100">

      <h2 className="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow-sm">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

        <DashboardCard
          title="Total Students"
          value={stats.totalUsers}
          icon={<Users size={40} />}
        />

        <DashboardCard
          title="Total Instructors"
          value={stats.totalInstructors}
          icon={<UserCheck size={40} />}
        />

        <DashboardCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={<BookOpen size={40} />}
        />
      </div>

      <div className="backdrop-blur-lg bg-white/60 border border-white/40 p-7 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-purple-700">User & Course Distribution</h3>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}


function DashboardCard({ title, value, icon }) {
  return (
    <div
      className="backdrop-blur-xl bg-white/50 border border-white/40 p-6 
      rounded-3xl shadow-lg flex items-center justify-between
      transform hover:scale-[1.04] transition-all cursor-pointer"
    >
      <div>
        <h3 className="text-gray-700 font-semibold text-lg">{title}</h3>
        <p className="text-4xl font-extrabold mt-2 text-purple-700">{value}</p>
      </div>
      <div className="text-purple-600">{icon}</div>
    </div>
  );
}
