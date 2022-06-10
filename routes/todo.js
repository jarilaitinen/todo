const path = require('path');

const express = require('express');

const itemController = require('../controllers/items');

const router = express.Router();


// /add-item => GET
router.get('/add-item', itemController.getAddItem);

// /add-item => POST
router.post('/add-item', itemController.postAddItem);

// /edit-item by id
router.get('/edit-item/:id', itemController.editItem);

// /edit-item => POST
router.post('/edit-item', itemController.postEditItem);

// /delete-item by id
router.post('/delete-item', itemController.postDeleteItem);

// /api/v1/todos by status
router.get('/todos', itemController.getFilteredItems);

// list home
router.use('/', itemController.getItems);

module.exports = router;
