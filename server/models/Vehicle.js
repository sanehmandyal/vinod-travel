const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // Sedan / SUV / Luxury MPV / Group Transit
    seatingCapacity: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    ratePerKm: { type: String, required: false, default: '' }, // internal reference only; not shown on the public site
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
