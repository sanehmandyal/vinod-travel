const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    from: { type: String, default: 'Una' },
    to: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    durationLabel: { type: String, required: true }, // "~2.5 hrs"
    tag: { type: String, default: 'Highway Corridor' },
    description: { type: String, required: true },
    approxFare: { type: String, required: false, default: '' }, // internal reference only; not shown on the public site
    fareLabel: { type: String, default: 'Approx. Sedan Fare' },
    image: { type: String, default: '' },
    mapLink: { type: String, default: '' }, // optional Google Maps link for this route/destination
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);
