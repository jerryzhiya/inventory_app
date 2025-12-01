const Category = require('../models/category');

// List all categories
exports.listCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.render('categories/list', { categories });
};

// Show a single category by ID
exports.showCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    return res.status(400).send('Invalid category ID');
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  res.render('categories/form', { category, categoryId });
};

// Show new category form
exports.showNewCategoryForm = (req, res) => {
  res.render('categories/form', { category: null, categoryId: null });
};

// Show edit category form
exports.showEditCategoryForm = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  res.render('categories/form', { category, categoryId });
};

// Create category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  await Category.create(name, description);
  res.redirect('/categories');
};

// Update category
exports.updateCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  const { name, description } = req.body;
  await Category.update(categoryId, name, description);
  res.redirect('/categories');
};

// Delete category
exports.deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);
  await Category.delete(categoryId);
  res.redirect('/categories');
};