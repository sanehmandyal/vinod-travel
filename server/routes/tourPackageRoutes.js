const TourPackage = require('../models/TourPackage');
const makeContentRouter = require('./makeContentRouter');

module.exports = makeContentRouter(TourPackage);
