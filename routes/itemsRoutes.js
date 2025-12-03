// routes/itemsRoutes.js
import express from 'express';
import * as itemController from '../controller/itemController.js';  // plural folder + .js extension

const router = express.Router();

router.get('/:categoryId/items', itemController.listItems);
router.get('/:categoryId/items/:id', itemController.showItem);
router.get('/:categoryId/items/form', itemController.showNewItemForm);
router.post('/:categoryId/items', itemController.createItem);
router.post('/:categoryId/items/:id/update', itemController.updateItem);
router.get('/:categoryId/items/:id/edit', itemController.showEditForm);
router.post('/:categoryId/items/:id/delete', itemController.deleteItem);

export default router;