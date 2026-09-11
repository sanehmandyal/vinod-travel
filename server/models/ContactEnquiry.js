const mongoose = require('mongoose');

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'Contacted', 'Resolved'], default: 'New' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactEnquiry', contactEnquirySchema);
