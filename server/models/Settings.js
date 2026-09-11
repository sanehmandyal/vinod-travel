const mongoose = require('mongoose');

// Singleton document holding editable business/contact/location details.
// The admin edits this from /admin/settings and it reflects across the
// public site (header, footer, contact page, WhatsApp links) instantly.
const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Vinod Tour & Travels' },
    tagline: { type: String, default: 'Your Trusted Travel Partner from Una' },
    fullAddress: { type: String, default: '' },
    location: { type: String, default: '' }, // short location label, e.g. "ISBT Una, Himachal Pradesh"
    mapEmbedQuery: { type: String, default: '' }, // free-text address/place used to render the Google Map
    phonePrimary: { type: String, default: '' },
    phoneSecondary: { type: String, default: '' },
    whatsappNumber: { type: String, default: '916230521544' }, // digits only, with country code
    email: { type: String, default: '' },
    hours: { type: String, default: '24 Hours Open (7 Days a Week)' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
