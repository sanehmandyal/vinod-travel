const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// @desc    Upload a single image (used by all admin content forms)
// @route   POST /api/uploads
// @access  Private (admin)
router.post(
  '/',
  protect,
  (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        res.status(400);
        return next(new Error(err.message || 'Upload failed'));
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('No image file received');
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  })
);

module.exports = router;
