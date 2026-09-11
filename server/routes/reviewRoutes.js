const express = require('express');
const router = express.Router();
const {
  submitReview,
  getApprovedReviews,
  getAllReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(submitReview).get(getApprovedReviews);
router.get('/admin', protect, getAllReviews);
router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
