const Items = require('../models/item');

// List all items in a category
exports.listItems = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const items = await Items.findAllByCategory(categoryId);
  res.render('items/list', { items, categoryId });
};

// Show a single item
exports.showItem = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const item = await Items.findById(itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  res.render('items/form', { item, categoryId });
};

// Show new item form
exports.showNewItemForm = (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  res.render('items/form', { item: null, categoryId });
};

// Create item
exports.createItem = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const { name, color, brand, price, size, stock_quantity, description } = req.body;
  await Items.create(categoryId, name, brand, size, color, price, stock_quantity, description);
  res.redirect(`/categories/${categoryId}/items`);
};

// Update item
exports.updateItem = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const { name, color, brand, price, size, stock_quantity, description } = req.body;
  await Items.update(itemId, name, brand, price, size, color, stock_quantity, description);
  res.redirect(`/categories/${categoryId}/items`);
};

// Show edit form
exports.showEditForm = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const item = await Items.findById(itemId);
  res.render('items/form', { item, categoryId });
};

// Delete item
exports.deleteItem = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  await Items.delete(itemId);
  res.redirect(`/categories/${categoryId}/items`);
};