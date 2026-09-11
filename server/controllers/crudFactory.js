const asyncHandler = require('express-async-handler');

// Generic CRUD controller factory for simple content models
// (Vehicle, Destination, TourPackage, GalleryItem)
const crudFactory = (Model, { publicFilter = { active: true } } = {}) => {
  const getAllPublic = asyncHandler(async (req, res) => {
    const items = await Model.find(publicFilter).sort({ order: 1, createdAt: 1 });
    res.json(items);
  });

  const getAllAdmin = asyncHandler(async (req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json(item);
  });

  const createOne = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  });

  const updateOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    Object.assign(item, req.body);
    const updated = await item.save();
    res.json(updated);
  });

  const deleteOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    await item.deleteOne();
    res.json({ message: 'Item removed' });
  });

  return { getAllPublic, getAllAdmin, getOne, createOne, updateOne, deleteOne };
};

module.exports = crudFactory;
