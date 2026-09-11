const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(submitEnquiry).get(protect, getEnquiries);
router.route('/:id').put(protect, updateEnquiry).delete(protect, deleteEnquiry);

module.exports = router;
