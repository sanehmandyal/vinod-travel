const asyncHandler = require('express-async-handler');
const ContactEnquiry = require('../models/ContactEnquiry');

// @desc    Submit contact / quick inquiry form (public)
// @route   POST /api/contact
// @access  Public
const submitEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, message } = req.body;
  if (!name || !phone || !message) {
    res.status(400);
    throw new Error('Name, phone and message are required');
  }
  const enquiry = await ContactEnquiry.create(req.body);
  res.status(201).json(enquiry);
});

// @desc    Get all enquiries (admin)
// @route   GET /api/contact
// @access  Private
const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
});

// @desc    Update enquiry status
// @route   PUT /api/contact/:id
// @access  Private
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  Object.assign(enquiry, req.body);
  const updated = await enquiry.save();
  res.json(updated);
});

// @desc    Delete enquiry
// @route   DELETE /api/contact/:id
// @access  Private
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  await enquiry.deleteOne();
  res.json({ message: 'Enquiry removed' });
});

module.exports = { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry };
