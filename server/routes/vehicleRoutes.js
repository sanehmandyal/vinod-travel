const Vehicle = require('../models/Vehicle');
const makeContentRouter = require('./makeContentRouter');

module.exports = makeContentRouter(Vehicle);
