const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getSettings, updateSettings } = require('../controllers/settingsController');

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, updateSettings);

module.exports = router;
