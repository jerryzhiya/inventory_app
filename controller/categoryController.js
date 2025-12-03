import Category from "../models/category.js";

// List all categories
export async function listCategories(req, res) {
  const categories = await Category.findAll();
  res.render('categories/list', { categories });
}

// Show a single category by ID
export async function showCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  if (isNaN(categoryId)) {
    return res.status(400).send('Invalid category ID');
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  res.render('categories/form', { category, categoryId });
}

// Show new category form
export function showNewCategoryForm(req, res) {
  res.render('categories/form', { category: null, categoryId: null });
}

// Show edit category form
export async function showEditCategoryForm(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  res.render('categories/form', { category, categoryId });
}

// Create category
export async function createCategory(req, res) {
  const { name, description } = req.body;
  await Category.create(name, description);
  res.redirect('/categories');
}

// Update category
export async function updateCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  const { name, description } = req.body;
  await Category.update(categoryId, name, description);
  res.redirect('/categories');
}

// Delete category
export async function deleteCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  await Category.delete(categoryId);
  res.redirect('/categories');
}