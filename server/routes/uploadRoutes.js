const express = require('express');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
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

    // Vercel's filesystem is temporary, so persist the image with the content record.
    if (process.env.VERCEL) {
      const image = fs.readFileSync(req.file.path).toString('base64');
      fs.unlinkSync(req.file.path);
      return res.status(201).json({ url: `data:${req.file.mimetype};base64,${image}` });
    }

    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  })
);

module.exports = router;
