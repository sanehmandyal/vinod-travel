const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

// @desc    Get business/contact/location settings (creates defaults if none exist)
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  res.json(settings);
});

// @desc    Update business/contact/location settings
// @route   PUT /api/settings
// @access  Private (admin)
const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = new Settings();
  }
  Object.assign(settings, req.body);
  const updated = await settings.save();
  res.json(updated);
});

module.exports = { getSettings, updateSettings };
