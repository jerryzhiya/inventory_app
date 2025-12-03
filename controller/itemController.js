import Items from "../models/item.js";

// List all items in a category
export async function listItems(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const items = await Items.findAllByCategory(categoryId);
  res.render('items/list', { items, categoryId });
}

// Show a single item
export async function showItem(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const item = await Items.findById(itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  res.render('items/form', { item, categoryId });
}

// Show new item form
export function showNewItemForm(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  res.render('items/form', { item: null, categoryId });
}

// Create item
export async function createItem(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const { name, color, brand, price, size, stock_quantity, description } = req.body;
  await Items.create(categoryId, name, brand, size, color, price, stock_quantity, description);
  res.redirect(`/categories/${categoryId}/items`);
}

// Update item
export async function updateItem(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const { name, color, brand, price, size, stock_quantity, description } = req.body;
  await Items.update(itemId, name, brand, price, size, color, stock_quantity, description);
  res.redirect(`/categories/${categoryId}/items`);
}

// Show edit form
export async function showEditForm(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  const item = await Items.findById(itemId);
  res.render('items/form', { item, categoryId });
}

// Delete item
export async function deleteItem(req, res) {
  const categoryId = parseInt(req.params.categoryId, 10);
  const itemId = parseInt(req.params.id, 10);
  await Items.delete(itemId);
  res.redirect(`/categories/${categoryId}/items`);
}