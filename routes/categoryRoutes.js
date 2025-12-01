const express = require('express');
const route = express.Router();
const categoryController = require('../controller/categoryController');
const adminCheck = require('../middleware/adminCheck');


// List all categories
route.get('/', categoryController.listCategories);

// Show new category form
route.get('/form', adminCheck, categoryController.showNewCategoryForm);

// Show edit category form
route.get('/:id/edit', adminCheck, categoryController.showEditCategoryForm);

// Show a single category by ID
route.get('/:id', categoryController.showCategory);

// Create category
route.post('/', categoryController.createCategory);

// Update category
route.post('/:id/update', adminCheck, categoryController.updateCategory);

// Delete category
route.post('/:id/delete', adminCheck, categoryController.deleteCategory);

module.exports = route;