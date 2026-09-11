const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Submit a review (public) - goes in as unapproved
// @route   POST /api/reviews
// @access  Public
const submitReview = asyncHandler(async (req, res) => {
  const { name, tag, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    res.status(400);
    throw new Error('Please provide name, rating and comment');
  }
  const review = await Review.create({ name, tag, rating, comment, approved: false });
  res.status(201).json(review);
});

// @desc    Get approved reviews (public)
// @route   GET /api/reviews
// @access  Public
const getApprovedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  res.json(reviews);
});

// @desc    Get all reviews (admin)
// @route   GET /api/reviews/admin
// @access  Private
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// @desc    Approve / update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  Object.assign(review, req.body);
  const updated = await review.save();
  res.json(updated);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  await review.deleteOne();
  res.json({ message: 'Review removed' });
});

module.exports = { submitReview, getApprovedReviews, getAllReviews, updateReview, deleteReview };
