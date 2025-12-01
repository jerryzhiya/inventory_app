const express = require('express');
const router = express.Router({ mergeParams: true });
const itemController = require('../controller/itemController');
const adminCheck = require('../middleware/adminCheck');

// List items
router.get('/:categoryId/items', itemController.listItems);

// Show new item form (protected)
router.get('/:categoryId/items/new', adminCheck, itemController.showNewItemForm);

// Create item (protected)
router.post('/:categoryId/items', adminCheck, itemController.createItem);

// Show single item
router.get('/:categoryId/items/:id', itemController.showItem);

// Edit form (protected)
router.get('/:categoryId/items/:id/edit', adminCheck, itemController.showEditForm);

// Update item (protected)
router.post('/:categoryId/items/:id/update', adminCheck, itemController.updateItem);

// Delete item (protected)
router.post('/:categoryId/items/:id/delete', adminCheck, itemController.deleteItem);

module.exports = router;