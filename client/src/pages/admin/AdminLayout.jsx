import AdminSidebar from "./AdminSidebar";
import { useTheme } from "../../context/ThemeContext";

export default function AdminLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      <div className="flex min-h-screen">

      
        <AdminSidebar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
