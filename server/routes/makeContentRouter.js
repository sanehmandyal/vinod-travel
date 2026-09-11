const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const crudFactory = require('../controllers/crudFactory');

// Builds a router with:
//  GET    /            -> public list (active only)
//  GET    /admin        -> private full list
//  GET    /:id          -> private single item
//  POST   /             -> private create
//  PUT    /:id          -> private update
//  DELETE /:id          -> private delete
const makeContentRouter = (Model, options) => {
  const router = express.Router();
  const c = crudFactory(Model, options);

  router.get('/', c.getAllPublic);
  router.get('/admin', protect, c.getAllAdmin);
  router.get('/:id', protect, c.getOne);
  router.post('/', protect, c.createOne);
  router.put('/:id', protect, c.updateOne);
  router.delete('/:id', protect, c.deleteOne);

  return router;
};

module.exports = makeContentRouter;
