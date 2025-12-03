import express from 'express';
import * as categoryController from '../controller/categoryController.js';
import adminCheck from '../middleware/adminCheck.js';

const router = express.Router();

// List all categories
router.get('/', categoryController.listCategories);

// Show new category form
router.get('/form', adminCheck, categoryController.showNewCategoryForm);

// Show edit category form
router.get('/:id/edit', adminCheck, categoryController.showEditCategoryForm);

// Show a single category by ID
router.get('/:id', categoryController.showCategory);

// Create category
router.post('/', categoryController.createCategory);

// Update category
router.post('/:id/update', adminCheck, categoryController.updateCategory);

// Delete category
router.post('/:id/delete', adminCheck, categoryController.deleteCategory);

export default router;