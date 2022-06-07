const path = require('path');

const express = require('express');

const itemController = require('../controllers/items');

const router = express.Router();

// /add-item => GET
router.get('/add-item', itemController.getAddItem);

// /add-item => POST
router.post('/add-item', itemController.postAddItem);

// list home
router.get('/', itemController.getItems);

module.exports = router;
