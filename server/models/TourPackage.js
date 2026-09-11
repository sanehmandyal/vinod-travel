const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    duration: { type: String, required: true }, // "3 Days / 2 Nights"
    description: { type: String, required: true },
    price: { type: String, required: false, default: '' }, // internal reference only; not shown on the public site
    priceNote: { type: String, default: 'total' },
    image: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TourPackage', tourPackageSchema);
