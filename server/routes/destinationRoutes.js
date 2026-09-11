const Destination = require('../models/Destination');
const makeContentRouter = require('./makeContentRouter');

module.exports = makeContentRouter(Destination);
