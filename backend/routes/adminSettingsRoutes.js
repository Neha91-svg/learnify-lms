// routes/adminSettingsRoutes.js
const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/siteSettingsController");
const auth = require("../middleware/auth");      
const admin = require("../middleware/admin");    

const multer = require("multer");
const upload = multer({
  dest: "uploads/", 
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", auth, admin, getSettings);

router.put("/", auth, admin, upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "favicon", maxCount: 1 },
  { name: "homepageBanner", maxCount: 1 },
  { name: "ogImage", maxCount: 1 }
]), updateSettings);

module.exports = router;
