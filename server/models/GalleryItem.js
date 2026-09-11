const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    category: {
      type: String,
      enum: ['cabs', 'mountains', 'pilgrimage', 'tours', 'customers'],
      required: true,
    },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
