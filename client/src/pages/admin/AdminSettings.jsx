// src/pages/admin/AdminSettings.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";

const tabs = ["General", "Appearance", "Auth", "Payments", "Course"];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/settings");
        setSettings(res.data.settings);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return <div className="ml-64 p-10 text-lg animate-pulse">Loading settings...</div>;
  if (!settings)
    return <div className="ml-64 p-10 text-lg">No settings found.</div>;

  // HANDLERS -------------------------------------
  const handleChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleToggle = (section, key) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] },
    }));
  };

  const onFileChange = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [field]: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setSettings((prev) => ({
        ...prev,
        general: { ...prev.general, [field]: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();

      const sections = [
        "general",
        "appearance",
        "auth",
        "payments",
        "courseSettings",
      ];
      sections.forEach((s) => {
        if (settings[s]) formData.append(s, JSON.stringify(settings[s]));
      });

      Object.keys(files).forEach((key) => {
        formData.append(key, files[key]);
      });

      const res = await api.put("/admin/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSettings(res.data.settings);
      alert("Settings saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    }
    setSaving(false);
  };

  // ------------------ TABS UI ------------------
  const SectionCard = ({ children }) => (
    <div className="space-y-4 text-gray-700">{children}</div>
  );

  const Label = ({ children }) => (
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      {children}
    </label>
  );

  const Input = (props) => (
    <input
      {...props}
      className={`mt-1 p-2 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none ${props.className}`}
    />
  );

  const GeneralTab = () => (
    <SectionCard>
      <div>
        <Label>Site Name</Label>
        <Input
          value={settings.general.siteName || ""}
          onChange={(e) => handleChange("general", "siteName", e.target.value)}
        />
      </div>

      <div>
        <Label>Tagline</Label>
        <Input
          value={settings.general.tagline || ""}
          onChange={(e) => handleChange("general", "tagline", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Support Email</Label>
          <Input
            value={settings.general.supportEmail || ""}
            onChange={(e) =>
              handleChange("general", "supportEmail", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Support Phone</Label>
          <Input
            value={settings.general.supportPhone || ""}
            onChange={(e) =>
              handleChange("general", "supportPhone", e.target.value)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Logo</Label>
          <input type="file" accept="image/*" onChange={(e) => onFileChange("logo", e)} />
          {settings.general.logo && (
            <img src={settings.general.logo} className="h-12 mt-2 rounded-lg shadow-md" />
          )}
        </div>

        <div>
          <Label>Favicon</Label>
          <input type="file" accept="image/*" onChange={(e) => onFileChange("favicon", e)} />
          {settings.general.favicon && (
            <img src={settings.general.favicon} className="h-10 mt-2 rounded-lg shadow-md" />
          )}
        </div>
      </div>

      <div>
        <Label>Footer Text</Label>
        <textarea
          rows="3"
          value={settings.general.footerText || ""}
          onChange={(e) =>
            handleChange("general", "footerText", e.target.value)
          }
          className="mt-1 p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>
    </SectionCard>
  );

  const AppearanceTab = () => (
    <SectionCard>
      <div>
        <Label>Default Theme</Label>
        <select
          value={settings.appearance.defaultTheme}
          onChange={(e) =>
            handleChange("appearance", "defaultTheme", e.target.value)
          }
          className="p-2 bg-gray-50 border rounded-lg"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <Label>Primary Color</Label>
        <Input
          value={settings.appearance.primaryColor}
          onChange={(e) =>
            handleChange("appearance", "primaryColor", e.target.value)
          }
          className="w-40"
        />
      </div>

      <div>
        <Label>Homepage Banner</Label>
        <input type="file" accept="image/*" onChange={(e) => onFileChange("homepageBanner", e)} />
        {settings.appearance.homepageBanner && (
          <img
            src={settings.appearance.homepageBanner}
            className="mt-2 max-h-40 rounded-lg shadow-md"
          />
        )}
      </div>
    </SectionCard>
  );

  const AuthTab = () => (
    <SectionCard>
      {[
        ["allowStudentSignup", "Allow student signup"],
        ["allowInstructorSignup", "Allow instructor signup"],
        ["emailVerificationRequired", "Email verification required"],
      ].map(([key, label]) => (
        <label key={key} className="flex items-center gap-3 font-medium">
          <input
            type="checkbox"
            checked={settings.auth[key]}
            onChange={() => handleToggle("auth", key)}
          />
          {label}
        </label>
      ))}
    </SectionCard>
  );

  const PaymentsTab = () => (
    <SectionCard>
      <div>
        <Label>Currency</Label>
        <Input
          value={settings.payments.currency}
          onChange={(e) =>
            handleChange("payments", "currency", e.target.value)
          }
          className="w-40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Razorpay Key</Label>
          <Input
            value={settings.payments.razorpayKey}
            onChange={(e) =>
              handleChange("payments", "razorpayKey", e.target.value)
            }
          />
        </div>
        <div>
          <Label>Stripe Key</Label>
          <Input
            value={settings.payments.stripeKey}
            onChange={(e) =>
              handleChange("payments", "stripeKey", e.target.value)
            }
          />
        </div>
      </div>

      <div>
        <Label>Platform Commission %</Label>
        <Input
          type="number"
          value={settings.payments.platformCommissionPct}
          onChange={(e) =>
            handleChange("payments", "platformCommissionPct", Number(e.target.value))
          }
          className="w-32"
        />
      </div>
    </SectionCard>
  );

  const CourseTab = () => (
    <SectionCard>
      <label className="flex items-center gap-3 font-medium">
        <input
          type="checkbox"
          checked={settings.courseSettings.autoApproveCourses}
          onChange={() => handleToggle("courseSettings", "autoApproveCourses")}
        />
        Auto approve courses
      </label>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Max modules per course</Label>
          <Input
            type="number"
            value={settings.courseSettings.maxModulesPerCourse}
            onChange={(e) =>
              handleChange("courseSettings", "maxModulesPerCourse", Number(e.target.value))
            }
          />
        </div>

        <div>
          <Label>Max lessons per module</Label>
          <Input
            type="number"
            value={settings.courseSettings.maxLessonsPerModule}
            onChange={(e) =>
              handleChange("courseSettings", "maxLessonsPerModule", Number(e.target.value))
            }
          />
        </div>
      </div>
    </SectionCard>
  );

  const renderTab = () => {
    switch (activeTab) {
      case "General":
        return <GeneralTab />;
      case "Appearance":
        return <AppearanceTab />;
      case "Auth":
        return <AuthTab />;
      case "Payments":
        return <PaymentsTab />;
      case "Course":
        return <CourseTab />;
      default:
        return null;
    }
  };

  // --------------------- FINAL UI ----------------------
  return (
    <div className="ml-64 p-10 min-h-screen bg-linear-to-br from-gray-100 via-white to-gray-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          ⚙️ Site Settings
        </h1>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                     text-white font-semibold shadow-md transition-all"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-8">

        {/* SIDEBAR */}
        <div className="w-64 rounded-2xl p-6 shadow-xl
                        bg-linear-to-b from-indigo-500 to-indigo-600 text-white">

          <h3 className="text-lg font-semibold mb-4 opacity-90">Settings Menu</h3>

          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all mb-2
                ${
                  activeTab === t
                    ? "bg-white text-indigo-700 shadow-md"
                    : "hover:bg-indigo-400/40"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
