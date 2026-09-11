const GalleryItem = require('../models/GalleryItem');
const makeContentRouter = require('./makeContentRouter');

module.exports = makeContentRouter(GalleryItem);
