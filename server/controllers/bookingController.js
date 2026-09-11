const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');

// @desc    Create a new booking (public, from website)
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { name, phone, pickup, destination, date, vehicle } = req.body;

  if (!name || !phone || !pickup || !destination || !date || !vehicle) {
    res.status(400);
    throw new Error('Please fill all required booking fields');
  }

  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const bookings = await Booking.find(filter).sort({ createdAt: -1 });
  res.json(bookings);
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json(booking);
});

// @desc    Update booking (status etc.)
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  Object.assign(booking, req.body);
  const updated = await booking.save();
  res.json(updated);
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  await booking.deleteOne();
  res.json({ message: 'Booking removed' });
});

// @desc    Dashboard stats
// @route   GET /api/bookings/stats/summary
// @access  Private
const getBookingStats = asyncHandler(async (req, res) => {
  const [total, pending, confirmed, completed, cancelled] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'Pending' }),
    Booking.countDocuments({ status: 'Confirmed' }),
    Booking.countDocuments({ status: 'Completed' }),
    Booking.countDocuments({ status: 'Cancelled' }),
  ]);
  const recent = await Booking.find().sort({ createdAt: -1 }).limit(8);
  res.json({ total, pending, confirmed, completed, cancelled, recent });
});

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingStats,
};
