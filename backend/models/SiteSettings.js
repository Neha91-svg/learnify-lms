const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({
  general: {
    siteName: { type: String, default: "My LMS" },
    tagline: { type: String, default: "" },
    supportEmail: { type: String, default: "" },
    supportPhone: { type: String, default: "" },
    footerText: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
  },
  appearance: {
    defaultTheme: { type: String, enum: ["light","dark"], default: "light" },
    primaryColor: { type: String, default: "#6366F1" },
    homepageBanner: { type: String, default: "" },
    courseCardView: { type: String, enum:["grid","list"], default:"grid" }
  },
  auth: {
    allowStudentSignup: { type: Boolean, default: true },
    allowInstructorSignup: { type: Boolean, default: false },
    emailVerificationRequired: { type: Boolean, default: true },
    socialLogins: {
      google: { type: Boolean, default: false },
      github: { type: Boolean, default: false },
      facebook: { type: Boolean, default: false }
    }
  },
  payments: {
    currency: { type: String, default: "INR" },
    razorpayKey: { type: String, default: "" },
    stripeKey: { type: String, default: "" },
    paypalClientId: { type: String, default: "" },
    platformCommissionPct: { type: Number, default: 20 },
    taxEnabled: { type: Boolean, default: false }
  },
  email: {
    smtpHost: { type: String, default: "" },
    smtpPort: { type: Number, default: 587 },
    smtpUser: { type: String, default: "" },
    smtpPass: { type: String, default: "" },
    fromAddress: { type: String, default: "" }
  },
  courseSettings: {
    autoApproveCourses: { type: Boolean, default: false },
    maxModulesPerCourse: { type: Number, default: 50 },
    maxLessonsPerModule: { type: Number, default: 200 }
  },
  seo: {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" }
  },
  integrations: {
    googleAnalyticsId: { type: String, default: "" },
    facebookPixel: { type: String, default: "" },
    cloudStorage: { type: String, default: "" } // e.g., "cloudinary" or "s3"
  }
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
