const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    tripType: {
      type: String,
      enum: ['One Way', 'Round Trip', 'Local / Hourly', 'Tour Package'],
      default: 'One Way',
    },
    pickup: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    vehicle: { type: String, required: true, trim: true },
    passengers: { type: Number, default: 1 },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    source: { type: String, enum: ['Website Form', 'WhatsApp', 'Phone'], default: 'Website Form' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
