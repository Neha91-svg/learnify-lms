const SiteSettings = require("../models/SiteSettings");

const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({ success: true, settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const payload = req.body || {};
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});

    const updatableSections = [
      "general","appearance","auth","payments","email",
      "courseSettings","seo","integrations"
    ];

    updatableSections.forEach((sec) => {
      if (payload[sec]) {
        settings[sec] = { ...settings[sec].toObject(), ...payload[sec] };
      }
    });

  
    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        settings.general.logoUrl = req.files.logo[0].path || req.files.logo[0].filename;
      }
      if (req.files.favicon && req.files.favicon[0]) {
        settings.general.faviconUrl = req.files.favicon[0].path || req.files.favicon[0].filename;
      }
      if (req.files.homepageBanner && req.files.homepageBanner[0]) {
        settings.appearance.homepageBanner = req.files.homepageBanner[0].path || req.files.homepageBanner[0].filename;
      }
      if (req.files.ogImage && req.files.ogImage[0]) {
        settings.seo.ogImage = req.files.ogImage[0].path || req.files.ogImage[0].filename;
      }
    }

    await settings.save();
    res.json({ success: true, settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
