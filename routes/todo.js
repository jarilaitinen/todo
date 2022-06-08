const path = require('path');

const express = require('express');

const itemController = require('../controllers/items');

const router = express.Router();

// /login
router.get('/login', (req, res, next) => {
     res.render('login', { pageTitle: 'Log in'});
});

// /login
router.get('/create-account', (req, res, next) => {
    res.render('create-account', { pageTitle: 'Log in'});
});



// /add-item => GET
router.get('/add-item', itemController.getAddItem);

// /add-item => POST
router.post('/add-item', itemController.postAddItem);

// /edit-item by id
router.get('/edit-item/:itemid', itemController.editItem);

// /edit-item => POST
router.post('/edit-item', itemController.postEditItem);

// /delete-item by id
router.post('/delete-item', itemController.postDeleteItem);

// /api/v1/todos by status
router.get('/api/v1/todos', itemController.getFilteredItems);

// list home
router.use('/', itemController.getItems);

module.exports = router;
